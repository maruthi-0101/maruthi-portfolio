const PROJECTS = [
  {
    title: 'Portfolio Website',
    description: 'A cinematic dark-theme developer portfolio with 3D character, mouse head-tracking, and animated transitions built with React + Three.js.',
    stack: ['React', 'Three.js', 'TypeScript', 'Vite'],
    github: '#',
    live: '#',
  },
  {
    title: 'E-Commerce App',
    description: 'Full-stack shopping platform with product catalog, cart management, Stripe payments, and an admin dashboard.',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    github: '#',
    live: '#',
  },
  {
    title: 'Chat Application',
    description: 'Real-time messaging app with WebSocket rooms, user authentication, typing indicators, and message history.',
    stack: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    github: '#',
    live: '#',
  },
]

export default function Work() {
  return (
    <section id="work" className="section work-section">
      <div className="section-inner work-inner">
        <div className="work-header">
          <p className="section-label">WHAT I'VE BUILT</p>
          <h2 className="section-heading">MY <span className="teal">WORK</span></h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div key={p.title} className="project-card">
              <div className="project-card-top">
                <span className="project-folder">⊞</span>
                <div className="project-links">
                  <a href={p.github} className="project-link" aria-label="GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 7.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </a>
                  <a href={p.live} className="project-link" aria-label="Live">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="project-stack">
                {p.stack.map((t) => <span key={t} className="stack-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
