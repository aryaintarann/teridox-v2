// JSON.stringify leaves "<" alone, so "</script>" inside a value would close the tag. Escape it for inline <script type="application/ld+json">.
export const jsonLdString = (data: unknown): string => JSON.stringify(data).replace(/</g, '\\u003c')
