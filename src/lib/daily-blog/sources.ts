import { XMLParser } from 'fast-xml-parser'
import type { Source, SourceItem } from './types'

// Allowlist only: the AI never chooses sources. Tier 1 = primary/official, tier 2 = established security press.
// Tier 1 is web and mobile development, the studio's own field, so the daily post is about that
// whenever one of these published in the last 72 hours. Security news is tier 2, the fallback.
export const SOURCES: Source[] = [
  { name: 'web.dev', url: 'https://web.dev/feed.xml', hosts: ['web.dev'], tier: 1 },
  { name: 'Chrome Developers', url: 'https://developer.chrome.com/static/blog/feed.xml', hosts: ['developer.chrome.com', 'chrome.com'], tier: 1 },
  { name: 'WebKit', url: 'https://webkit.org/feed/', hosts: ['webkit.org'], tier: 1 },
  { name: 'React', url: 'https://react.dev/rss.xml', hosts: ['react.dev'], tier: 1 },
  { name: 'Next.js', url: 'https://nextjs.org/feed.xml', hosts: ['nextjs.org'], tier: 1 },
  { name: 'React Native', url: 'https://reactnative.dev/blog/rss.xml', hosts: ['reactnative.dev'], tier: 1 },
  { name: 'Flutter', url: 'https://medium.com/feed/flutter', hosts: ['blog.flutter.dev', 'medium.com'], tier: 1 },
  { name: 'Android Developers', url: 'https://developer.android.com/static/blog/atom.xml', hosts: ['developer.android.com', 'android-developers.googleblog.com'], tier: 1 },
  { name: 'Apple Developer News', url: 'https://developer.apple.com/news/rss/news.rss', hosts: ['developer.apple.com'], tier: 1 },
  { name: 'Smashing Magazine', url: 'https://www.smashingmagazine.com/feed/', hosts: ['smashingmagazine.com'], tier: 2 },
  { name: 'CSS-Tricks', url: 'https://css-tricks.com/feed/', hosts: ['css-tricks.com'], tier: 2 },
  { name: 'Laravel News', url: 'https://feed.laravel-news.com/', hosts: ['laravel-news.com'], tier: 2 },
  { name: 'CISA Advisories', url: 'https://www.cisa.gov/cybersecurity-advisories/all.xml', hosts: ['cisa.gov'], tier: 2 },
  { name: 'Microsoft Security Blog', url: 'https://www.microsoft.com/en-us/security/blog/feed/', hosts: ['microsoft.com'], tier: 2 },
  { name: 'Google Security Blog', url: 'https://blog.google/technology/safety-security/rss/', hosts: ['blog.google', 'googleblog.com'], tier: 2 },
  { name: 'Cloudflare Security', url: 'https://blog.cloudflare.com/tag/security/rss/', hosts: ['blog.cloudflare.com'], tier: 2 },
  { name: 'BleepingComputer', url: 'https://www.bleepingcomputer.com/feed/', hosts: ['bleepingcomputer.com'], tier: 2 },
  { name: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews', hosts: ['thehackernews.com'], tier: 2 },
  { name: 'Krebs on Security', url: 'https://krebsonsecurity.com/feed/', hosts: ['krebsonsecurity.com'], tier: 2 },
  { name: 'WIRED Security', url: 'https://www.wired.com/feed/category/security/latest/rss', hosts: ['wired.com'], tier: 2 },
  { name: 'Schneier on Security', url: 'https://www.schneier.com/feed/atom/', hosts: ['schneier.com'], tier: 2 },
]

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })

const stripTags = (s: string) => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const arr = <T,>(v: T | T[] | undefined): T[] => (v === undefined ? [] : Array.isArray(v) ? v : [v])
const text = (v: unknown): string => {
  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  if (v && typeof v === 'object' && '#text' in v) return String((v as Record<string, unknown>)['#text'])
  return ''
}

function atomLink(v: unknown): string {
  const links = arr(v as unknown[])
  const pick = links.find((l) => (l as Record<string, string>)['@_rel'] === 'alternate') ?? links[0]
  if (typeof pick === 'string') return pick
  return (pick as Record<string, string> | undefined)?.['@_href'] ?? ''
}

export function hostAllowed(link: string, hosts: string[]): boolean {
  try {
    const u = new URL(link)
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return false
    const h = u.hostname.replace(/^www\./, '')
    return hosts.some((a) => h === a || h.endsWith('.' + a))
  } catch {
    return false
  }
}

export function parseFeed(xml: string, source: Source): SourceItem[] {
  const doc = parser.parse(xml)
  const raw: Record<string, unknown>[] = doc.rss ? arr(doc.rss.channel?.item) : arr(doc.feed?.entry)
  const items: SourceItem[] = []
  for (const r of raw) {
    const link = (doc.rss ? text(r.link) : atomLink(r.link)).trim()
    const date = new Date(text(r.pubDate) || text(r.updated) || text(r.published))
    if (!link || Number.isNaN(date.getTime()) || !hostAllowed(link, source.hosts)) continue
    items.push({
      title: stripTags(text(r.title)),
      link,
      summary: stripTags(text(r.description) || text(r.summary) || text(r.content)),
      publishedAt: date,
      source,
    })
  }
  return items
}

export function pickCandidates(items: SourceItem[], usedUrls: Set<string>, now: Date, maxAgeHours = 72): SourceItem[] {
  const cutoff = now.getTime() - maxAgeHours * 3600_000
  return items
    .filter((i) => i.publishedAt.getTime() >= cutoff && !usedUrls.has(i.link))
    .sort((a, b) => a.source.tier - b.source.tier || b.publishedAt.getTime() - a.publishedAt.getTime())
}

const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; TeridoxBot/1.0)' }

async function fetchFeed(source: Source): Promise<SourceItem[]> {
  try {
    const res = await fetch(source.url, { headers: UA, signal: AbortSignal.timeout(8000) })
    if (!res.ok) return []
    return parseFeed(await res.text(), source)
  } catch {
    return []
  }
}

export async function fetchCandidates(usedUrls: Set<string>): Promise<SourceItem[]> {
  const all = (await Promise.all(SOURCES.map(fetchFeed))).flat()
  return pickCandidates(all, usedUrls, new Date())
}

// Plain text of the source page (max 6000 chars). Only called with links that passed parseFeed's host allowlist.
export async function fetchSourceText(url: string): Promise<string> {
  try {
    // redirect: 'manual' so an allowlisted link can never hand us a page from another host (a 3xx is not ok -> '').
    const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(8000), redirect: 'manual' })
    if (!res.ok) return ''
    const html = await res.text()
    return stripTags(html.replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ')).slice(0, 6000)
  } catch {
    return ''
  }
}
