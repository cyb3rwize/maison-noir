/**
 * Inline script injected into <head> — sets the initial theme class
 * BEFORE React hydrates. Prevents flash of wrong theme (FOUC).
 *
 * Runs synchronously during HTML parse. No external dependency.
 */
export function ThemeScript() {
  const code = [
    "(function(){",
    "try{",
    "var DAY=6,NIGHT=17;",
    "var s=localStorage.getItem('maison-noir-theme');",
    "var v=['light','dark','auto','system'];",
    "var t=(s&&v.indexOf(s)!==-1)?s:'auto';",
    "var r;",
    "if(t==='light')r='light';",
    "else if(t==='dark')r='dark';",
    "else if(t==='system')r=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';",
    "else{var h=new Date().getHours();r=(h>=DAY&&h<NIGHT)?'light':'dark';}",
    "document.documentElement.classList.add(r);",
    "document.documentElement.style.colorScheme=r;",
    "}catch(e){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}",
    "})();",
  ].join('')

  return <script dangerouslySetInnerHTML={{ __html: code }} />
}
