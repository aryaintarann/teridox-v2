# Graph Report - teridox-v2  (2026-11-17)

## Corpus Check
- 99 files · ~36,599 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: .glb 2, .css 2, (none) 1)

## Summary
- 514 nodes · 1126 edges · 28 communities (19 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 37 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `33dd8286`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Admin Server Actions
- CtaBand
- next
- shadcn Config
- clsx
- dependencies
- app/layout.tsx
- TypeScript Config
- testimonial/page.tsx
- button.tsx
- Dev Dependencies
- ESLint Config
- npm Scripts
- package.json
- daily-blog/route.ts
- PostCSS Config
- @supabase/ssr
- Architecture — Website Company Profile Teridox
- PRD — Website Company Profile Teridox
- README.md
- AGENTS.md
- CLAUDE.md
- .claude/CLAUDE.md
- Blog harian otomatis dengan AI — Desain
- DESIGN.md
- @tailwindcss/typography@^0.5.20
- tw-animate-css@^1.4.0
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `createClient()` - 54 edges
2. `next` - 44 edges
3. `Reveal()` - 30 edges
4. `react` - 26 edges
5. `RevealText()` - 18 edges
6. `lucide-react` - 17 edges
7. `Home()` - 17 edges
8. `RevealLink()` - 16 edges
9. `compilerOptions` - 16 edges
10. `Architecture — Website Company Profile Teridox` - 15 edges

## Surprising Connections (you probably didn't know these)
- `SEO, GEO, dan AI search` --references--> `Article`  [INFERRED]
  docs/superpowers/specs/2026-11-11-daily-ai-blog-design.md → src/lib/daily-blog/types.ts
- `9.1 SEO Tradisional` --references--> `Article`  [INFERRED]
  ARCHITECTURE.md → src/lib/daily-blog/types.ts
- `9.1 SEO Tradisional` --references--> `Service`  [INFERRED]
  ARCHITECTURE.md → src/components/home/service-grid.tsx
- `Motion` --references--> `Reveal()`  [INFERRED]
  DESIGN.md → src/components/motion/reveal.tsx
- `Motion` --references--> `RevealLink()`  [INFERRED]
  DESIGN.md → src/components/motion/reveal.tsx

## Import Cycles
- None detected.

## Communities (28 total, 9 thin omitted)

### Community 0 - "Admin Server Actions"
Cohesion: 0.09
Nodes (39): createBlogPost(), createProject(), createTestimonial(), deleteBlogPost(), deleteProject(), httpUrl(), reqTitle(), status() (+31 more)

### Community 1 - "CtaBand"
Cohesion: 0.07
Nodes (60): Motion, motion, sanitize-html, About(), delivery, metadata, values, Blog() (+52 more)

### Community 2 - "next"
Cohesion: 0.12
Nodes (24): nextConfig, lucide-react, next, react, react-dom, EditBlogPost(), SubmitButton(), NewBlogPost() (+16 more)

### Community 3 - "shadcn Config"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, fast-xml-parser@^5.12.0, gooey-toast@^0.2.2, @google/generative-ai@^0.24.1, lucide-react@^1.28.0, motion@^14.12.0, next@16.4.6, react@19.2.8 (+13 more)

### Community 6 - "app/layout.tsx"
Cohesion: 0.09
Nodes (26): next-themes@^0.4.6, three@^0.187.0, next-themes, three, jakarta, mcpLd, metadata, RootLayout() (+18 more)

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
Cohesion: 0.12
Nodes (16): devDependencies, tailwindcss@^4, @tailwindcss/postcss@^4, @types/node@^20, @types/react@^19, @types/react-dom@^19, @types/three@^0.187.0, typescript@^5 (+8 more)

### Community 11 - "ESLint Config"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 12 - "npm Scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, start, test

### Community 13 - "package.json"
Cohesion: 0.14
Nodes (13): allowScripts, unrs-resolver@1.12.2, phantom-ui@^0.1.0, @tiptap/react@^3.34.0, @tiptap/starter-kit@^3.34.0, name, overrides, postcss-selector-parser (+5 more)

### Community 14 - "daily-blog/route.ts"
Cohesion: 0.06
Nodes (58): Blog Harian Otomatis dengan AI — Rencana Implementasi, Global Constraints, Review Focus, Self-Review, Struktur File, Task 1: Fondasi (dependensi, tes, migrasi, tipe), Task 2: Sumber berita (`sources.ts`), Task 3: Cek mutu dan perakit konten (`quality.ts`) (+50 more)

### Community 17 - "Architecture — Website Company Profile Teridox"
Cohesion: 0.07
Nodes (26): 10. Media & Storage, 11. Deployment & CI/CD, 12. Keamanan, 13. Performance, 14. Rangkuman Keputusan Arsitektur Utama, 1. Gambaran Arsitektur, 2. Tech Stack & Rationale, 3. Struktur Folder (Next.js App Router) (+18 more)

### Community 18 - "PRD — Website Company Profile Teridox"
Cohesion: 0.08
Nodes (23): 10. Asumsi & Risiko, 11. Milestone (Usulan Fase Pengerjaan), 12. Metrik Keberhasilan (KPI), 1. Ringkasan Produk, 2. Tujuan Produk, 3. Target Pengguna, 4. Problem Statement, 5.1 Halaman Publik (+15 more)

### Community 19 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 23 - "Blog harian otomatis dengan AI — Desain"
Cohesion: 0.14
Nodes (13): Alur, Aturan editorial, Blog harian otomatis dengan AI — Desain, Cek mutu otomatis (sebelum `published`), Daftar sumber (sudah diuji hidup pada 2026-11-11), Keamanan, Keputusan yang sudah disetujui, Komponen dan file (+5 more)

### Community 24 - "DESIGN.md"
Cohesion: 0.20
Nodes (9): Colors, Components, Content rules, Copy, Overview, Responsive, Shape, Surfaces (+1 more)

## Knowledge Gaps
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `Admin Server Actions`, `CtaBand`, `dependencies`, `app/layout.tsx`, `package.json`, `daily-blog/route.ts`?**
  _High betweenness centrality (0.309) - this node is a cross-community bridge._
- **Should `Admin Server Actions` be split into smaller, more focused modules?**
  _Cohesion score 0.09085213032581453 - nodes in this community are weakly interconnected._
- **Why does `Article` connect `daily-blog/route.ts` to `Architecture — Website Company Profile Teridox`, `Blog harian otomatis dengan AI — Desain`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Should `CtaBand` be split into smaller, more focused modules?**
  _Cohesion score 0.06741250717154332 - nodes in this community are weakly interconnected._
- **Why does `9.1 SEO Tradisional` connect `Architecture — Website Company Profile Teridox` to `daily-blog/route.ts`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.12307692307692308 - nodes in this community are weakly interconnected._
- **Should `shadcn Config` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._