'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitContactForm(formData: FormData) {
  const supabase = await createClient()

  const field = (k: string, max: number) => String(formData.get(k) ?? '').trim().slice(0, max)
  const data = {
    name: field('name', 100),
    email: field('email', 254),
    service_interest: field('interest', 100),
    message: field('message', 5000),
  }

  if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: 'Please fill in your name, a valid email, and a message.' }
  }

  const { error } = await supabase.from('contact_messages').insert([data])

  if (error) {
    return { success: false, error: 'Failed to send message. Please try again later.' }
  }

  return { success: true }
}
