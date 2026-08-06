'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitTestimonial(formData: FormData) {
  const supabase = await createClient()

  const data = {
    client_name: formData.get('name') as string,
    client_position: formData.get('position') as string,
    quote: formData.get('quote') as string,
    is_active: false, // Default to inactive for review
  }

  const { error } = await supabase.from('testimonials').insert([data])

  if (error) {
    console.error('Error submitting testimonial:', error)
    return { success: false, error: 'Failed to submit testimonial. Please try again.' }
  }

  return { success: true }
}
