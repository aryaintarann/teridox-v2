import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

const baseUrl = 'https://teridox.com';

type Row = { slug: string; updated_at: string | null; created_at: string | null };

// A real change date or none at all: Google trusts lastmod only when it is accurate, and ignores
// changefreq and priority, so those are left out.
const changed = (r: Row) => {
  const d = new Date(r.updated_at || r.created_at || '');
  return Number.isNaN(d.getTime()) ? undefined : d;
};
const newest = (rows: Row[]) =>
  rows.map(changed).reduce<Date | undefined>((a, d) => (d && (!a || d > a) ? d : a), undefined);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [{ data: projects }, { data: posts }] = await Promise.all([
    supabase.from('projects').select('slug, updated_at, created_at').eq('status', 'published'),
    supabase.from('blog_posts').select('slug, updated_at, created_at').eq('status', 'published'),
  ]);
  const p = (projects ?? []) as Row[];
  const b = (posts ?? []) as Row[];

  return [
    // The home page lists the latest projects and posts, so it changes when they do.
    { url: baseUrl, lastModified: newest([...p, ...b]) },
    { url: `${baseUrl}/services` },
    { url: `${baseUrl}/project`, lastModified: newest(p) },
    { url: `${baseUrl}/blog`, lastModified: newest(b) },
    { url: `${baseUrl}/about` },
    { url: `${baseUrl}/contact` },
    ...p.map((r) => ({ url: `${baseUrl}/project/${r.slug}`, lastModified: changed(r) })),
    ...b.map((r) => ({ url: `${baseUrl}/blog/${r.slug}`, lastModified: changed(r) })),
  ];
}
