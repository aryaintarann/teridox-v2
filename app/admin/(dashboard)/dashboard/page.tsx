export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border p-4 bg-surface-card flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">Total Projects</span>
          <span className="text-3xl font-bold">12</span>
        </div>
        <div className="border border-border p-4 bg-surface-card flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">Blog Posts</span>
          <span className="text-3xl font-bold">24</span>
        </div>
        <div className="border border-border p-4 bg-surface-card flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">New Messages</span>
          <span className="text-3xl font-bold">3</span>
        </div>
      </div>
      
      <div className="border border-border p-6 bg-surface-card mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p className="text-muted-foreground">No recent activity.</p>
      </div>
    </div>
  );
}
