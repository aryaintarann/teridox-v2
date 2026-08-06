export default function Services() {
  return (
    <div className="flex flex-col gap-[96px] py-12 md:py-24 max-w-5xl mx-auto px-4 md:px-8 w-full">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Our Services</h1>
      <div className="flex flex-col gap-2">
        <div className="flex bg-background text-foreground py-2 border-b border-border">
          <span className="mr-4">[+]</span>
          <span className="font-bold w-48 shrink-0">Web Development</span>
          <span className="text-muted-foreground hidden md:inline">High-performance websites and web applications.</span>
        </div>
        <div className="flex bg-background text-foreground py-2 border-b border-border">
          <span className="mr-4">[+]</span>
          <span className="font-bold w-48 shrink-0">Mobile Apps</span>
          <span className="text-muted-foreground hidden md:inline">Native and cross-platform mobile experiences.</span>
        </div>
        <div className="flex bg-background text-foreground py-2 border-b border-border">
          <span className="mr-4">[+]</span>
          <span className="font-bold w-48 shrink-0">SaaS Solutions</span>
          <span className="text-muted-foreground hidden md:inline">Scalable software as a service architecture.</span>
        </div>
      </div>
    </div>
  );
}
