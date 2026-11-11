import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import { fetchCandidates, fetchSourceText } from '@/lib/daily-blog/sources'
import { writeArticle } from '@/lib/daily-blog/write-article'
import { checkQuality, finalizeContent, uniqueSlug } from '@/lib/daily-blog/quality'
import { generateCover, uploadCover } from '@/lib/daily-blog/generate-cover'
import type { Article, SourceItem } from '@/lib/daily-blog/types'

export const maxDuration = 300

const MAX_ATTEMPTS = 2
// A second attempt only starts early in the run: model 150s + cover 30s must still fit inside maxDuration.
const SECOND_ATTEMPT_DEADLINE_MS = 60_000

function authorized(header: string | null): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret || !header) return false
  const a = Buffer.from(header)
  const b = Buffer.from(`Bearer ${secret}`)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function GET(req: Request) {
  // Each call spends AI quota and can publish a post: only Vercel Cron (which sends CRON_SECRET) may trigger it.
  if (!authorized(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  })

  // shortcut: reads every post's slug + source_url; fine for a blog of a few thousand posts, page it beyond that.
  const { data: existing, error: readError } = await supabase.from('blog_posts').select('slug, source_url')
  if (readError) {
    console.error('daily-blog: reading existing posts failed:', readError.message)
    return NextResponse.json({ error: 'Could not read existing posts' }, { status: 500 })
  }
  const taken = new Set<string>((existing ?? []).map((r) => r.slug as string))
  const used = new Set<string>((existing ?? []).map((r) => r.source_url as string | null).filter((u): u is string => !!u))

  const candidates = (await fetchCandidates(used)).slice(0, MAX_ATTEMPTS)
  let chosen: { item: SourceItem; article: Article } | null = null
  const started = Date.now()
  for (const item of candidates) {
    if (Date.now() - started > SECOND_ATTEMPT_DEADLINE_MS) break
    try {
      const text = await fetchSourceText(item.link)
      if (!text) continue
      chosen = { item, article: await writeArticle(item, text) }
      break
    } catch (err) {
      console.warn('daily-blog: candidate failed:', item.link, err instanceof Error ? err.message : err)
    }
  }
  if (!chosen) return NextResponse.json({ message: 'No article published: no usable source today.' })

  const { item, article } = chosen
  const html = finalizeContent(article, item)
  const quality = checkQuality(html, item)
  if (!quality.ok) console.warn('daily-blog: quality check failed, saving as draft:', quality.reasons.join('; '))
  const status = quality.ok ? 'published' : 'draft'

  const slug = uniqueSlug(article.title, taken)
  try {
    const cover = await generateCover(article.imagePrompt, article.title)
    const coverUrl = await uploadCover(cover, slug, supabase)

    const { error } = await supabase.from('blog_posts').insert({
      title: article.title,
      slug,
      excerpt: article.excerpt,
      content: html,
      category: article.category,
      cover_image_url: coverUrl,
      status,
      published_at: quality.ok ? new Date().toISOString() : null,
      source_url: item.link,
    })
    if (error) {
      if (error.code === '23505' && /source_url/.test(error.message)) return NextResponse.json({ message: 'Source already stored, nothing to do.' })
      throw new Error(error.message)
    }
  } catch (err) {
    console.error('daily-blog: saving failed:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Could not save the article' }, { status: 500 })
  }

  if (quality.ok) {
    revalidatePath('/blog')
    revalidatePath('/sitemap.xml')
  }
  return NextResponse.json({ message: `Saved as ${status}`, slug, status })
}
