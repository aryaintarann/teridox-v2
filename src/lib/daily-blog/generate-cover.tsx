import sharp from 'sharp'
import { ImageResponse } from 'next/og'
import type { SupabaseClient } from '@supabase/supabase-js'

const WIDTH = 1280
const HEIGHT = 720
const WATERMARK_PX = 48
// Fixed look for every cover; the model only supplies the subject (see image_prompt in write-article.ts).
const STYLE = ', flat vector tech illustration, isometric view, dark navy background with blue and amber accents, clean composition, no text, no logos, no people'

// Branded cover drawn by code. Used whenever the AI image provider fails, so a post never goes out without a cover.
async function fallbackCover(title: string): Promise<Buffer> {
  const res = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          color: '#ffffff',
          background: 'linear-gradient(135deg, #0b1220 0%, #12306b 100%)',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 4, color: '#7fb2ff' }}>TERIDOX</div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>{title.slice(0, 120)}</div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  )
  return Buffer.from(await res.arrayBuffer())
}

async function cloudflareCover(subject: string): Promise<Buffer> {
  const token = process.env.CLOUDFLARE_API_TOKEN
  const account = process.env.CLOUDFLARE_ACCOUNT_ID
  if (!token || !account) throw new Error('Cloudflare credentials not set')
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/ai/run/@cf/black-forest-labs/flux-1-schnell`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: subject.slice(0, 400) + STYLE, steps: 6 }),
    signal: AbortSignal.timeout(60_000),
  })
  const data = await res.json().catch(() => null)
  const image: unknown = data?.result?.image
  if (!res.ok || !data?.success || typeof image !== 'string') {
    throw new Error(`Cloudflare image HTTP ${res.status}: ${JSON.stringify(data?.errors ?? '').slice(0, 120)}`)
  }
  return toHeader(Buffer.from(image, 'base64'))
}

// FLUX returns a square image. Cropping it to 16:9 cuts ~44% of the picture, so show it whole in the middle
// over a darkened, blurred copy of itself.
async function toHeader(square: Buffer): Promise<Buffer> {
  const background = await sharp(square).resize(WIDTH, HEIGHT, { fit: 'cover' }).blur(40).modulate({ brightness: 0.7 }).toBuffer()
  const foreground = await sharp(square).resize(HEIGHT, HEIGHT, { fit: 'inside' }).toBuffer()
  return sharp(background).composite([{ input: foreground, gravity: 'centre' }]).jpeg({ quality: 85 }).toBuffer()
}

async function pollinationsCover(subject: string): Promise<Buffer> {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(subject.slice(0, 400) + STYLE)}?width=${WIDTH}&height=${HEIGHT}&nologo=true`
  const res = await fetch(url, { signal: AbortSignal.timeout(30_000) })
  if (!res.ok || !res.headers.get('content-type')?.startsWith('image/')) throw new Error(`Pollinations HTTP ${res.status}`)
  const img = sharp(Buffer.from(await res.arrayBuffer()))
  const { width = WIDTH, height = HEIGHT } = await img.metadata()
  // The provider stamps a logo in the bottom-right corner even with nologo=true: crop it off.
  return img.extract({ left: 0, top: 0, width, height: height - WATERMARK_PX }).jpeg({ quality: 85 }).toBuffer()
}

// Cloudflare FLUX first (follows the prompt well), Pollinations second, a code-drawn cover last so a post never lacks one.
export async function generateCover(imagePrompt: string, title: string): Promise<Buffer> {
  for (const provider of [cloudflareCover, pollinationsCover]) {
    try {
      return await provider(imagePrompt)
    } catch (err) {
      console.warn(`Cover provider ${provider.name} failed:`, err instanceof Error ? err.message : err)
    }
  }
  return fallbackCover(title)
}

export async function uploadCover(buf: Buffer, slug: string, supabase: SupabaseClient): Promise<string> {
  const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47
  // Unique suffix + upsert:false: a duplicate cron run can never replace a published post's cover.
  const path = `blog/${slug}-${Date.now().toString(36)}.${isPng ? 'png' : 'jpg'}`
  const { error } = await supabase.storage.from('uploads').upload(path, buf, {
    contentType: isPng ? 'image/png' : 'image/jpeg',
    upsert: false,
  })
  if (error) throw new Error(`Cover upload failed: ${error.message}`)
  return supabase.storage.from('uploads').getPublicUrl(path).data.publicUrl
}
