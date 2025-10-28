import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnon) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnon)

// Helper to check if current user is admin
export async function isUserAdmin() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  // Assuming profiles table has is_admin field
  const { data, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (error || !data) return false
  return data.is_admin
}
