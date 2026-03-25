import { useEffect, useRef, useState } from 'react'

const links = ['ABOUT', 'WORK', 'CONTACT']

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '28px 40px',
        animation: 'fadeInDown 0.5s ease 0s both',
      }}>
        <a href="#" style={{
          fontSize: '22px',
          fontWeight: 800,
          letterSpacing: '1px',
          color: '#fff',
          textDecoration: 'none',
        }}>
          MS
        </a>

        {/* Center email — hidden on mobile via CSS */}
        <span className="nav-center-email" style={{
          fontSize: '13px',
          color: '#8b9ab0',
          letterSpacing: '0.5px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          maruthisundar@gmail.com
        </span>

        {/* Desktop links — hidden on mobile via CSS */}
        <ul className="nav-links-desktop" style={{ display: 'flex', gap: '36px', listStyle: 'none' }}>
          {links.map(link => (
            <li key={link} style={{ overflow: 'hidden', lineHeight: 1 }}>
              <MarqueeLink label={link} />
            </li>
          ))}
        </ul>

        {/* Hamburger — shown on mobile via CSS */}
        <button
          className={`nav-hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile slide-in menu */}
      <div className={`mobile-nav-menu ${menuOpen ? 'is-open' : ''}`}>
        <ul>
          {links.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function MarqueeLink({ label }: { label: string }) {
  return (
    <a
      href={`#${label.toLowerCase()}`}
      className="marquee-link"
      style={{
        display: 'block',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '2px',
        color: '#ffffff',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        height: '16px',
      }}
    >
      <style>{`
        .marquee-link .top,
        .marquee-link .bottom {
          display: block;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .marquee-link .bottom {
          position: absolute;
          top: 100%;
          left: 0;
        }
        .marquee-link:hover .top    { transform: translateY(-100%); }
        .marquee-link:hover .bottom { transform: translateY(-100%); }
      `}</style>
      <span className="top">{label}</span>
      <span className="bottom">{label}</span>
    </a>
  )
}
