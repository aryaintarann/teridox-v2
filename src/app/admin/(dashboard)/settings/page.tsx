import { createClient } from '@/lib/supabase/server'
import { updateSiteSettings } from '@/app/admin/actions'
import { Save } from 'lucide-react'

type Field = { name: string; label: string; placeholder: string; type?: 'email' | 'url' }

// Every field is optional: the public site shows a detail only when it is filled in.
const GROUPS: { title: string; hint: string; fields: Field[] }[] = [
  {
    title: 'Contact Details',
    hint: 'Shown on the contact page and in search engine data.',
    fields: [
      { name: 'email', label: 'Email Address', placeholder: 'hello@teridox.com', type: 'email' },
      { name: 'whatsapp', label: 'WhatsApp Number', placeholder: '+62 800 0000 000' },
    ],
  },
  {
    title: 'Business Address',
    hint: 'Helps Google and AI search show where you are. Fill in only what you want public.',
    fields: [
      { name: 'street_address', label: 'Street Address', placeholder: 'Jl. Contoh No. 1' },
      { name: 'city', label: 'City', placeholder: 'Denpasar' },
      { name: 'region', label: 'Province / Region', placeholder: 'Bali' },
      { name: 'postal_code', label: 'Postal Code', placeholder: '80111' },
      { name: 'country', label: 'Country', placeholder: 'Indonesia' },
      { name: 'maps_url', label: 'Google Maps / Business Profile URL', placeholder: 'https://maps.app.goo.gl/...', type: 'url' },
    ],
  },
  {
    title: 'Social Links',
    hint: 'Listed in the footer and linked to Teridox in search engine data.',
    fields: [
      { name: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/company/...', type: 'url' },
      { name: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...', type: 'url' },
      { name: 'github', label: 'GitHub URL', placeholder: 'https://github.com/...', type: 'url' },
      { name: 'x_url', label: 'X (Twitter) URL', placeholder: 'https://x.com/...', type: 'url' },
      { name: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/...', type: 'url' },
      { name: 'youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/@...', type: 'url' },
      { name: 'tiktok', label: 'TikTok URL', placeholder: 'https://tiktok.com/@...', type: 'url' },
      { name: 'dribbble', label: 'Dribbble URL', placeholder: 'https://dribbble.com/...', type: 'url' },
      { name: 'behance', label: 'Behance URL', placeholder: 'https://behance.net/...', type: 'url' },
    ],
  },
]

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single()
  const row = (settings ?? {}) as Record<string, string | null>

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your public contact information, address and social links.</p>
      </div>

      <div className="bg-surface-card border border-border p-6 rounded-sm shadow-sm">
        <form action={updateSiteSettings} className="space-y-8">
          {GROUPS.map((g) => (
            <div key={g.title} className="space-y-4">
              <div className="border-b border-border pb-2">
                <h3 className="text-lg font-bold">{g.title}</h3>
                <p className="text-sm text-muted-foreground">{g.hint}</p>
              </div>
              {g.fields.map((f) => (
                <div key={f.name} className="space-y-2">
                  <label htmlFor={`s-${f.name}`} className="text-sm font-medium block">{f.label}</label>
                  <input
                    id={`s-${f.name}`}
                    name={f.name}
                    type={f.type ?? 'text'}
                    defaultValue={row[f.name] ?? ''}
                    placeholder={f.placeholder}
                    className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground"
                  />
                </div>
              ))}
            </div>
          ))}

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
