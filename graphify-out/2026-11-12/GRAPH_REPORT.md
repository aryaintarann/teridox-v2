# Graph Report - teridox-v2  (2026-11-11)

## Corpus Check
- 73 files · ~23,371 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .glb 2, (none) 1, .css 1)

## Summary
- 372 nodes · 805 edges · 25 communities (18 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.95)
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
- shadcn@^4.16.1
- contact/page.tsx
- PostCSS Config
- @google/generative-ai
- Architecture — Website Company Profile Teridox
- PRD — Website Company Profile Teridox
- README.md
- AGENTS.md
- CLAUDE.md
- .claude/CLAUDE.md
- @tailwindcss/typography@^0.5.20
- @tiptap/react

## God Nodes (most connected - your core abstractions)
1. `createClient()` - 53 edges
2. `next` - 39 edges
3. `Reveal()` - 25 edges
4. `react` - 22 edges
5. `RevealText()` - 18 edges
6. `lucide-react` - 17 edges
7. `RevealLink()` - 16 edges
8. `compilerOptions` - 16 edges
9. `Architecture — Website Company Profile Teridox` - 15 edges
10. `CtaBand()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `4.2 Tabel `services`` --references--> `Services`  [INFERRED]
  ARCHITECTURE.md → src/app/services/page.tsx
- `4.7 Row Level Security (RLS)` --references--> `Services`  [INFERRED]
  ARCHITECTURE.md → src/app/services/page.tsx
- `Components` --references--> `PostGrid()`  [INFERRED]
  DESIGN.md → src/components/blog/post-grid.tsx
- `Components` --references--> `ContactForm()`  [INFERRED]
  DESIGN.md → src/components/contact/contact-form.tsx
- `Components` --references--> `LogoHero()`  [INFERRED]
  DESIGN.md → src/components/home/logo-hero.tsx

## Import Cycles
- None detected.

## Communities (25 total, 7 thin omitted)

### Community 0 - "Admin Server Actions"
Cohesion: 0.13
Nodes (29): createBlogPost(), createProject(), createTestimonial(), deleteBlogPost(), deleteProject(), httpUrl(), reqTitle(), status() (+21 more)

### Community 1 - "CtaBand"
Cohesion: 0.11
Nodes (39): Motion, sanitize-html, About(), delivery, metadata, values, Blog(), metadata (+31 more)

### Community 2 - "Admin Editors & React"
Cohesion: 0.18
Nodes (19): nextConfig, lucide-react, next, react, react-dom, EditBlogPost(), SubmitButton(), NewBlogPost() (+11 more)

### Community 3 - "shadcn Config"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "middleware.ts"
Cohesion: 0.47
Nodes (3): updateSession(), config, proxy()

### Community 5 - "dependencies"
Cohesion: 0.09
Nodes (22): dependencies, clsx@^2.1.1, lucide-react@^1.28.0, next@16.3.0, phantom-ui@^0.1.0, react@19.2.8, react-dom@19.2.8, sanitize-html@^2.17.6 (+14 more)

### Community 6 - "app/layout.tsx"
Cohesion: 0.06
Nodes (39): 8. Dark/Light Mode, Colors, Components, Content rules, Copy, Overview, Responsive, Shape (+31 more)

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
Cohesion: 0.15
Nodes (18): devDependencies, tailwindcss@^4, @tailwindcss/postcss@^4, @types/node@^20, @types/react@^19, @types/react-dom@^19, @types/three@^0.187.0, typescript@^5 (+10 more)

### Community 11 - "ESLint Config"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.3.0, eslint, eslint-config-next

### Community 12 - "npm Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 14 - "contact/page.tsx"
Cohesion: 0.60
Nodes (3): submitContactForm(), ContactForm(), interests

### Community 16 - "@google/generative-ai"
Cohesion: 0.33
Nodes (4): @google/generative-ai@^0.24.1, tailwind-merge@^3.6.0, @google/generative-ai, tailwind-merge

### Community 17 - "Architecture — Website Company Profile Teridox"
Cohesion: 0.08
Nodes (24): 10. Media & Storage, 11. Deployment & CI/CD, 12. Keamanan, 13. Performance, 14. Rangkuman Keputusan Arsitektur Utama, 1. Gambaran Arsitektur, 2. Tech Stack & Rationale, 3. Struktur Folder (Next.js App Router) (+16 more)

### Community 18 - "PRD — Website Company Profile Teridox"
Cohesion: 0.08
Nodes (23): 10. Asumsi & Risiko, 11. Milestone (Usulan Fase Pengerjaan), 12. Metrik Keberhasilan (KPI), 1. Ringkasan Produk, 2. Tujuan Produk, 3. Target Pengguna, 4. Problem Statement, 5.1 Halaman Publik (+15 more)

### Community 19 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Admin Editors & React` to `Admin Server Actions`, `CtaBand`, `middleware.ts`, `dependencies`, `app/layout.tsx`, `Dev Dependencies`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **Should `Admin Server Actions` be split into smaller, more focused modules?**
  _Cohesion score 0.12896405919661733 - nodes in this community are weakly interconnected._
- **Why does `createClient()` connect `Admin Server Actions` to `testimonial/page.tsx`, `CtaBand`, `Admin Editors & React`, `contact/page.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Should `CtaBand` be split into smaller, more focused modules?**
  _Cohesion score 0.10505050505050505 - nodes in this community are weakly interconnected._
- **Why does `Architecture — Website Company Profile Teridox` connect `Architecture — Website Company Profile Teridox` to `app/layout.tsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Should `shadcn Config` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._