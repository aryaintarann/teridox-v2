import { createClient } from '@/lib/supabase/server'
import { Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default async function AdminInbox() {
  const supabase = await createClient()
  const { data: messages } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Contact Inbox</h1>
      
      <div className="bg-surface-card border border-border rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface-soft text-sm text-muted-foreground">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Service</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {messages && messages.length > 0 ? (
              messages.map((msg) => (
                <tr key={msg.id} className="border-b border-border hover:bg-surface-soft/50 transition-colors">
                  <td className="p-4 font-medium">{msg.name}</td>
                  <td className="p-4 text-muted-foreground">{msg.email}</td>
                  <td className="p-4 text-muted-foreground capitalize">{msg.service_interest || 'Other'}</td>
                  <td className="p-4 text-muted-foreground">{new Date(msg.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-sm text-xs font-medium ${msg.status === 'new' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-500'}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/inbox/${msg.id}`} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-surface-soft">
                        <Eye className="w-4 h-4" />
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
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
