'use client'

import Script from 'next/script'

/**
 * Runs BEFORE React hydrates — sets initial theme class on <html>.
 * Prevents flash of wrong theme (FOUC).
 *
 * Must match ThemeProvider logic:
 *   - auto mode: 6AM-5PM = light, 5PM-6AM = dark
 *   - system mode: OS preference
 *   - light/dark: user override
 */
export function ThemeScript() {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {`
        (function() {
          try {
            var DAY_START = 6;
            var NIGHT_START = 17;
            var stored = localStorage.getItem('maison-noir-theme');
            var valid = ['light','dark','auto','system'];
            var theme = (stored && valid.indexOf(stored) !== -1) ? stored : 'auto';

            var resolved;
            if (theme === 'light') resolved = 'light';
            else if (theme === 'dark') resolved = 'dark';
            else if (theme === 'system') {
              resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            } else {
              // auto
              var h = new Date().getHours();
              resolved = (h >= DAY_START && h < NIGHT_START) ? 'light' : 'dark';
            }

            document.documentElement.classList.add(resolved);
            document.documentElement.style.colorScheme = resolved;
          } catch (e) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
          }
        })();
      `}
    </Script>
  )
}
