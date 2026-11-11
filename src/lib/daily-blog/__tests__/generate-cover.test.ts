import sharp from 'sharp'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { generateCover, uploadCover } from '../generate-cover'

const PNG_SIG = [0x89, 0x50, 0x4e, 0x47]
const jpeg = () =>
  sharp({ create: { width: 1280, height: 720, channels: 3, background: '#123456' } }).jpeg().toBuffer()
const isPng = (b: Buffer) => PNG_SIG.every((v, i) => b[i] === v)

beforeEach(() => {
  vi.stubEnv('CLOUDFLARE_API_TOKEN', '')
  vi.stubEnv('CLOUDFLARE_ACCOUNT_ID', '')
})
afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('generateCover', () => {
  it('returns a JPEG with the bottom 48px (watermark) cropped off', async () => {
    const body = await jpeg()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(new Uint8Array(body), { status: 200, headers: { 'content-type': 'image/jpeg' } })))
    const buf = await generateCover('a blue padlock', 'Title')
    const meta = await sharp(buf).metadata()
    expect(meta.format).toBe('jpeg')
    expect([meta.width, meta.height]).toEqual([1280, 672])
  })

  it('sends the subject prompt plus a fixed illustration style, url-encoded, at 1280x720 without the logo', async () => {
    const body = await jpeg()
    const fetchMock = vi.fn().mockResolvedValue(new Response(new Uint8Array(body), { status: 200, headers: { 'content-type': 'image/jpeg' } }))
    vi.stubGlobal('fetch', fetchMock)
    await generateCover('a b&c/d', 'Title')
    const url = String(fetchMock.mock.calls[0][0])
    const sent = decodeURIComponent(url.split('/prompt/')[1].split('?')[0])
    expect(sent.startsWith('a b&c/d')).toBe(true)
    expect(sent).toMatch(/isometric/i)
    expect(sent).toMatch(/no text/i)
    expect(url).toContain('width=1280')
    expect(url).toContain('height=720')
    expect(url).toContain('nologo=true')
  })

  it('falls back to a generated PNG on HTTP 429', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('slow down', { status: 429 })))
    expect(isPng(await generateCover('x', 'A Fallback Title'))).toBe(true)
  })

  it('falls back when the response is not an image', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('<html>', { status: 200, headers: { 'content-type': 'text/html' } })))
    expect(isPng(await generateCover('x', 'T'))).toBe(true)
  })

  it('falls back when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))
    expect(isPng(await generateCover('x', 'T'))).toBe(true)
  })
})

describe('uploadCover', () => {
  const fake = () => {
    const upload = vi.fn().mockResolvedValue({ error: null })
    const from = vi.fn(() => ({ upload, getPublicUrl: (p: string) => ({ data: { publicUrl: `https://x.supabase.co/storage/${p}` } }) }))
    return { client: { storage: { from } } as never, upload, from }
  }

  it('uploads a JPEG to uploads/blog/<slug>-<id>.jpg without overwriting and returns the public URL', async () => {
    const { client, upload, from } = fake()
    const url = await uploadCover(await jpeg(), 'my-post', client)
    expect(from).toHaveBeenCalledWith('uploads')
    expect(upload.mock.calls[0][0]).toMatch(/^blog\/my-post-[a-z0-9]+\.jpg$/)
    expect(upload.mock.calls[0][2]).toMatchObject({ contentType: 'image/jpeg', upsert: false })
    expect(url).toBe(`https://x.supabase.co/storage/${upload.mock.calls[0][0]}`)
  })

  it('uses a .png path and content type for the generated fallback', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('x')))
    const png = await generateCover('x', 'T')
    const { client, upload } = fake()
    await uploadCover(png, 'my-post', client)
    expect(upload.mock.calls[0][0]).toMatch(/^blog\/my-post-[a-z0-9]+\.png$/)
    expect(upload.mock.calls[0][2]).toMatchObject({ contentType: 'image/png' })
  })

  it('throws when the upload fails', async () => {
    const upload = vi.fn().mockResolvedValue({ error: { message: 'denied' } })
    const client = { storage: { from: () => ({ upload, getPublicUrl: () => ({ data: { publicUrl: '' } }) }) } } as never
    await expect(uploadCover(await jpeg(), 'p', client)).rejects.toThrow(/denied/)
  })
})

