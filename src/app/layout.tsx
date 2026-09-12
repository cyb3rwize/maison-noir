import type { Metadata } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

import Providers from '@/components/providers/Providers'
import CustomCursor from '@/components/floating/CustomCursor'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MobileDock } from '@/components/floating/MobileDock'
import { FloatingCTA } from '@/components/floating/FloatingCTA'
import { ChatConcierge } from '@/components/floating/ChatConcierge'
import { WhatsAppButton } from '@/components/floating/WhatsAppButton'
import { ThemeToggle } from '@/components/floating/ThemeToggle'
import { ThemeScript } from '@/components/providers/ThemeScript'
import { site } from '@/lib/data/site'

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const accent = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${accent.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg-primary text-bone font-body antialiased">
        <ThemeScript />
        <Providers>
          <CustomCursor />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
          <MobileDock />
          <FloatingCTA />
          <ChatConcierge />
          <WhatsAppButton />
          <ThemeToggle />
        </Providers>
      </body>
    </html>
  )
}
