import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-64 border-r border-border flex flex-col p-4 bg-surface-soft hidden md:flex">
        <div className="font-bold text-lg mb-8 text-ink">Teridox Admin</div>
        <nav className="flex flex-col gap-2 flex-grow">
          <Link href="/admin/dashboard" className="p-2 hover:bg-muted text-sm rounded-sm">Dashboard</Link>
          <Link href="#" className="p-2 hover:bg-muted text-sm rounded-sm text-muted-foreground">Content</Link>
          <Link href="#" className="p-2 hover:bg-muted text-sm rounded-sm text-muted-foreground">Settings</Link>
        </nav>
        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
