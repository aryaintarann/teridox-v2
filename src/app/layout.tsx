import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToasterInit } from "@/components/toaster";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { MotionProvider } from "@/components/motion/provider";
import { IntroLoader } from "@/components/shared/intro-loader";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
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

const mcpLd = {
  mcpVersion: "1.0",
  tools: [
    {
      name: "contactUs",
      description: "Submit a message or inquiry to Teridox through the contact form.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "The full name of the sender" },
          email: { type: "string", description: "The email address of the sender" },
          subject: { type: "string", description: "The subject of the message" },
          message: { type: "string", description: "The content of the message" }
        },
        required: ["name", "email", "subject", "message"]
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sansbg-background text-foreground selection:bg-accent selection:text-primary-foreground">
        {/* Runs before first paint: the intro plays on the home page, once per session, never with
            reduced motion. If the app script never arrives, the timer lifts the overlay on its own. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement.dataset;if(location.pathname==="/"&&!sessionStorage.getItem("teridox-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.intro="play";setTimeout(function(){if(!("introDone" in d))d.intro="off"},10000)}}catch(e){}`,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <IntroLoader />
          <MotionProvider>
          <Navbar />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <script
            type="application/mcp+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(mcpLd) }}
          />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          </MotionProvider>
          <ToasterInit />
        </ThemeProvider>
      </body>
    </html>
  );
}
