import Link from 'next/link'
import { Mail, Phone, MapPin, Navigation } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/Reveal'
import { MapSVG } from '@/components/contact/MapSVG'
import { GoogleMap } from '@/components/contact/GoogleMap'
import { ContactForm } from '@/components/contact/ContactForm'
import { contactInfo } from '@/lib/data/contact'
import { site } from '@/lib/data/site'

export const metadata = {
  title: 'Contact',
  description: 'Reach the Maison Noir team.',
}

export default function ContactPage() {
  const fullAddress = `${contactInfo.address.street}, ${contactInfo.address.city}, ${contactInfo.address.state} ${contactInfo.address.zip}`
  const mapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`

  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <Reveal>
            <SectionLabel className="justify-center mb-8">Contact</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-display-lg text-bone leading-tight mb-6">
              Let&apos;s talk
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-muted font-accent italic">
              Questions, collaborations, press — we read every message.
            </p>
          </Reveal>
        </div>

        {/* Info strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { Icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
            { Icon: Phone, label: 'Phone', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
            { Icon: MapPin, label: 'Visit', value: contactInfo.address.street + ', ' + contactInfo.address.city, href: mapsDirectionsHref },
          ].map(({ Icon, label, value, href }, i) => (
            <Reveal key={label} delay={0.1 * i}>
              <div className="glass rounded-lg p-6 text-center">
                <div className="mx-auto h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4">
                  <Icon size={18} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-bone hover:text-gold transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-bone">{value}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: form */}
          <div className="lg:col-span-3">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          {/* Right: info cards */}
          <div className="lg:col-span-2 space-y-8">
            <Reveal delay={0.15}>
              <div className="glass rounded-lg p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-4">
                  Hours
                </p>
                <ul className="space-y-2">
                  {site.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted">{h.day}</span>
                      <span className="text-bone">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="glass rounded-lg p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-4">
                  Getting Here
                </p>
                <ul className="space-y-4">
                  {contactInfo.transit.map((t) => (
                    <li key={t.label}>
                      <p className="text-xs text-gold mb-1">{t.label}</p>
                      <p className="text-xs text-bone/80 leading-relaxed">
                        {t.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <a
                href={mapsDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-lg p-6 flex items-center gap-4 hover:border-gold/40 transition-colors group"
              >
                <div className="h-12 w-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Navigation size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1">
                    Get Directions
                  </p>
                  <p className="text-sm text-bone group-hover:text-gold transition-colors">
                    Open in Google Maps
                  </p>
                </div>
              </a>
            </Reveal>
          </div>
        </div>

        {/* Full-width Google Map */}
        <Reveal delay={0.3}>
          <div className="mt-20">
            <SectionLabel className="mb-6">Find Us</SectionLabel>
            <GoogleMap address={fullAddress} heightClass="h-[420px]" />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
