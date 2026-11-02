# Graph Report - teridox-v2  (2026-11-02)

## Corpus Check
- Corpus is ~20,905 words - fits in a single context window. You may not need a graph.

## Summary
- 240 nodes · 494 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15

## God Nodes (most connected - your core abstractions)
1. `createClient()` - 46 edges
2. `next` - 32 edges
3. `react` - 24 edges
4. `FadeIn()` - 19 edges
5. `lucide-react` - 17 edges
6. `compilerOptions` - 16 edges
7. `ImageUploader()` - 10 edges
8. `RichTextEditor()` - 10 edges
9. `createClient()` - 9 edges
10. `tailwind` - 6 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createClient()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/lib/supabase/server.ts
- `About()` --calls--> `FadeIn()`  [EXTRACTED]
  src/app/about/page.tsx → src/components/animations/fade-in.tsx
- `AdminBlog()` --calls--> `createClient()`  [EXTRACTED]
  src/app/admin/(dashboard)/blog/page.tsx → src/lib/supabase/server.ts
- `AdminInbox()` --calls--> `createClient()`  [EXTRACTED]
  src/app/admin/(dashboard)/inbox/page.tsx → src/lib/supabase/server.ts
- `AdminDashboard()` --calls--> `createClient()`  [EXTRACTED]
  src/app/admin/(dashboard)/page.tsx → src/lib/supabase/server.ts

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (20): createBlogPost(), createProject(), deleteBlogPost(), deleteProject(), toggleTestimonialStatus(), updateBlogPost(), updateProject(), updateSiteSettings() (+12 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (15): About(), Blog(), revalidate, BlogPost(), generateMetadata(), submitContactForm(), Contact(), Project() (+7 more)

### Community 2 - "Community 2"
Cohesion: 0.28
Nodes (14): lucide-react, react, react-dom, EditBlogPost(), SubmitButton(), NewBlogPost(), SubmitButton(), EditProject() (+6 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (10): nextConfig, next, Home(), revalidate, Typewriter(), TypewriterProps, HeroTUI(), updateSession() (+2 more)

### Community 5 - "Community 5"
Cohesion: 0.11
Nodes (19): dependencies, gooey-toast@^0.2.2, @google/generative-ai@^0.24.1, lucide-react@^1.28.0, next@16.3.0, react@19.2.8, react-dom@19.2.8, sanitize-html@^2.17.6 (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.17
Nodes (12): next-themes@^0.4.6, next-themes, jetbrainsMono, jsonLd, mcpLd, metadata, RootLayout(), Footer() (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (13): framer-motion@^13.0.0, shadcn@^4.16.1, @tailwindcss/typography@^0.5.20, @tiptap/starter-kit@^3.29.2, @types/sanitize-html@^2.16.1, name, private, version (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.19
Nodes (11): @base-ui/react@^1.7.0, class-variance-authority@^0.7.1, clsx@^2.1.1, tailwind-merge@^3.6.0, @base-ui/react, class-variance-authority, clsx, tailwind-merge (+3 more)

### Community 10 - "Community 10"
Cohesion: 0.15
Nodes (13): devDependencies, tailwindcss@^4, @tailwindcss/postcss@^4, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5, tailwindcss (+5 more)

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.3.0, eslint, eslint-config-next

### Community 12 - "Community 12"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Community 4` to `Community 0`, `Community 1`, `Community 2`, `Community 5`, `Community 6`, `Community 8`?**
  _High betweenness centrality (0.240) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12834224598930483 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Community 2` to `Community 1`, `Community 4`, `Community 5`, `Community 6`, `Community 8`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.13846153846153847 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Community 5` to `Community 6`, `Community 8`, `Community 9`, `Community 13`, `Community 14`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._