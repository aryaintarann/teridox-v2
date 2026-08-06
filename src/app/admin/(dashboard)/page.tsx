import { createClient } from '@/lib/supabase/server'
import { FileText, Briefcase, MessageSquare, Users } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Fetch some quick stats
  const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true })
  const { count: blogCount } = await supabase.from('blog_posts').select('*', { count: 'exact', head: true })
  const { count: inboxCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'new')
  const { count: testimonialCount } = await supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('is_active', true)

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-card border border-border p-6 rounded-sm flex items-center gap-4">
          <div className="bg-surface-soft p-3 rounded-full">
            <Briefcase className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Projects</p>
            <p className="text-2xl font-bold">{projectCount || 0}</p>
          </div>
        </div>
        
        <div className="bg-surface-card border border-border p-6 rounded-sm flex items-center gap-4">
          <div className="bg-surface-soft p-3 rounded-full">
            <FileText className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Blog Posts</p>
            <p className="text-2xl font-bold">{blogCount || 0}</p>
          </div>
        </div>
        
        <div className="bg-surface-card border border-border p-6 rounded-sm flex items-center gap-4">
          <div className="bg-surface-soft p-3 rounded-full">
            <Users className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Testimonials</p>
            <p className="text-2xl font-bold">{testimonialCount || 0}</p>
          </div>
        </div>
        
        <div className="bg-surface-card border border-border p-6 rounded-sm flex items-center gap-4">
          <div className="bg-surface-soft p-3 rounded-full">
            <MessageSquare className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">New Messages</p>
            <p className="text-2xl font-bold">{inboxCount || 0}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
