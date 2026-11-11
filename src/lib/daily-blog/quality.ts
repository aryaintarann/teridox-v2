import sanitizeHtml from 'sanitize-html'
import { SOURCES, hostAllowed } from './sources'
import type { Article, SourceItem } from './types'

const MIN_WORDS = 600

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

// Fixed copy: written by us, never by the model. No human reviews these posts, so the line says so honestly.
const DISCLOSURE =
  '<p><em>This article was written with AI assistance from the sources cited above and checked by automated quality rules.</em></p>'
const PROMO =
  "<h2>Build With Teridox</h2><p>Need a fast, secure website or digital product? <a href='https://teridox.com'>Teridox</a>, founded by Arya Intaran, designs and builds websites and web apps for businesses. <a href='https://teridox.com/contact'>Get in touch</a> to discuss your project.</p>"

function allowedHosts(item: SourceItem): string[] {
  return [...SOURCES.flatMap((s) => s.hosts), ...item.source.hosts, 'teridox.com']
}

export function finalizeContent(article: Article, item: SourceItem): string {
  const hosts = allowedHosts(item)
  const body = sanitizeHtml(article.contentHtml, {
    allowedTags: ['h2', 'h3', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'blockquote'],
    allowedAttributes: { a: ['href', 'rel'] },
    allowedSchemes: ['http', 'https'],
    transformTags: {
      // Links outside the allowlist become a plain span, which sanitize-html then strips, keeping the text.
      a: (_tag, attribs) => {
        const ok = !!attribs.href && hostAllowed(attribs.href, hosts)
        const out: Record<string, string> = ok ? { href: attribs.href, rel: 'noopener noreferrer' } : {}
        return { tagName: ok ? 'a' : 'span', attribs: out }
      },
    },
  })
  const sources = `<h2>Sources</h2><ul><li><a href='${esc(item.link)}' rel='noopener noreferrer'>${esc(item.source.name)}: ${esc(item.title)}</a></li></ul>`
  return body + sources + DISCLOSURE + PROMO
}

export function checkQuality(html: string, item: SourceItem): { ok: boolean; reasons: string[] } {
  const reasons: string[] = []
  const text = html.replace(/<[^>]*>/g, ' ').replace(/&[#\w]+;/g, ' ')
  const wordCount = text.split(/\s+/).filter(Boolean).length
  if (wordCount < MIN_WORDS) reasons.push(`only ${wordCount} words (minimum ${MIN_WORDS})`)
  if (!html.includes('<h2>Sources</h2>') || !html.includes(esc(item.link))) reasons.push('missing Sources section with the source link')
  if (!html.includes('Arya Intaran') || !html.includes('Teridox')) reasons.push('missing Teridox / Arya Intaran closing')
  if (/as an ai|i cannot/i.test(text)) reasons.push('contains AI boilerplate')
  // The model was told to output HTML; markdown or bare URLs in the text mean it ignored that.
  if (!/<p[ >]/.test(html.split('<h2>Sources</h2>')[0])) reasons.push('body has no paragraph markup')
  if (/^#{1,6}\s/m.test(text) || /\]\(/.test(text) || /https?:\/\//i.test(text)) reasons.push('markdown or bare URL in the text')
  const hosts = allowedHosts(item)
  const bad = [...html.matchAll(/href=['"]([^'"]+)['"]/g)].map((m) => m[1].replace(/&amp;/g, '&')).filter((h) => !hostAllowed(h, hosts))
  if (bad.length) reasons.push(`link outside the allowlist: ${bad[0]}`)
  return { ok: reasons.length === 0, reasons }
}

export function uniqueSlug(title: string, taken: Set<string>): string {
  let base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80).replace(/-+$/, '')
  if (!base) base = `post-${Math.random().toString(36).slice(2, 8)}`
  let slug = base
  for (let n = 2; taken.has(slug); n++) slug = `${base.slice(0, 76)}-${n}`
  return slug
}
