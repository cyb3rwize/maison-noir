'use client'

import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Logo } from './Logo'
import { site } from '@/lib/data/site'
import { navLinks } from '@/lib/data/nav'
import { Newsletter } from './Newsletter'
import { FooterCredit } from './FooterCredit'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border bg-bg-secondary/40">
      <Container size="xl" className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Logo className="text-2xl" />
            <p className="mt-6 text-sm text-muted leading-relaxed">
              {site.description}
            </p>

            <div className="mt-8 flex items-center gap-3">
              {[
                { Icon: Instagram, href: site.socials.instagram, label: 'Instagram' },
                { Icon: Facebook, href: site.socials.facebook, label: 'Facebook' },
                { Icon: Twitter, href: site.socials.twitter, label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-bone hover:text-gold hover:border-gold/40 transition-colors duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-6">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bone hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reservations"
                  className="text-sm text-bone hover:text-gold transition-colors duration-300"
                >
                  Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-6">
              Visit
            </h4>
            <address className="not-italic text-sm text-bone leading-relaxed">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </address>
            <p className="mt-4 text-sm text-bone">
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="hover:text-gold transition-colors duration-300"
              >
                {site.phone}
              </a>
            </p>
            <p className="mt-2 text-sm text-bone">
              <a
                href={`mailto:${site.email}`}
                className="hover:text-gold transition-colors duration-300"
              >
                {site.email}
              </a>
            </p>

            <div className="mt-6 flex flex-col gap-1.5">
              {site.hours.map((h) => (
                <div
                  key={h.day}
                  className="flex items-center justify-between text-xs text-muted"
                >
                  <span>{h.day}</span>
                  <span className="text-bone">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-10 border-t border-border">
          <Newsletter />
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="text-xs text-muted">
              © {year} {site.name}. All rights reserved.
            </p>
            <span className="hidden sm:block h-3 w-px bg-border" />
            <FooterCredit className="text-xs" />
          </div>
          <div className="flex items-center gap-6 text-xs text-muted">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
