'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Scene = dynamic(() => import('./Scene').then((m) => m.Scene), {
  ssr: false,
  loading: () => null,
})

export function Hero3D() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const isMobile = window.matchMedia('(max-width: 640px)').matches
    if (isMobile) return

    const t = setTimeout(() => setEnabled(true), 300)
    return () => clearTimeout(t)
  }, [])

  if (!enabled) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[500px] h-[500px] rounded-full bg-gold/10 blur-[120px]" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
    >
      <Scene />
    </motion.div>
  )
}
