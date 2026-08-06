import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm text-muted-foreground mb-8 text-center md:text-left">
          <div className="flex flex-col gap-2 border-r border-border md:pr-4">
            <Link href="/about" className="hover:text-foreground">About</Link>
          </div>
          <div className="flex flex-col gap-2 border-r border-border md:px-4">
            <Link href="/services" className="hover:text-foreground">Services</Link>
          </div>
          <div className="flex flex-col gap-2 border-r border-border md:px-4">
            <Link href="/project" className="hover:text-foreground">Project</Link>
          </div>
          <div className="flex flex-col gap-2 border-r border-border md:px-4">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
          </div>
          <div className="flex flex-col gap-2 md:pl-4">
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Teridox</div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-foreground">Brand</Link>
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
