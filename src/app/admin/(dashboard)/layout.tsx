import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, FileText, Briefcase, MessageSquare, Users, LogOut, Settings } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface-card flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/admin" className="font-bold text-xl tracking-tight">Teridox Admin</Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium hover:bg-surface-soft text-foreground">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium hover:bg-surface-soft text-muted-foreground hover:text-foreground">
              <Briefcase className="w-4 h-4" />
              Projects
            </Link>
            <Link href="/admin/blog" className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium hover:bg-surface-soft text-muted-foreground hover:text-foreground">
              <FileText className="w-4 h-4" />
              Blog Posts
            </Link>
            <Link href="/admin/testimonials" className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium hover:bg-surface-soft text-muted-foreground hover:text-foreground">
              <Users className="w-4 h-4" />
              Testimonials
            </Link>
            <Link href="/admin/inbox" className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium hover:bg-surface-soft text-muted-foreground hover:text-foreground">
              <MessageSquare className="w-4 h-4" />
              Contact Inbox
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium hover:bg-surface-soft text-muted-foreground hover:text-foreground">
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t border-border">
          <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center gap-3 px-3 py-2 w-full rounded-sm text-sm font-medium hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 md:hidden">
           <Link href="/admin" className="font-bold text-xl tracking-tight">Teridox Admin</Link>
           {/* Mobile menu button could go here */}
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
