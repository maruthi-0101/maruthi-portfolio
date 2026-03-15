const SKILLS = [
  { name: 'React', color: '#61dafb' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'MongoDB', color: '#4db33d' },
  { name: 'Python', color: '#f7c948' },
  { name: 'Git', color: '#f1502f' },
  { name: 'Docker', color: '#2496ed' },
]

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-grid">

        {/* ── TOP ROW ─────────────────────────── */}
        <div className="about-card about-profile">
          <div className="scanner-frame">
            <span className="bracket tl" />
            <span className="bracket tr" />
            <span className="bracket bl" />
            <span className="bracket br" />
            <svg viewBox="0 0 80 80" fill="none" className="profile-silhouette">
              <circle cx="40" cy="28" r="16" fill="rgba(94,234,212,0.15)" stroke="#5eead4" strokeWidth="1.5"/>
              <path d="M10 72c0-16.6 13.4-30 30-30s30 13.4 30 30" fill="rgba(94,234,212,0.1)" stroke="#5eead4" strokeWidth="1.5"/>
            </svg>
            <div className="scanner-line" />
          </div>
        </div>

        <div className="about-card about-intro">
          <p className="about-label">ABOUT ME</p>
          <h2 className="about-name">Maruthi <span className="teal">Sundar</span></h2>
          <p className="about-desc">
            I'm a passionate software engineer who loves building fast, scalable, and
            beautiful web applications. I enjoy solving complex problems through clean
            code and modern architecture. Always learning, always building.
          </p>
        </div>

        <div className="about-card about-contact">
          <p className="card-label">CONTACT</p>
          <ul className="contact-list">
            <li>
              <span className="contact-icon">✉</span>
              <a href="mailto:maruthisundar@gmail.com">maruthisundar@gmail.com</a>
            </li>
            <li>
              <span className="contact-icon">⌥</span>
              <a href="https://github.com/maruthisundar" target="_blank" rel="noopener noreferrer">github.com/maruthisundar</a>
            </li>
            <li>
              <span className="contact-icon">◈</span>
              <a href="https://linkedin.com/in/maruthisundar" target="_blank" rel="noopener noreferrer">linkedin.com/in/maruthisundar</a>
            </li>
          </ul>
        </div>

        {/* ── BOTTOM ROW ──────────────────────── */}
        <div className="about-card about-education">
          <p className="card-label">EDUCATION</p>
          <p className="edu-degree">B.Tech — Computer Science</p>
          <p className="edu-years">2022 – Present</p>
          <div className="edu-bar">
            <div className="edu-bar-fill" style={{ width: '60%' }} />
          </div>
          <p className="edu-progress teal">3rd Year</p>
        </div>

        <div className="about-card about-experience">
          <p className="card-label">WORK EXPERIENCE</p>
          <ul className="exp-list">
            <li>
              <span className="exp-dot" />
              <div>
                <span className="exp-year">2023</span>
                <p className="exp-role">Frontend Developer Intern</p>
              </div>
            </li>
            <li>
              <span className="exp-dot" />
              <div>
                <span className="exp-year">2024</span>
                <p className="exp-role">Freelance Web Developer</p>
              </div>
            </li>
            <li>
              <span className="exp-dot active" />
              <div>
                <span className="exp-year teal">2025 — Now</span>
                <p className="exp-role">Open to Opportunities</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="about-card about-skills">
          <p className="card-label">TECH SKILLS</p>
          <div className="skill-pills">
            {SKILLS.map((s) => (
              <span key={s.name} className="skill-pill" style={{ '--pill-color': s.color } as React.CSSProperties}>
                {s.name}
              </span>
            ))}
          </div>
        </div>

        <div className="about-card about-languages">
          <p className="card-label">LANGUAGES</p>
          <ul className="lang-list">
            {['Telugu', 'English', 'Hindi'].map((l) => (
              <li key={l}>
                <span className="lang-dot teal-bg" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
