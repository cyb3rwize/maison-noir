'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react'

export type Theme = 'light' | 'dark' | 'auto' | 'system'
export type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}

const STORAGE_KEY = 'maison-noir-theme'

/** Auto-mode switch hours */
const DAY_START_HOUR = 6   // 6:00 AM → light
const NIGHT_START_HOUR = 17 // 5:00 PM → dark

/** Determine light vs dark from current hour */
function getTimeBasedTheme(): ResolvedTheme {
  const hour = new Date().getHours()
  if (hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR) return 'light'
  return 'dark'
}

/** Determine light vs dark from OS preference */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/** Apply the theme class to <html> */
function applyThemeToDOM(resolved: ResolvedTheme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(resolved)
  root.style.colorScheme = resolved
}

/** Resolve any theme to light/dark */
function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === 'light') return 'light'
  if (theme === 'dark') return 'dark'
  if (theme === 'auto') return getTimeBasedTheme()
  return getSystemTheme() // 'system'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('auto')
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark')
  const [mounted, setMounted] = useState(false)
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null)

  // ---- Initial mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const validThemes: Theme[] = ['light', 'dark', 'auto', 'system']
    const initial: Theme =
      stored && validThemes.includes(stored) ? stored : 'auto'

    setThemeState(initial)

    const resolved = resolveTheme(initial)
    setResolvedTheme(resolved)
    applyThemeToDOM(resolved)

    setMounted(true)
  }, [])

  // ---- React to theme changes
  useEffect(() => {
    if (!mounted) return

    const resolved = resolveTheme(theme)
    setResolvedTheme(resolved)
    applyThemeToDOM(resolved)

    // Cleanup any previous timer
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current)
      autoTimerRef.current = null
    }

    // If in auto mode, check time every minute
    if (theme === 'auto') {
      autoTimerRef.current = setInterval(() => {
        const next = getTimeBasedTheme()
        setResolvedTheme((current) => {
          if (current !== next) {
            applyThemeToDOM(next)
            return next
          }
          return current
        })
      }, 60_000) // every 60 seconds
    }

    // If in system mode, listen to OS preference changes
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const onChange = () => {
        const next = getSystemTheme()
        setResolvedTheme(next)
        applyThemeToDOM(next)
      }
      mq.addEventListener('change', onChange)
      return () => {
        mq.removeEventListener('change', onChange)
        if (autoTimerRef.current) clearInterval(autoTimerRef.current)
      }
    }

    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current)
    }
  }, [theme, mounted])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, t)
    }
  }, [])

  // Toggle cycles: auto → light → dark → auto
  const toggleTheme = useCallback(() => {
    const order: Theme[] = ['auto', 'light', 'dark']
    const idx = order.indexOf(theme)
    const next = order[(idx + 1) % order.length]
    setTheme(next)
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
