# Graph Report - teridox-v2  (2026-11-11)

## Corpus Check
- 67 files · ~20,035 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .glb 1, .css 1)

## Summary
- 347 nodes · 657 edges · 30 communities (18 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c0ac916c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Admin Server Actions
- CtaBand
- Admin Editors & React
- shadcn Config
- middleware.ts
- Runtime Dependencies
- Theme & Root Layout
- TypeScript Config
- testimonial/page.tsx
- package.json
- Dev Dependencies
- ESLint Config
- npm Scripts
- contact/page.tsx
- class-variance-authority
- PostCSS Config
- DESIGN.md
- Architecture — Website Company Profile Teridox
- PRD — Website Company Profile Teridox
- README.md
- AGENTS.md
- CLAUDE.md
- .claude/CLAUDE.md
- @supabase/supabase-js@^2.112.2
- sanitize-html
- shadcn@^4.16.1
- @tiptap/extension-image
- @supabase/ssr
- tailwind-merge
- @tiptap/react

## God Nodes (most connected - your core abstractions)
1. `createClient()` - 52 edges
2. `next` - 37 edges
3. `react` - 19 edges
4. `compilerOptions` - 16 edges
5. `lucide-react` - 15 edges
6. `Architecture — Website Company Profile Teridox` - 15 edges
7. `PRD — Website Company Profile Teridox` - 13 edges
8. `CtaBand()` - 12 edges
9. `requireAdmin()` - 11 edges
10. `ImageUploader()` - 10 edges

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

## Communities (30 total, 12 thin omitted)

### Community 0 - "Admin Server Actions"
Cohesion: 0.11
Nodes (31): nextConfig, next, createBlogPost(), createProject(), deleteBlogPost(), deleteProject(), httpUrl(), reqTitle() (+23 more)

### Community 1 - "CtaBand"
Cohesion: 0.09
Nodes (28): Components, three, About(), delivery, metadata, values, Blog(), metadata (+20 more)

### Community 2 - "Admin Editors & React"
Cohesion: 0.32
Nodes (14): lucide-react, react, react-dom, EditBlogPost(), SubmitButton(), NewBlogPost(), SubmitButton(), EditProject() (+6 more)

### Community 3 - "shadcn Config"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "middleware.ts"
Cohesion: 0.47
Nodes (3): updateSession(), config, proxy()

### Community 5 - "Runtime Dependencies"
Cohesion: 0.12
Nodes (16): dependencies, clsx@^2.1.1, gooey-toast@^0.2.2, lucide-react@^1.28.0, next@16.3.0, phantom-ui@^0.1.0, react@19.2.8, react-dom@19.2.8 (+8 more)

### Community 6 - "Theme & Root Layout"
Cohesion: 0.14
Nodes (15): 8. Dark/Light Mode, next-themes@^0.4.6, next-themes, jakarta, jsonLd, mcpLd, metadata, RootLayout() (+7 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "testimonial/page.tsx"
Cohesion: 0.21
Nodes (9): framer-motion@^13.0.0, framer-motion, submitTestimonial(), TestimonialPage(), FadeIn(), FadeInProps, Typewriter(), TypewriterProps (+1 more)

### Community 9 - "package.json"
Cohesion: 0.17
Nodes (11): @base-ui/react@^1.7.0, @google/generative-ai@^0.24.1, @tiptap/starter-kit@^3.29.2, tw-animate-css@^1.4.0, name, private, version, @base-ui/react (+3 more)

### Community 10 - "Dev Dependencies"
Cohesion: 0.13
Nodes (15): devDependencies, tailwindcss@^4, @tailwindcss/postcss@^4, @types/node@^20, @types/react@^19, @types/react-dom@^19, @types/three@^0.187.0, typescript@^5 (+7 more)

### Community 11 - "ESLint Config"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.3.0, eslint, eslint-config-next

### Community 12 - "npm Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 13 - "contact/page.tsx"
Cohesion: 0.39
Nodes (5): submitContactForm(), Contact(), metadata, ContactForm(), interests

### Community 16 - "DESIGN.md"
Cohesion: 0.20
Nodes (9): Colors, Content rules, Copy, Motion, Overview, Responsive, Shape, Surfaces (+1 more)

### Community 17 - "Architecture — Website Company Profile Teridox"
Cohesion: 0.07
Nodes (27): 10. Media & Storage, 11. Deployment & CI/CD, 12. Keamanan, 13. Performance, 14. Rangkuman Keputusan Arsitektur Utama, 1. Gambaran Arsitektur, 2. Tech Stack & Rationale, 3. Struktur Folder (Next.js App Router) (+19 more)

### Community 18 - "PRD — Website Company Profile Teridox"
Cohesion: 0.08
Nodes (23): 10. Asumsi & Risiko, 11. Milestone (Usulan Fase Pengerjaan), 12. Metrik Keberhasilan (KPI), 1. Ringkasan Produk, 2. Tujuan Produk, 3. Target Pengguna, 4. Problem Statement, 5.1 Halaman Publik (+15 more)

### Community 19 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Admin Server Actions` to `CtaBand`, `Admin Editors & React`, `middleware.ts`, `Runtime Dependencies`, `Theme & Root Layout`, `testimonial/page.tsx`, `package.json`, `contact/page.tsx`, `Architecture — Website Company Profile Teridox`?**
  _High betweenness centrality (0.228) - this node is a cross-community bridge._
- **Should `Admin Server Actions` be split into smaller, more focused modules?**
  _Cohesion score 0.11137254901960784 - nodes in this community are weakly interconnected._
- **Why does `createClient()` connect `Admin Server Actions` to `testimonial/page.tsx`, `CtaBand`, `contact/page.tsx`, `Architecture — Website Company Profile Teridox`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `CtaBand` be split into smaller, more focused modules?**
  _Cohesion score 0.08502024291497975 - nodes in this community are weakly interconnected._
- **Why does `Architecture — Website Company Profile Teridox` connect `Architecture — Website Company Profile Teridox` to `Theme & Root Layout`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Should `shadcn Config` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._