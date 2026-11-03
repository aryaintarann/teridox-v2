# Graph Report - teridox-v2  (2026-11-02)

## Corpus Check
- 64 files · ~21,683 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 347 nodes · 640 edges · 27 communities (17 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4591eab7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Admin Server Actions
- Public Pages
- Admin Editors & React
- shadcn Config
- middleware.ts
- Runtime Dependencies
- Theme & Root Layout
- TypeScript Config
- app/page.tsx
- UI Primitives Deps
- Dev Dependencies
- ESLint Config
- npm Scripts
- phantom-ui
- @google/generative-ai
- PostCSS Config
- DESIGN.md
- Architecture — Website Company Profile Teridox
- PRD — Website Company Profile Teridox
- README.md
- AGENTS.md
- CLAUDE.md
- .claude/CLAUDE.md
- @supabase/supabase-js@^2.112.2
- tw-animate-css@^1.4.0
- shadcn@^4.16.1
- @tiptap/extension-image

## God Nodes (most connected - your core abstractions)
1. `createClient()` - 50 edges
2. `next` - 32 edges
3. `react` - 24 edges
4. `FadeIn()` - 19 edges
5. `lucide-react` - 17 edges
6. `compilerOptions` - 16 edges
7. `Architecture — Website Company Profile Teridox` - 15 edges
8. `PRD — Website Company Profile Teridox` - 13 edges
9. `requireAdmin()` - 11 edges
10. `ImageUploader()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `8. Dark/Light Mode` --references--> `ThemeProvider()`  [INFERRED]
  ARCHITECTURE.md → src/components/theme-provider.tsx
- `generateMetadata()` --calls--> `createClient()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/lib/supabase/server.ts
- `generateMetadata()` --calls--> `createClient()`  [EXTRACTED]
  src/app/project/[slug]/page.tsx → src/lib/supabase/server.ts
- `About()` --calls--> `FadeIn()`  [EXTRACTED]
  src/app/about/page.tsx → src/components/animations/fade-in.tsx
- `AdminBlog()` --calls--> `createClient()`  [EXTRACTED]
  src/app/admin/(dashboard)/blog/page.tsx → src/lib/supabase/server.ts

## Import Cycles
- None detected.

## Communities (27 total, 10 thin omitted)

### Community 0 - "Admin Server Actions"
Cohesion: 0.12
Nodes (29): nextConfig, next, createBlogPost(), createProject(), deleteBlogPost(), deleteProject(), httpUrl(), reqTitle() (+21 more)

### Community 1 - "Public Pages"
Cohesion: 0.11
Nodes (19): sanitize-html@^2.17.6, sanitize-html, About(), Blog(), revalidate, BlogPost(), generateMetadata(), submitContactForm() (+11 more)

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
Cohesion: 0.11
Nodes (19): dependencies, framer-motion@^13.0.0, gooey-toast@^0.2.2, lucide-react@^1.28.0, next@16.3.0, react@19.2.8, react-dom@19.2.8, @supabase/ssr@^0.12.4 (+11 more)

### Community 6 - "Theme & Root Layout"
Cohesion: 0.16
Nodes (13): 8. Dark/Light Mode, next-themes@^0.4.6, next-themes, jetbrainsMono, jsonLd, mcpLd, metadata, RootLayout() (+5 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "app/page.tsx"
Cohesion: 0.39
Nodes (5): Home(), revalidate, Typewriter(), TypewriterProps, HeroTUI()

### Community 9 - "UI Primitives Deps"
Cohesion: 0.19
Nodes (11): @base-ui/react@^1.7.0, class-variance-authority@^0.7.1, clsx@^2.1.1, tailwind-merge@^3.6.0, @base-ui/react, class-variance-authority, clsx, tailwind-merge (+3 more)

### Community 10 - "Dev Dependencies"
Cohesion: 0.16
Nodes (16): devDependencies, tailwindcss@^4, @tailwindcss/postcss@^4, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5, name (+8 more)

### Community 11 - "ESLint Config"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.3.0, eslint, eslint-config-next

### Community 12 - "npm Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 16 - "DESIGN.md"
Cohesion: 0.05
Nodes (38): Badges & Chips, Border Radius Scale, Brand & Accent, Breakpoints, Buttons, Cards & Containers, Collapsing Strategy, Colors (+30 more)

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
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Admin Server Actions` to `Public Pages`, `Admin Editors & React`, `middleware.ts`, `Runtime Dependencies`, `Theme & Root Layout`, `app/page.tsx`, `Dev Dependencies`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Should `Admin Server Actions` be split into smaller, more focused modules?**
  _Cohesion score 0.1196808510638298 - nodes in this community are weakly interconnected._
- **Why does `Architecture — Website Company Profile Teridox` connect `Architecture — Website Company Profile Teridox` to `Theme & Root Layout`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Should `Public Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.11397849462365592 - nodes in this community are weakly interconnected._
- **Should `shadcn Config` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._