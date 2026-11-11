import { afterEach, describe, expect, it, vi } from 'vitest'
import { parseArticleJson, writeArticle } from '../write-article'
import type { SourceItem } from '../types'

const obj = {
  title: 'T', category: 'Security', excerpt: 'E', seo_title: 'ST', seo_description: 'SD',
  content: '<p>Body</p>', image_prompt: 'IP',
}

describe('parseArticleJson', () => {
  it('maps clean JSON to an Article', () => {
    expect(parseArticleJson(JSON.stringify(obj))).toEqual({
      title: 'T', category: 'Security', excerpt: 'E', seoTitle: 'ST', seoDescription: 'SD',
      contentHtml: '<p>Body</p>', imagePrompt: 'IP',
    })
  })

  it('accepts JSON wrapped in a ```json fence', () => {
    expect(parseArticleJson('```json\n' + JSON.stringify(obj) + '\n```').title).toBe('T')
  })

  it('accepts JSON with surrounding prose', () => {
    expect(parseArticleJson('Here you go:\n' + JSON.stringify(obj) + '\nHope this helps!').title).toBe('T')
  })

  it('throws when a required field is missing', () => {
    const rest: Partial<typeof obj> = { ...obj }
    delete rest.title
    expect(() => parseArticleJson(JSON.stringify(rest))).toThrow()
  })

  it('throws on text that is not JSON', () => {
    expect(() => parseArticleJson('sorry, no')).toThrow()
  })
})

describe('writeArticle', () => {
  const item: SourceItem = {
    title: 'Big Breach', link: 'https://t.example/1', summary: 'sum', publishedAt: new Date(),
    source: { name: 'Test', url: 'https://t.example/feed', hosts: ['t.example'], tier: 2 },
  }
  afterEach(() => vi.unstubAllGlobals())

  it('calls Shiteru with the Kimi model, bearer auth, and the source text in the user message', async () => {
    vi.stubEnv('SHITERU_API_KEY', 'sk_live_test')
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify(obj), reasoning_content: 'ignore me' } }] }), { status: 200 }),
    )
    vi.stubGlobal('fetch', fetchMock)
    const a = await writeArticle(item, 'SOURCE BODY TEXT')
    expect(a.title).toBe('T')
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://shiteru.id/v1/chat/completions')
    expect(init.headers.Authorization).toBe('Bearer sk_live_test')
    const body = JSON.parse(init.body)
    expect(body.model).toBe('kimi-k3.1-pro')
    expect(JSON.stringify(body.messages)).toContain('SOURCE BODY TEXT')
  })

  it('throws on a non-2xx response', async () => {
    vi.stubEnv('SHITERU_API_KEY', 'sk_live_test')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 500 })))
    await expect(writeArticle(item, 'x')).rejects.toThrow()
  })

  it('throws when SHITERU_API_KEY is not set', async () => {
    vi.stubEnv('SHITERU_API_KEY', '')
    await expect(writeArticle(item, 'x')).rejects.toThrow(/SHITERU_API_KEY/)
  })
})

describe('parseArticleJson plain-text fields', () => {
  it('strips tags and caps title, category and excerpt', () => {
    const a = parseArticleJson(JSON.stringify({
      ...obj, title: '<b>Hi</b> </script><script>x there ' + 'a'.repeat(300), category: '<i>Sec</i>' + 'b'.repeat(80), excerpt: '<p>Ex</p>' + 'c'.repeat(500),
    }))
    expect(a.title).not.toMatch(/[<>]/)
    expect(a.title.length).toBeLessThanOrEqual(120)
    expect(a.category).not.toMatch(/[<>]/)
    expect(a.category.length).toBeLessThanOrEqual(40)
    expect(a.excerpt).not.toMatch(/[<>]/)
    expect(a.excerpt.length).toBeLessThanOrEqual(300)
  })
})
