export type Source = { name: string; url: string; hosts: string[]; tier: 1 | 2 }

export type SourceItem = {
  title: string
  link: string
  summary: string
  publishedAt: Date
  source: Source
}

export type Article = {
  title: string
  category: string
  excerpt: string
  seoTitle: string
  seoDescription: string
  contentHtml: string
  imagePrompt: string
}
