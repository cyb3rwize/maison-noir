'use client'

import { useEffect, useState } from 'react'

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      if (Math.abs(y - lastY) > threshold) {
        setDirection(y > lastY ? 'down' : 'up')
        lastY = y
      }
      setScrolled(y > 40)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { direction, scrolled }
}
