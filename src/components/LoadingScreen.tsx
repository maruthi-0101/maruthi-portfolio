import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [percent, setPercent]   = useState(0)
  const [visible, setVisible]   = useState(true)
  const [fading, setFading]     = useState(false)

  useEffect(() => {
    const onProgress = (e: Event) => {
      setPercent((e as CustomEvent<number>).detail)
    }

    const onComplete = () => {
      setPercent(100)
      setTimeout(() => {
        setFading(true)
        setTimeout(() => setVisible(false), 1500)
      }, 400)
    }

    window.addEventListener('scene:progress', onProgress)
    window.addEventListener('scene:complete', onComplete)
    return () => {
      window.removeEventListener('scene:progress', onProgress)
      window.removeEventListener('scene:complete', onComplete)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050a12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        opacity: fading ? 0 : 1,
        transition: 'opacity 1.5s ease-in-out',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Spinner ring */}
      <div style={{ position: 'relative', width: 72, height: 72 }}>
        <svg
          width="72" height="72"
          viewBox="0 0 72 72"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx="36" cy="36" r="30"
            fill="none"
            stroke="rgba(94,234,212,0.1)"
            strokeWidth="3"
          />
          <circle
            cx="36" cy="36" r="30"
            fill="none"
            stroke="#5eead4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 30}`}
            strokeDashoffset={`${2 * Math.PI * 30 * (1 - percent / 100)}`}
            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
          />
        </svg>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#5eead4',
            letterSpacing: '1px',
          }}
        >
          {percent}%
        </span>
      </div>

      {/* Label */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '4px',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        Loading Experience...
      </p>
    </div>
  )
}
