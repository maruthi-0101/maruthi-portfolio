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
      <style>{`
        @keyframes heroFadeLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroFadeRight {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .hero-left  { animation: heroFadeLeft  0.7s ease both; }
        .hero-right { animation: heroFadeRight 0.7s ease 0.12s both; }

        .role-line {
          display: block;
          font-size: clamp(2.4rem, 5.2vw, 5rem);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1.0;
          text-transform: uppercase;
          transition: opacity 0.42s ease, transform 0.42s ease;
          will-change: opacity, transform;
        }
        .role-line.in  { opacity: 1; transform: translateY(0); }
        .role-line.out { opacity: 0; transform: translateY(-18px); }

        .role-line:nth-child(2) {
          transition-delay: 0.06s;
        }
      `}</style>

      {/* LEFT: Name */}
      <div style={{
        position: 'fixed',
        left: '5vw',
        top: 0, bottom: 0,
        zIndex: 5,
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
        zIndex: 5,
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
