'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData): Promise<void> {
  const supabase = await createClient()

  const techStackString = formData.get('tech_stack') as string
  const techStack = techStackString 
    ? techStackString.split(',').map(s => s.trim()).filter(Boolean)
    : []

  const data = {
    title: formData.get('title') as string,
    slug: (formData.get('title') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    category: formData.get('category') as string,
    summary: formData.get('summary') as string,
    description: formData.get('description') as string,
    cover_image_url: formData.get('cover_image_url') as string,
    tech_stack: techStack,
    status: formData.get('status') as string || 'draft',
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

  const data = {
    title: formData.get('title') as string,
    slug: (formData.get('title') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    category: formData.get('category') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    cover_image_url: formData.get('cover_image_url') as string,
    status: formData.get('status') as string || 'draft',
    published_at: formData.get('status') === 'published' ? new Date().toISOString() : null
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

export async function toggleTestimonialStatus(id: string, currentStatus: boolean): Promise<void> {
  const supabase = await createClient()
  
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
