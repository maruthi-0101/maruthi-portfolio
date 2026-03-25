import { useEffect, useState } from 'react'

const ROLES = [
  { line1: 'SOFTWARE',   line2: 'ENGINEER'  },
  { line1: 'AI',         line2: 'ENGINEER'  },
  { line1: 'FULL-STACK', line2: 'DEVELOPER' },
]

export default function HeroText() {
  const [index, setIndex]     = useState(0)
  const [phase, setPhase]     = useState<'in' | 'out'>('in')

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

      {/* LEFT: Name */}
      <div style={{
        position: 'fixed',
        left: '5vw',
        top: 0, bottom: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
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

      {/* RIGHT: Cycling role */}
      <div style={{
        position: 'fixed',
        right: '5vw',
        top: 0, bottom: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        pointerEvents: 'none',
        textAlign: 'right',
      }}>
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
