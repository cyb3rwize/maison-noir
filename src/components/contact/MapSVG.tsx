'use client'

export function MapSVG({ className }: { className?: string }) {
  return (
    <div
      className={
        'relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-border bg-bg-secondary ' +
        (className || '')
      }
    >
      <svg
        viewBox="0 0 800 500"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Dark background */}
        <rect width="800" height="500" fill="#0F0F0F" />

        {/* River */}
        <path
          d="M0 380 Q 200 340 400 380 T 800 400 L 800 500 L 0 500 Z"
          fill="#1a1a24"
          opacity="0.6"
        />

        {/* Streets — grid */}
        {[80, 160, 240, 320, 400].map((y) => (
          <line
            key={'h' + y}
            x1="0"
            y1={y}
            x2="800"
            y2={y}
            stroke="#2a2a2a"
            strokeWidth="1"
          />
        ))}
        {[120, 240, 360, 480, 600, 720].map((x) => (
          <line
            key={'v' + x}
            x1={x}
            y1="0"
            x2={x}
            y2="500"
            stroke="#2a2a2a"
            strokeWidth="1"
          />
        ))}

        {/* Major avenue — wider */}
        <line x1="360" y1="0" x2="360" y2="500" stroke="#3a3a3a" strokeWidth="3" />
        <line x1="0" y1="240" x2="800" y2="240" stroke="#3a3a3a" strokeWidth="3" />

        {/* Street labels */}
        <text
          x="380"
          y="250"
          fill="#4a4a4a"
          fontSize="10"
          fontFamily="Georgia, serif"
          transform="rotate(90, 380, 250)"
        >
          BROADWAY
        </text>
        <text
          x="20"
          y="232"
          fill="#4a4a4a"
          fontSize="10"
          fontFamily="Georgia, serif"
        >
          CANAL ST
        </text>

        {/* Park block */}
        <rect
          x="500"
          y="290"
          width="120"
          height="80"
          fill="#1a2a1a"
          opacity="0.5"
          rx="4"
        />

        {/* Restaurant marker — gold dot with pulse */}
        <circle cx="400" cy="250" r="28" fill="#C9A961" opacity="0.1">
          <animate
            attributeName="r"
            values="28;38;28"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.15;0.05;0.15"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="400" cy="250" r="8" fill="#C9A961" />
        <circle cx="400" cy="250" r="3" fill="#0A0A0A" />

        {/* Marker label */}
        <text
          x="400"
          y="220"
          fill="#C9A961"
          fontSize="11"
          fontFamily="Georgia, serif"
          textAnchor="middle"
          letterSpacing="2"
        >
          MAISON NOIR
        </text>
      </svg>

      {/* Bottom-right legend */}
      <div className="absolute bottom-4 right-4 text-xs uppercase tracking-[0.25em] text-muted">
        42 Obsidian Ln
      </div>
    </div>
  )
}
