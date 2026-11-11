# Graph Report - teridox-v2  (2026-11-11)

## Corpus Check
- 72 files · ~23,148 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .glb 2, (none) 1, .css 1)

## Summary
- 368 nodes · 793 edges · 26 communities (19 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `856d678e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Admin Server Actions
- CtaBand
- Admin Editors & React
- shadcn Config
- middleware.ts
- dependencies
- app/layout.tsx
- TypeScript Config
- testimonial/page.tsx
- button.tsx
- Dev Dependencies
- ESLint Config
- npm Scripts
- DESIGN.md
- contact/page.tsx
- PostCSS Config
- @google/generative-ai
- Architecture — Website Company Profile Teridox
- PRD — Website Company Profile Teridox
- README.md
- AGENTS.md
- CLAUDE.md
- .claude/CLAUDE.md
- @supabase/ssr
- @tailwindcss/typography@^0.5.20
- package.json

## God Nodes (most connected - your core abstractions)
1. `createClient()` - 52 edges
2. `next` - 38 edges
3. `Reveal()` - 25 edges
4. `react` - 22 edges
5. `RevealText()` - 18 edges
6. `lucide-react` - 16 edges
7. `RevealLink()` - 16 edges
8. `compilerOptions` - 16 edges
9. `Architecture — Website Company Profile Teridox` - 15 edges
10. `CtaBand()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `4.2 Tabel `services`` --references--> `Services`  [INFERRED]
  ARCHITECTURE.md → src/app/services/page.tsx
- `4.7 Row Level Security (RLS)` --references--> `Services`  [INFERRED]
  ARCHITECTURE.md → src/app/services/page.tsx
- `Components` --references--> `ContactForm()`  [INFERRED]
  DESIGN.md → src/components/contact/contact-form.tsx
- `Components` --references--> `Footer()`  [INFERRED]
  DESIGN.md → src/components/shared/footer.tsx
- `Components` --references--> `Navbar()`  [INFERRED]
  DESIGN.md → src/components/shared/navbar.tsx

## Import Cycles
- None detected.

## Communities (26 total, 7 thin omitted)

### Community 0 - "Admin Server Actions"
Cohesion: 0.11
Nodes (31): nextConfig, next, createBlogPost(), createProject(), deleteBlogPost(), deleteProject(), httpUrl(), reqTitle() (+23 more)

### Community 1 - "CtaBand"
Cohesion: 0.10
Nodes (42): Components, Motion, motion, sanitize-html, About(), delivery, metadata, values (+34 more)

### Community 2 - "Admin Editors & React"
Cohesion: 0.32
Nodes (14): lucide-react, react, react-dom, EditBlogPost(), SubmitButton(), NewBlogPost(), SubmitButton(), EditProject() (+6 more)

### Community 3 - "shadcn Config"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "middleware.ts"
Cohesion: 0.47
Nodes (3): updateSession(), config, proxy()

### Community 5 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, gooey-toast@^0.2.2, lucide-react@^1.28.0, motion@^14.12.0, next@16.3.0, react@19.2.8, react-dom@19.2.8, sanitize-html@^2.17.6 (+11 more)

### Community 6 - "app/layout.tsx"
Cohesion: 0.10
Nodes (23): 8. Dark/Light Mode, next-themes@^0.4.6, three@^0.187.0, next-themes, three, jakarta, jsonLd, mcpLd (+15 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "testimonial/page.tsx"
Cohesion: 0.48
Nodes (4): submitTestimonial(), TestimonialPage(), FadeIn(), FadeInProps

### Community 9 - "button.tsx"
Cohesion: 0.32
Nodes (7): @base-ui/react@^1.7.0, class-variance-authority@^0.7.1, @base-ui/react, class-variance-authority, Button(), buttonVariants, cn()

### Community 10 - "Dev Dependencies"
Cohesion: 0.13
Nodes (15): devDependencies, tailwindcss@^4, @tailwindcss/postcss@^4, @types/node@^20, @types/react@^19, @types/react-dom@^19, @types/three@^0.187.0, typescript@^5 (+7 more)

### Community 11 - "ESLint Config"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.3.0, eslint, eslint-config-next

### Community 12 - "npm Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 13 - "DESIGN.md"
Cohesion: 0.22
Nodes (8): Colors, Content rules, Copy, Overview, Responsive, Shape, Surfaces, Typography

### Community 14 - "contact/page.tsx"
Cohesion: 0.39
Nodes (5): submitContactForm(), Contact(), metadata, ContactForm(), interests

### Community 17 - "Architecture — Website Company Profile Teridox"
Cohesion: 0.08
Nodes (24): 10. Media & Storage, 11. Deployment & CI/CD, 12. Keamanan, 13. Performance, 14. Rangkuman Keputusan Arsitektur Utama, 1. Gambaran Arsitektur, 2. Tech Stack & Rationale, 3. Struktur Folder (Next.js App Router) (+16 more)

### Community 18 - "PRD — Website Company Profile Teridox"
Cohesion: 0.08
Nodes (23): 10. Asumsi & Risiko, 11. Milestone (Usulan Fase Pengerjaan), 12. Metrik Keberhasilan (KPI), 1. Ringkasan Produk, 2. Tujuan Produk, 3. Target Pengguna, 4. Problem Statement, 5.1 Halaman Publik (+15 more)

### Community 19 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 25 - "package.json"
Cohesion: 0.14
Nodes (13): clsx@^2.1.1, phantom-ui@^0.1.0, @tiptap/react@^3.29.2, tw-animate-css@^1.4.0, @types/sanitize-html@^2.16.1, name, private, version (+5 more)

## Knowledge Gaps
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Admin Server Actions` to `CtaBand`, `Admin Editors & React`, `middleware.ts`, `dependencies`, `app/layout.tsx`, `contact/page.tsx`, `package.json`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Should `Admin Server Actions` be split into smaller, more focused modules?**
  _Cohesion score 0.11183673469387755 - nodes in this community are weakly interconnected._
- **Why does `createClient()` connect `Admin Server Actions` to `testimonial/page.tsx`, `CtaBand`, `contact/page.tsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Should `CtaBand` be split into smaller, more focused modules?**
  _Cohesion score 0.09860859044162129 - nodes in this community are weakly interconnected._
- **Why does `Architecture — Website Company Profile Teridox` connect `Architecture — Website Company Profile Teridox` to `app/layout.tsx`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Should `shadcn Config` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._