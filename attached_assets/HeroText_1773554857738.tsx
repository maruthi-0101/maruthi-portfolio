import { useEffect, useState } from 'react'

const WORDS = ['SOFTWARE', 'ENGINEER']

export default function HeroText() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out → swap word → fade in
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % WORDS.length)
        setVisible(true)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

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

        .flip-word {
          display: block;
          font-size: clamp(2.2rem, 5vw, 4.8rem);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
          transition: opacity 0.35s ease, transform 0.35s ease, color 0.35s ease;
        }
        .flip-word.in  { opacity: 1; transform: translateY(0);    color: #ffffff; }
        .flip-word.out { opacity: 0; transform: translateY(-20px); color: #5eead4; }
      `}</style>

      {/* ── LEFT: Name ────────────────────────────────────────── */}
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

      {/* ── RIGHT: Flip text ──────────────────────────────────── */}
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
            marginBottom: '10px',
            letterSpacing: '0.5px',
          }}>
            A Software
          </p>
          <span className={`flip-word ${visible ? 'in' : 'out'}`}>
            {WORDS[index]}
          </span>
        </div>
      </div>
    </>
  )
}
