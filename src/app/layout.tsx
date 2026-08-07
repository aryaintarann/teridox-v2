import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToasterInit } from "@/components/toaster";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://teridox.com'),
  title: {
    default: "Teridox | Digital Solutions Agency",
    template: "%s | Teridox"
  },
  description: "Teridox is a premier digital solutions agency specializing in high-performance web development, mobile apps, and UI/UX design.",
  keywords: ["Teridox", "Digital Agency", "Web Development", "Mobile Apps", "UI/UX Design", "Software House", "Indonesia"],
  authors: [{ name: "Teridox" }],
  creator: "Teridox",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://teridox.com",
    title: "Teridox | Elevating Digital Experiences",
    description: "We build premium digital solutions, from modern web applications to native mobile apps. Turn your ideas into reality.",
    siteName: "Teridox",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teridox | Digital Solutions Agency",
    description: "We build premium digital solutions, from modern web applications to native mobile apps.",
    creator: "@teridox",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Teridox",
  "url": "https://teridox.com",
  "logo": "https://teridox.com/icon.svg",
  "description": "Digital solutions agency specializing in high-performance web development and UI/UX design.",
  "sameAs": [
    "https://twitter.com/teridox",
    "https://linkedin.com/company/teridox"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jetbrainsMono.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-mono bg-background text-foreground selection:bg-accent selection:text-primary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <ToasterInit />
        </ThemeProvider>
      </body>
    </html>
  );
}
