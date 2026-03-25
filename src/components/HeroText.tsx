import { useEffect, useState } from 'react'

const ROLES = [
  { line1: 'SOFTWARE', line2: 'ENGINEER' },
  { line1: 'AI', line2: 'ENGINEER' },
  { line1: 'FULL-STACK', line2: 'DEVELOPER' },
]

export default function HeroText() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'in' | 'out'>('in')

  useEffect(() => {
    const cycle = setInterval(() => {
      // fade out
      setPhase('out')
      setTimeout(() => {
        setIndex(i => (i + 1) % ROLES.length)
        setPhase('in')
      }, 480)
    }, 3000)
    return () => clearInterval(cycle)
  }, [])

  const role = ROLES[index]

  return (
    <>
      {/* ── Mobile only: stacked bottom panel (display:none on desktop) ── */}
      <div className="hero-mobile-panel">
        <p className="hero-mobile-greeting">Hello! I'm</p>
        <h1 className="hero-mobile-name">Maruthi<br />Sundar</h1>
        <p className="hero-mobile-iam">I am a</p>
        <span className={`role-line hero-mobile-role ${phase}`} style={{ color: '#ffffff' }}>
          {role.line1}
        </span>
        <span className={`role-line hero-mobile-role ${phase}`} style={{ color: '#5eead4' }}>
          {role.line2}
        </span>
      </div>

      {/* ── Desktop: LEFT panel — name (className replaces inline styles) ── */}
      <div className="hero-desktop-left">
        <div className="hero-left">
          <p style={{
            fontSize: '1.15rem',
            fontWeight: 400,
            color: '#5eead4',
            marginBottom: '10px',
            letterSpacing: '0.5px',
          }}>
            Hello! I'm
          </p>
          <h1 style={{
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            fontWeight: 800,
            letterSpacing: '-3px',
            lineHeight: 0.92,
            color: '#ffffff',
            textTransform: 'uppercase',
          }}>
            Maruthi<br />Sundar
          </h1>
        </div>
      </div>

      {/* ── Desktop: RIGHT panel — role (className replaces inline styles) ── */}
      <div className="hero-desktop-right">
        <div className="hero-right">
          <p style={{
            fontSize: '1.1rem',
            fontWeight: 400,
            color: '#8b9ab0',
            marginBottom: '8px',
            letterSpacing: '0.5px',
          }}>
            I am a
          </p>
          <span className={`role-line ${phase}`} style={{ color: '#ffffff' }}>
            {role.line1}
          </span>
          <span className={`role-line ${phase}`} style={{ color: '#5eead4' }}>
            {role.line2}
          </span>
        </div>
      </div>
    </>
  )
}
