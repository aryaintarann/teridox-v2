'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitTestimonial(formData: FormData) {
  const supabase = await createClient()

  const field = (k: string, max: number) => String(formData.get(k) ?? '').trim().slice(0, max)
  const data = {
    client_name: field('name', 100),
    client_position: field('position', 100),
    quote: field('quote', 2000),
    is_active: false, // Default to inactive for review
  }

  if (!data.client_name || !data.quote) {
    return { success: false, error: 'Please provide your name and testimonial.' }
  }

  const { error } = await supabase.from('testimonials').insert([data])

  if (error) {
    console.error('Error submitting testimonial:', error)
    return { success: false, error: 'Failed to submit testimonial. Please try again.' }
  }

  return { success: true }
}
