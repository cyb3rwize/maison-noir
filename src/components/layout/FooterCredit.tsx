import { studio } from '@/lib/data/studio'

interface FooterCreditProps {
  className?: string
}

/**
 * "Built by CyberForge" attribution line.
 * Placed in footer next to copyright.
 */
export function FooterCredit({ className }: FooterCreditProps) {
  return (
    <p className={className}>
      <span className="text-muted">Crafted by </span>
      <a
        href={studio.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold hover:text-gold-light transition-colors duration-300 font-medium inline-flex items-center gap-1 group"
      >
        <span>{studio.name}</span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          aria-hidden="true"
        >
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    </p>
  )
}
