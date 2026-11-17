// One source for the visible home sections and their JSON-LD, so the two never drift apart.
export const HOME_SERVICES = [
  {
    name: "Web Development",
    text: "Custom websites and web applications built for speed, SEO, and security, from high-conversion landing pages to corporate portals.",
  },
  {
    name: "Mobile App Development",
    text: "Cross-platform iOS and Android apps from a single codebase, with native-like performance and clear UI/UX.",
  },
  {
    name: "SaaS Solutions",
    text: "Scalable software-as-a-service products: database design, authentication, payment integration, and multi-tenant logic.",
  },
  {
    name: "AI Integration",
    text: "Automation and AI features added to the workflows and applications you already use.",
  },
] as const;

export const HOME_PROCESS = [
  { step: "Discover", text: "We learn your goals, users, and constraints, then agree on scope." },
  { step: "Design", text: "We shape the structure and interface before any build work starts." },
  { step: "Build", text: "We develop in small releases so you can review working software early." },
  { step: "Launch & support", text: "We ship, monitor, and keep improving after go-live." },
] as const;

export const HOME_STACK = ["React", "Next.js", "React Native", "Flutter", "Node.js", "PostgreSQL", "Laravel"] as const;

export const HOME_FAQ = [
  {
    q: "What does Teridox do?",
    a: "Teridox is a web development and software agency. We build websites and web applications, cross-platform mobile apps, SaaS products, and AI integrations for growing businesses.",
  },
  {
    q: "How much does a website or app cost?",
    a: "The price depends on scope: number of pages or features, integrations, and design depth. Send us a short brief through the contact form and we reply with a quote for your project.",
  },
  {
    q: "How long does a web development project take?",
    a: "A focused landing page or company site is much quicker than a custom platform or SaaS product. We give a timeline after the discovery step, once the scope is clear.",
  },
  {
    q: "Which technologies do you use?",
    a: "React and Next.js for the web, React Native and Flutter for mobile, Node.js, Laravel, and PostgreSQL on the back end. We pick the stack that fits the project.",
  },
  {
    q: "Do you build iOS and Android apps?",
    a: "Yes. We build cross-platform apps that run on both iOS and Android from one codebase.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Launch is not the end of the project: we monitor, fix, and keep improving the product after go-live.",
  },
] as const;
