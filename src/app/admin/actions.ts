'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const text = (f: FormData, k: string) => String(f.get(k) ?? '').trim()
const reqTitle = (f: FormData) => { const v = text(f, 'title'); if (!v) throw new Error('Title is required'); return v }
const status = (f: FormData) => (text(f, 'status') === 'published' ? 'published' : 'draft')
const httpUrl = (f: FormData, k: string) => {
  const v = text(f, k)
  if (v && !/^https?:\/\//i.test(v)) throw new Error(`Invalid ${k}`)
  return v
}

async function uniqueSlug(supabase: Awaited<ReturnType<typeof createClient>>, table: string, title: string) {
  const base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'untitled'
  const { data } = await supabase.from(table).select('slug').like('slug', `${base}%`)
  const taken = new Set((data ?? []).map((r) => r.slug))
  let slug = base
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`
  return slug
}

export async function createProject(formData: FormData): Promise<void> {
  const supabase = await createClient()

  await requireAdmin(supabase)
  const title = reqTitle(formData)

  const techStackString = formData.get('tech_stack') as string
  const techStack = techStackString 
    ? techStackString.split(',').map(s => s.trim()).filter(Boolean)
    : []

  const data = {
    title,
    slug: await uniqueSlug(supabase, 'projects', title),
    category: text(formData, 'category'),
    summary: text(formData, 'summary'),
    description: text(formData, 'description'),
    cover_image_url: httpUrl(formData, 'cover_image_url'),
    preview_url: httpUrl(formData, 'preview_url'),
    tech_stack: techStack,
    status: status(formData),
  }

  const { error } = await supabase.from('projects').insert([data])

  if (error) {
    console.error('Error creating project:', error)
    throw new Error('Failed to create project')
  }

  revalidatePath('/admin/projects')
  revalidatePath('/project')
  revalidatePath('/')
  redirect('/admin/projects')
}

export async function createBlogPost(formData: FormData): Promise<void> {
  const supabase = await createClient()

  await requireAdmin(supabase)
  const title = reqTitle(formData)

  const data = {
    title,
    slug: await uniqueSlug(supabase, 'blog_posts', title),
    category: text(formData, 'category'),
    excerpt: text(formData, 'excerpt'),
    content: text(formData, 'content'),
    cover_image_url: httpUrl(formData, 'cover_image_url'),
    status: status(formData),
    published_at: status(formData) === 'published' ? new Date().toISOString() : null
  }

  const { error } = await supabase.from('blog_posts').insert([data])

  if (error) {
    console.error('Error creating blog post:', error)
    throw new Error('Failed to create blog post')
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/')
  redirect('/admin/blog')
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createClient()

  await requireAdmin(supabase)

  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) {
    console.error('Error deleting project:', error)
    throw new Error('Failed to delete project')
  }

  revalidatePath('/admin/projects')
  revalidatePath('/project')
  revalidatePath('/')
}

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = await createClient()

  await requireAdmin(supabase)

  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) {
    console.error('Error deleting blog post:', error)
    throw new Error('Failed to delete blog post')
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function updateProject(id: string, formData: FormData): Promise<void> {
  const supabase = await createClient()

  await requireAdmin(supabase)

  const techStackString = formData.get('tech_stack') as string
  const techStack = techStackString 
    ? techStackString.split(',').map(s => s.trim()).filter(Boolean)
    : []

  const data = {
    title: reqTitle(formData),
    category: text(formData, 'category'),
    summary: text(formData, 'summary'),
    description: text(formData, 'description'),
    cover_image_url: httpUrl(formData, 'cover_image_url'),
    preview_url: httpUrl(formData, 'preview_url'),
    tech_stack: techStack,
    status: status(formData),
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase.from('projects').update(data).eq('id', id)
  if (error) {
    console.error('Error updating project:', error)
    throw new Error('Failed to update project')
  }

  revalidatePath('/admin/projects')
  revalidatePath('/project')
  revalidatePath('/')
  redirect('/admin/projects')
}

export async function updateBlogPost(id: string, formData: FormData): Promise<void> {
  const supabase = await createClient()

  await requireAdmin(supabase)

  const data = {
    title: reqTitle(formData),
    category: text(formData, 'category'),
    excerpt: text(formData, 'excerpt'),
    content: text(formData, 'content'),
    cover_image_url: httpUrl(formData, 'cover_image_url'),
    status: status(formData),
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase.from('blog_posts').update(data).eq('id', id)
  if (!error && data.status === 'published') {
    await supabase.from('blog_posts').update({ published_at: new Date().toISOString() }).eq('id', id).is('published_at', null)
  }
  if (error) {
    console.error('Error updating blog post:', error)
    throw new Error('Failed to update blog post')
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/')
  redirect('/admin/blog')
}

export async function toggleTestimonialStatus(id: string, currentStatus: boolean): Promise<void> {
  const supabase = await createClient()
  
  await requireAdmin(supabase)

  const { error } = await supabase
    .from('testimonials')
    .update({ is_active: !currentStatus })
    .eq('id', id)

  if (error) {
    console.error('Error toggling testimonial:', error)
    throw new Error('Failed to toggle status')
  }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}

export async function updateSiteSettings(formData: FormData): Promise<void> {
  const supabase = await createClient()

  await requireAdmin(supabase)

  const data = {
    email: text(formData, 'email'),
    whatsapp: text(formData, 'whatsapp'),
    linkedin: text(formData, 'linkedin'),
    instagram: text(formData, 'instagram'),
    github: text(formData, 'github'),
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase.from('site_settings').update(data).eq('id', 1)
  
  if (error) {
    console.error('Error updating site settings:', error)
    throw new Error('Failed to update settings')
  }

  revalidatePath('/contact')
  revalidatePath('/admin/settings')
}
