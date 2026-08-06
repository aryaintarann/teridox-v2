import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default async function AdminProjects() {
  const supabase = await createClient()
  const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Link href="/admin/projects/new" className="bg-foreground text-background px-4 py-2 rounded-sm text-sm font-medium hover:bg-foreground/90 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>
      
      <div className="bg-surface-card border border-border rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface-soft text-sm text-muted-foreground">
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id} className="border-b border-border hover:bg-surface-soft/50 transition-colors">
                  <td className="p-4 font-medium">{project.title}</td>
                  <td className="p-4 text-muted-foreground">{project.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-sm text-xs font-medium ${project.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/projects/${project.id}`} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-surface-soft">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-sm hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
