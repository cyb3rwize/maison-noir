import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Maison Noir — Modern fine dining'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #141414 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(201,169,97,0.3), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(232,93,47,0.25), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            color: '#C9A961',
            textTransform: 'uppercase',
            marginBottom: 40,
          }}
        >
          Est. 2024
        </div>

        <div
          style={{
            fontSize: 120,
            color: '#F5F0E8',
            lineHeight: 0.95,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          <span>Maison</span>
          <span style={{ fontStyle: 'italic', color: '#C9A961' }}>Noir</span>
        </div>

        <div
          style={{
            fontSize: 28,
            color: '#8A857C',
            fontStyle: 'italic',
            marginTop: 60,
            maxWidth: 700,
            textAlign: 'center',
          }}
        >
          An immersive dining experience where every dish tells a story
        </div>
      </div>
    ),
    { ...size }
  )
}
