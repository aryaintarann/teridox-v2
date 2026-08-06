'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitContactForm(formData: FormData) {
  const supabase = await createClient()

  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    service_interest: formData.get('interest') as string,
    message: formData.get('message') as string,
  }

  const { error } = await supabase.from('contact_messages').insert([data])

  if (error) {
    return { success: false, error: 'Failed to send message. Please try again later.' }
  }

  return { success: true }
}
