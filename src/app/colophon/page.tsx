import Image from 'next/image'
import { ExternalLink, Mail, Globe } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/animations/Reveal'
import { studio } from '@/lib/data/studio'

export const metadata = {
  title: 'Colophon',
  description: 'Credits and technology behind this website.',
}

export default function ColophonPage() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="md" className="relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <SectionLabel className="justify-center mb-8">Colophon</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-display-lg text-bone leading-tight mb-6">
              The people and tech behind this site
            </h1>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass rounded-lg p-8 md:p-12 text-center mb-12">
            <div className="mx-auto h-16 w-16 rounded-lg overflow-hidden bg-bg-primary flex items-center justify-center mb-6">
              <Image
                src="/cyberforge-logo.svg"
                alt={studio.name}
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3">
              Website built by
            </p>
            <h2 className="font-display text-4xl text-bone mb-4">
              {studio.name}
            </h2>
            <p className="text-muted font-accent italic mb-8">
              {studio.tagline}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href={studio.url} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md">
                  Visit Website <ExternalLink size={14} className="ml-1" />
                </Button>
              </a>
              <a href={"mailto:" + studio.email}>
                <Button variant="outline" size="md">
                  <Mail size={14} className="mr-1" /> Get in Touch
                </Button>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="glass rounded-lg p-8 mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-6">
              Technology Stack
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-bone font-semibold mb-3">Framework</p>
                <ul className="space-y-1.5 text-sm text-muted">
                  <li>Next.js 15 (App Router)</li>
                  <li>React 18</li>
                  <li>TypeScript 5</li>
                  <li>Tailwind CSS 3</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-bone font-semibold mb-3">Services</p>
                <ul className="space-y-1.5 text-sm text-muted">
                  <li>Supabase (Database)</li>
                  <li>Resend (Email)</li>
                  <li>Vercel (Hosting)</li>
                  <li>Stripe (Payments — ready)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-bone font-semibold mb-3">Design</p>
                <ul className="space-y-1.5 text-sm text-muted">
                  <li>Playfair Display</li>
                  <li>Inter</li>
                  <li>Cormorant Garamond</li>
                  <li>Custom gold/obsidian palette</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-bone font-semibold mb-3">Features</p>
                <ul className="space-y-1.5 text-sm text-muted">
                  <li>Custom cursor + Lenis scroll</li>
                  <li>Dark/Light theme toggle</li>
                  <li>Chat concierge</li>
                  <li>Reservation + waitlist system</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="text-center">
            <p className="text-sm text-muted mb-4">
              Want a website like this for your business?
            </p>
            <a href={studio.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <Globe size={16} className="mr-2" /> Work with {studio.name}
              </Button>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
