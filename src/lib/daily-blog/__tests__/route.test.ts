import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const m = vi.hoisted(() => ({
  fetchCandidates: vi.fn(),
  fetchSourceText: vi.fn(),
  writeArticle: vi.fn(),
  finalizeContent: vi.fn(),
  checkQuality: vi.fn(),
  uniqueSlug: vi.fn(),
  generateCover: vi.fn(),
  uploadCover: vi.fn(),
  revalidatePath: vi.fn(),
  insert: vi.fn(),
  select: vi.fn(),
}))

vi.mock('@/lib/daily-blog/sources', () => ({ fetchCandidates: m.fetchCandidates, fetchSourceText: m.fetchSourceText }))
vi.mock('@/lib/daily-blog/write-article', () => ({ writeArticle: m.writeArticle }))
vi.mock('@/lib/daily-blog/quality', () => ({ finalizeContent: m.finalizeContent, checkQuality: m.checkQuality, uniqueSlug: m.uniqueSlug }))
vi.mock('@/lib/daily-blog/generate-cover', () => ({ generateCover: m.generateCover, uploadCover: m.uploadCover }))
vi.mock('next/cache', () => ({ revalidatePath: m.revalidatePath }))
vi.mock('@supabase/supabase-js', () => ({ createClient: () => ({ from: () => ({ select: m.select, insert: m.insert }) }) }))

import { GET } from '@/app/api/cron/daily-blog/route'

const item = (n: number) => ({ title: `T${n}`, link: `https://t.example/${n}`, summary: 's', publishedAt: new Date(), source: { name: 'Test', url: 'u', hosts: ['t.example'], tier: 1 } })
const article = { title: 'Written Title', category: 'Security', excerpt: 'E', seoTitle: 'ST', seoDescription: 'SD', contentHtml: '<p>b</p>', imagePrompt: 'ip' }
const call = (auth?: string) => GET(new Request('http://x/api/cron/daily-blog', { headers: auth ? { authorization: auth } : {} }))

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('CRON_SECRET', 'topsecret')
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://x.supabase.co')
  vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'service')
  m.select.mockResolvedValue({ data: [{ slug: 'old', source_url: 'https://old.example/1' }], error: null })
  m.insert.mockResolvedValue({ error: null })
  m.fetchCandidates.mockResolvedValue([item(1), item(2)])
  m.fetchSourceText.mockResolvedValue('source text')
  m.writeArticle.mockResolvedValue(article)
  m.finalizeContent.mockReturnValue('<p>FINAL</p>')
  m.checkQuality.mockReturnValue({ ok: true, reasons: [] })
  m.uniqueSlug.mockReturnValue('written-title')
  m.generateCover.mockResolvedValue(Buffer.from('img'))
  m.uploadCover.mockResolvedValue('https://x.supabase.co/storage/blog/written-title.jpg')
})

afterEach(() => vi.useRealTimers())

describe('auth', () => {
  it('rejects a request without Authorization and touches nothing', async () => {
    expect((await call()).status).toBe(401)
    expect(m.fetchCandidates).not.toHaveBeenCalled()
  })

  it('rejects a wrong secret', async () => {
    expect((await call('Bearer nope')).status).toBe(401)
  })

  it('rejects everything when CRON_SECRET is not set, even "Bearer undefined"', async () => {
    vi.stubEnv('CRON_SECRET', '')
    expect((await call('Bearer undefined')).status).toBe(401)
    expect((await call('Bearer ')).status).toBe(401)
    expect(m.fetchCandidates).not.toHaveBeenCalled()
  })
})