describe('generateCover with Cloudflare Workers AI', () => {
  const square = () => sharp({ create: { width: 1024, height: 1024, channels: 3, background: '#0b1220' } }).jpeg().toBuffer()
  const cfOk = async () =>
    new Response(JSON.stringify({ success: true, result: { image: (await square()).toString('base64') } }), { status: 200 })
  const polOk = async () =>
    new Response(new Uint8Array(await jpeg()), { status: 200, headers: { 'content-type': 'image/jpeg' } })

  beforeEach(() => {
    vi.stubEnv('CLOUDFLARE_API_TOKEN', 'cf_token')
    vi.stubEnv('CLOUDFLARE_ACCOUNT_ID', 'acc123')
  })

  it('calls the FLUX model with bearer auth and the styled prompt, and returns a 1280x720 JPEG', async () => {
    const fetchMock = vi.fn(async () => cfOk())
    vi.stubGlobal('fetch', fetchMock)
    const buf = await generateCover('a padlock on a server rack', 'T')
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit & { headers: Record<string, string> }]
    expect(url).toBe('https://api.cloudflare.com/client/v4/accounts/acc123/ai/run/@cf/black-forest-labs/flux-1-schnell')
    expect(init.headers.Authorization).toBe('Bearer cf_token')
    const body = JSON.parse(String(init.body))
    expect(body.prompt.startsWith('a padlock on a server rack')).toBe(true)
    expect(body.prompt).toMatch(/isometric/i)
    const meta = await sharp(buf).metadata()
    expect(meta.format).toBe('jpeg')
    expect([meta.width, meta.height]).toEqual([1280, 720])
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('keeps the whole square image: both its top and its bottom survive the 16:9 header', async () => {
    const rect = (w: number, h: number, c: string) => sharp({ create: { width: w, height: h, channels: 3, background: c } }).png().toBuffer()
    const marked = await sharp({ create: { width: 1024, height: 1024, channels: 3, background: '#0000ff' } })
      .composite([
        { input: await rect(200, 120, '#ff0000'), left: 412, top: 0 },
        { input: await rect(200, 120, '#00ff00'), left: 412, top: 904 },
      ])
      .jpeg({ quality: 95 })
      .toBuffer()
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ success: true, result: { image: marked.toString('base64') } }), { status: 200 })))
    const out = await generateCover('x', 'T')
    const px = async (x: number, y: number) => [...(await sharp(out).extract({ left: x, top: y, width: 1, height: 1 }).raw().toBuffer())]
    const [tr, tg] = await px(640, 6)
    const [br, bg] = await px(640, 713)
    expect(tr).toBeGreaterThan(180)
    expect(tg).toBeLessThan(90)
    expect(bg).toBeGreaterThan(180)
    expect(br).toBeLessThan(90)
  })

  it('falls back to Pollinations when Cloudflare returns an error', async () => {
    const fetchMock = vi.fn(async (url: string) => (url.includes('api.cloudflare.com') ? new Response('{}', { status: 500 }) : polOk()))
    vi.stubGlobal('fetch', fetchMock)
    const meta = await sharp(await generateCover('x', 'T')).metadata()
    expect([meta.width, meta.height]).toEqual([1280, 672])
    expect(String(fetchMock.mock.calls[1][0])).toContain('image.pollinations.ai')
  })

  it('falls back to Pollinations when Cloudflare reports success:false', async () => {
    const fetchMock = vi.fn(async (url: string) =>
      url.includes('api.cloudflare.com') ? new Response(JSON.stringify({ success: false, errors: [{ message: 'quota' }] }), { status: 200 }) : polOk(),
    )
    vi.stubGlobal('fetch', fetchMock)
    const meta = await sharp(await generateCover('x', 'T')).metadata()
    expect(meta.height).toBe(672)
  })

  it('skips Cloudflare entirely when the credentials are not set', async () => {
    vi.stubEnv('CLOUDFLARE_API_TOKEN', '')
    const fetchMock = vi.fn<(url: string) => Promise<Response>>(async () => polOk())
    vi.stubGlobal('fetch', fetchMock)
    await generateCover('x', 'T')
    expect(String(fetchMock.mock.calls[0][0])).toContain('image.pollinations.ai')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('uses the generated PNG when both providers fail', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')))
    expect(isPng(await generateCover('x', 'T'))).toBe(true)
  })
})
