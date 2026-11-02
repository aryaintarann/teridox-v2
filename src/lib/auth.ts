import type { SupabaseClient } from '@supabase/supabase-js'

// app_metadata can only be written server-side (service role / SQL), so users cannot self-assign it.
export async function getAdmin(supabase: SupabaseClient) {
  const { data: { user } } = await supabase.auth.getUser()
  return user?.app_metadata?.role === 'admin' ? user : null
}

export async function requireAdmin(supabase: SupabaseClient) {
  const user = await getAdmin(supabase)
  if (!user) throw new Error('Unauthorized')
  return user
}