describe('flow', () => {
  it('publishes a post that passes the quality check and revalidates', async () => {
    const res = await call('Bearer topsecret')
    expect(res.status).toBe(200)
    const row = m.insert.mock.calls[0][0]
    expect(row).toMatchObject({
      title: 'Written Title', slug: 'written-title', status: 'published', source_url: 'https://t.example/1',
      cover_image_url: 'https://x.supabase.co/storage/blog/written-title.jpg', content: '<p>FINAL</p>', category: 'Security', excerpt: 'E',
    })
    expect(typeof row.published_at).toBe('string')
    expect(row).not.toHaveProperty('seo_title')
    expect(m.revalidatePath).toHaveBeenCalledWith('/blog')
    expect(m.revalidatePath).toHaveBeenCalledWith('/sitemap.xml')
  })

  it('saves a draft and does not revalidate when the quality check fails', async () => {
    m.checkQuality.mockReturnValue({ ok: false, reasons: ['only 100 words'] })
    const res = await call('Bearer topsecret')
    expect(res.status).toBe(200)
    expect(m.insert.mock.calls[0][0]).toMatchObject({ status: 'draft', published_at: null })
    expect(m.revalidatePath).not.toHaveBeenCalled()
  })

  it('does nothing when there are no candidates', async () => {
    m.fetchCandidates.mockResolvedValue([])
    expect((await call('Bearer topsecret')).status).toBe(200)
    expect(m.insert).not.toHaveBeenCalled()
  })

  it('passes already-used source urls to fetchCandidates', async () => {
    await call('Bearer topsecret')
    expect([...m.fetchCandidates.mock.calls[0][0]]).toEqual(['https://old.example/1'])
  })

  it('falls through to the second candidate when the first fails to write', async () => {
    m.writeArticle.mockRejectedValueOnce(new Error('boom')).mockResolvedValueOnce(article)
    await call('Bearer topsecret')
    expect(m.writeArticle).toHaveBeenCalledTimes(2)
    expect(m.insert.mock.calls[0][0].source_url).toBe('https://t.example/2')
  })

  it('skips a candidate whose source text is empty', async () => {
    m.fetchSourceText.mockResolvedValueOnce('').mockResolvedValueOnce('text')
    await call('Bearer topsecret')
    expect(m.insert.mock.calls[0][0].source_url).toBe('https://t.example/2')
  })

  it('tries at most 2 candidates, then publishes nothing', async () => {
    m.fetchCandidates.mockResolvedValue([item(1), item(2), item(3)])
    m.writeArticle.mockRejectedValue(new Error('boom'))
    expect((await call('Bearer topsecret')).status).toBe(200)
    expect(m.writeArticle).toHaveBeenCalledTimes(2)
    expect(m.insert).not.toHaveBeenCalled()
  })

  it('answers 200 on a unique-violation (same source already stored)', async () => {
    m.insert.mockResolvedValue({ error: { code: '23505', message: 'duplicate key value violates unique constraint "blog_posts_source_url_key"' } })
    expect((await call('Bearer topsecret')).status).toBe(200)
  })

  it('answers 500 on any other insert error', async () => {
    m.insert.mockResolvedValue({ error: { code: '42703', message: 'no column' } })
    expect((await call('Bearer topsecret')).status).toBe(500)
  })

  it('answers 500 when reading existing posts fails (e.g. migration not applied)', async () => {
    m.select.mockResolvedValue({ data: null, error: { message: 'column source_url does not exist' } })
    expect((await call('Bearer topsecret')).status).toBe(500)
    expect(m.insert).not.toHaveBeenCalled()
  })

  it('answers 500 on a unique violation of another constraint (e.g. slug)', async () => {
    m.insert.mockResolvedValue({ error: { code: '23505', message: 'duplicate key value violates unique constraint "blog_posts_slug_key"' } })
    expect((await call('Bearer topsecret')).status).toBe(500)
  })

  it('does not start a second attempt after more than 60s have passed', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(0)
    m.writeArticle.mockImplementationOnce(async () => {
      vi.setSystemTime(70_000)
      throw new Error('slow model')
    })
    expect((await call('Bearer topsecret')).status).toBe(200)
    expect(m.writeArticle).toHaveBeenCalledTimes(1)
    expect(m.insert).not.toHaveBeenCalled()
  })
})
