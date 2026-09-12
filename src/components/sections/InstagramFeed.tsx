'use client'

import Image from 'next/image'
import { Instagram, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/Reveal'
import { EASE_OUT } from '@/lib/utils/motion'
import {
  instagramPosts,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from '@/lib/data/instagram'

export function InstagramFeed() {
  return (
    <section className="relative section-py overflow-hidden">
      <Container size="xl" className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <Reveal>
            <SectionLabel className="mb-4">Follow Along</SectionLabel>
            <h2 className="font-display text-display-md text-bone leading-tight">
              {INSTAGRAM_HANDLE}
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors duration-300"
            >
              <Instagram size={16} />
              Follow on Instagram
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05}>
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="block relative aspect-square rounded-md overflow-hidden group cursor-pointer bg-bg-tertiary"
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover"
                  quality={80}
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                  <Heart size={16} className="text-gold mb-2" />
                  <p className="text-xs font-medium text-white leading-tight line-clamp-2">
                    {post.caption}
                  </p>
                  <p className="text-xs font-semibold text-gold mt-1.5">
                    {post.likes.toLocaleString()} likes
                  </p>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
