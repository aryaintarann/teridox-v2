import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const wordmark = `
████████╗███████╗██████╗ ██╗██████╗  ██████╗ ██╗  ██╗
╚══██╔══╝██╔════╝██╔══██╗██║██╔══██╗██╔═══██╗╚██╗██╔╝
   ██║   █████╗  ██████╔╝██║██║  ██║██║   ██║ ╚███╔╝ 
   ██║   ██╔══╝  ██╔══██╗██║██║  ██║██║   ██║ ██╔██╗ 
   ██║   ███████╗██║  ██║██║██████╔╝╚██████╔╝██╔╝ ██╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
`.trim();

export function Navbar() {
  return (
    <header className="h-20 border-b border-border bg-background flex items-center px-4 md:px-8">
      <div className="flex w-full items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="flex items-center text-ink hover:text-charcoal transition-colors">
          <pre className="text-[5px] leading-[5px] font-bold tracking-tighter">
            {wordmark}
          </pre>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="hover:underline underline-offset-4">About</Link>
          <Link href="/services" className="hover:underline underline-offset-4">Services</Link>
          <Link href="/project" className="hover:underline underline-offset-4">Project</Link>
          <Link href="/blog" className="hover:underline underline-offset-4">Blog</Link>
          <ThemeToggle />
          <Link href="/contact" className={buttonVariants({ className: "rounded-sm" })}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
