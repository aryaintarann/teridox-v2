import { createClient } from '@/lib/supabase/server'
import { updateSiteSettings } from '@/app/admin/actions'
import { Save } from 'lucide-react'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single()

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your public contact information and social links.</p>
      </div>

      <div className="bg-surface-card border border-border p-6 rounded-sm shadow-sm">
        <form action={updateSiteSettings} className="space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-border pb-2">Contact Details</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium block">Email Address</label>
              <input 
                name="email" 
                defaultValue={settings?.email || ''}
                placeholder="hello@teridox.com"
                className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">WhatsApp Number</label>
              <input 
                name="whatsapp" 
                defaultValue={settings?.whatsapp || ''}
                placeholder="+62 800 0000 000"
                className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground" 
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold border-b border-border pb-2">Social Links</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium block">LinkedIn URL</label>
              <input 
                name="linkedin" 
                defaultValue={settings?.linkedin || ''}
                placeholder="https://linkedin.com/company/..."
                className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">Instagram URL</label>
              <input 
                name="instagram" 
                defaultValue={settings?.instagram || ''}
                placeholder="https://instagram.com/..."
                className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">GitHub URL</label>
              <input 
                name="github" 
                defaultValue={settings?.github || ''}
                placeholder="https://github.com/..."
                className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground" 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button 
              type="submit" 
              className="bg-foreground text-background px-6 py-2 rounded-sm font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
