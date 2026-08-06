import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react'
import { toggleTestimonialStatus } from '@/app/admin/actions'

export default async function AdminTestimonials() {
  const supabase = await createClient()
  const { data: testimonials } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Client Testimonials</h1>
        <Link href="/admin/testimonials/new" className="bg-foreground text-background px-4 py-2 rounded-sm text-sm font-medium hover:bg-foreground/90 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Link>
      </div>
      
      <div className="bg-surface-card border border-border rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface-soft text-sm text-muted-foreground">
              <th className="p-4 font-medium">Client Name</th>
              <th className="p-4 font-medium">Position</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {testimonials && testimonials.length > 0 ? (
              testimonials.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-surface-soft/50 transition-colors">
                  <td className="p-4 font-medium">{item.client_name}</td>
                  <td className="p-4 text-muted-foreground">{item.client_position}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-sm text-xs font-medium ${item.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 items-center">
                      <form action={toggleTestimonialStatus.bind(null, item.id, item.is_active)}>
                        <button 
                          type="submit" 
                          title={item.is_active ? "Deactivate" : "Activate"}
                          className={`p-2 transition-colors rounded-sm hover:bg-surface-soft ${item.is_active ? 'text-green-500 hover:text-green-600' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          {item.is_active ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      </form>
                      <button className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-sm hover:bg-destructive/10" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No testimonials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
