'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Clock, Monitor, Check } from 'lucide-react'
import { useTheme, type Theme } from '@/components/providers/ThemeProvider'
import { EASE_OUT } from '@/lib/utils/motion'
import { cn } from '@/lib/utils/cn'

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const options: { id: Theme; label: string; hint: string; Icon: typeof Sun }[] = [
    { id: 'auto', label: 'Auto', hint: 'Follows time of day', Icon: Clock },
    { id: 'light', label: 'Light', hint: 'Always light', Icon: Sun },
    { id: 'dark', label: 'Dark', hint: 'Always dark', Icon: Moon },
    { id: 'system', label: 'System', hint: 'Follows your device', Icon: Monitor },
  ]

  const CurrentIcon =
    theme === 'auto'
      ? Clock
      : theme === 'system'
        ? Monitor
        : resolvedTheme === 'dark'
          ? Moon
          : Sun

  return (
    <div
      className="fixed top-6 right-6 z-40 hidden md:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <motion.button
        type="button"
        aria-label="Toggle theme"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: EASE_OUT }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          // Quick toggle cycles only between light/dark for the icon click
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
        }}
        className="h-11 w-11 rounded-full glass flex items-center justify-center text-bone hover:text-gold transition-colors duration-300"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={CurrentIcon.name}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentIcon size={16} />
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="absolute top-full right-0 mt-2 glass-strong rounded-md p-1 flex flex-col min-w-[200px]"
          >
            {options.map(({ id, label, hint, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setTheme(id)
                  setOpen(false)
                }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors duration-200 text-left',
                  theme === id
                    ? 'text-gold bg-gold/10'
                    : 'text-bone/80 hover:text-bone hover:bg-white/5'
                )}
              >
                <Icon size={14} className="shrink-0" />
                <div className="flex-1">
                  <p className="text-sm">{label}</p>
                  <p className="text-[10px] text-muted">{hint}</p>
                </div>
                {theme === id && <Check size={12} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
