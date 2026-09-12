'use client'

import QueryProvider from './QueryProvider'
import SmoothScroll from './SmoothScroll'
import { ToastProvider } from '@/components/ui/Toast'
import { ThemeProvider } from './ThemeProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ToastProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ToastProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
