import { login } from '@/app/admin/login/actions'

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string }>
}) {
  const query = await props.searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-surface-card border border-border p-8 rounded-sm shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Admin Login</h1>
          <p className="text-muted-foreground text-sm">Sign in to manage Teridox content.</p>
        </div>
        
        {query?.error && (
          <div className="bg-destructive/10 text-destructive border border-destructive/20 p-3 rounded-sm text-sm mb-6 font-medium">
            {query.error}
          </div>
        )}
        
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium block">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="w-full bg-surface-soft border border-border px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-foreground"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium block">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="w-full bg-surface-soft border border-border px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-foreground"
            />
          </div>
          
          <button 
            formAction={login} 
            className="w-full bg-foreground text-background font-medium py-2.5 rounded-sm hover:bg-foreground/90 transition-colors mt-6"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
