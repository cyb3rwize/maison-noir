'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'view' | 'drag' | 'text'

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>('default')
  const [label, setLabel] = useState('')
  const [hidden, setHidden] = useState(false)
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 25, stiffness: 400, mass: 0.5 })
  const springY = useSpring(y, { damping: 25, stiffness: 400, mass: 0.5 })

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFine) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)

      const target = e.target as HTMLElement
      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null

      if (cursorEl) {
        const type = (cursorEl.dataset.cursor || 'hover') as CursorState
        setState(type)
        setLabel(cursorEl.dataset.cursorLabel || '')
      } else {
        const isLink = target.closest('a, button, [role="button"]')
        setState(isLink ? 'hover' : 'default')
        setLabel('')
      }
    }

    const leave = () => setHidden(true)
    const enter = () => setHidden(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  const size = state === 'default' ? 8 : state === 'hover' ? 44 : 72
  const showLabel = state === 'view' || state === 'drag'
  const mixBlend = state === 'default' ? 'difference' : 'normal'

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-gold/60"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: mixBlend as React.CSSProperties['mixBlendMode'],
        }}
        animate={{
          width: size,
          height: size,
          opacity: hidden ? 0 : 1,
          backgroundColor:
            state === 'hover' ? 'rgba(201,169,97,0.15)' : 'rgba(201,169,97,0)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-widest text-bone"
          >
            {label || state}
          </motion.span>
        )}
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: hidden || showLabel ? 0 : 1,
          scale: state === 'hover' ? 0 : 1,
        }}
      />
    </>
  )
}
