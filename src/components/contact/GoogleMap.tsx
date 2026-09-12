'use client'

interface GoogleMapProps {
  /** Full street address */
  address: string
  /** Optional height class, e.g. "h-[500px]" */
  heightClass?: string
}

export function GoogleMap({
  address,
  heightClass = 'h-[500px]',
}: GoogleMapProps) {
  // Google Maps embed via search query — no API key required
  const query = encodeURIComponent(address)
  const src = `https://www.google.com/maps?q=${query}&output=embed`

  return (
    <div
      className={
        'relative w-full rounded-lg overflow-hidden border border-border ' +
        heightClass
      }
    >
      <iframe
        title="Restaurant location"
        src={src}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full grayscale-[0.6] contrast-[1.1] opacity-90"
        style={{ border: 0 }}
      />
      {/* Dark overlay for aesthetic */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-bg-primary/20 to-transparent"
      />
    </div>
  )
}
