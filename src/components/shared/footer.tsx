import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/project", "Projects"],
  ["/blog", "Blog"],
  ["/contact", "Contact"],
] as const;

export function Footer() {
  return (
    <Reveal
      as="footer"
      y={12}
      className="wrap mt-auto flex flex-wrap items-center justify-between gap-x-8 gap-y-2 pb-10 pt-4 text-sm text-muted-foreground"
    >
      <span className="text-lg font-extrabold tracking-tight text-foreground">Teridox</span>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 font-semibold">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="py-3 hover:text-foreground hover:underline">
            {label}
          </Link>
        ))}
      </nav>
      <span>© {new Date().getFullYear()} Teridox. All rights reserved.</span>
    </Reveal>
  );
}
