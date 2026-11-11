import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchSourceText, parseFeed, pickCandidates } from '../sources'
import type { Source, SourceItem } from '../types'

const src: Source = { name: 'Test', url: 'https://t.example/feed', hosts: ['t.example'], tier: 2 }

const rss = (items: string) =>
  `<?xml version="1.0"?><rss version="2.0"><channel><title>x</title>${items}</channel></rss>`
const rssItem = (n: number) =>
  `<item><title>Title ${n}</title><link>https://t.example/${n}</link><description>&lt;p&gt;Summary ${n}&lt;/p&gt;</description><pubDate>Tue, 10 Nov 2026 12:00:00 GMT</pubDate></item>`

describe('parseFeed', () => {
  it('reads an RSS feed with two items', () => {
    const items = parseFeed(rss(rssItem(1) + rssItem(2)), src)
    expect(items).toHaveLength(2)
    expect(items[0]).toMatchObject({ title: 'Title 1', link: 'https://t.example/1', summary: 'Summary 1' })
    expect(items[0].publishedAt.toISOString()).toBe('2026-11-10T12:00:00.000Z')
  })

  it('reads an RSS feed with a single item', () => {
    const items = parseFeed(rss(rssItem(1)), src)
    expect(items).toHaveLength(1)
    expect(items[0].link).toBe('https://t.example/1')
  })

  it('reads an Atom feed using the link href', () => {
    const atom = `<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Atom One</title><link href="https://t.example/a1" rel="alternate"/><summary>Atom summary</summary><updated>2026-11-11T12:06:21Z</updated></entry></feed>`
    const items = parseFeed(atom, src)
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({ title: 'Atom One', link: 'https://t.example/a1', summary: 'Atom summary' })
  })

  it('drops items whose link host is not allowed for the source', () => {
    const bad = `<item><title>Off</title><link>https://evil.example/x</link><description>d</description><pubDate>Tue, 10 Nov 2026 12:00:00 GMT</pubDate></item>`
    expect(parseFeed(rss(bad), src)).toHaveLength(0)
  })
})

describe('pickCandidates', () => {
  const now = new Date('2026-11-11T12:00:00Z')
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600_000)
  const item = (link: string, h: number, tier: 1 | 2): SourceItem => ({
    title: link, link, summary: '', publishedAt: hoursAgo(h), source: { ...src, tier },
  })

  it('drops items older than 72 hours and keeps 71 hours', () => {
    const r = pickCandidates([item('old', 73, 1), item('ok', 71, 1)], new Set(), now)
    expect(r.map((i) => i.link)).toEqual(['ok'])
  })

  it('drops links already used', () => {
    const r = pickCandidates([item('a', 1, 1), item('b', 2, 1)], new Set(['a']), now)
    expect(r.map((i) => i.link)).toEqual(['b'])
  })

  it('puts tier 1 before tier 2 even when older, then newest first', () => {
    const r = pickCandidates([item('t2new', 1, 2), item('t1old', 50, 1), item('t1new', 5, 1)], new Set(), now)
    expect(r.map((i) => i.link)).toEqual(['t1new', 't1old', 't2new'])
  })
})

describe('fetchSourceText redirects', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('does not follow redirects and returns empty text on a 3xx', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('', { status: 302, headers: { location: 'https://evil.example/' } }))
    vi.stubGlobal('fetch', fetchMock)
    expect(await fetchSourceText('https://t.example/1')).toBe('')
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ redirect: 'manual' })
  })
})
