const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const SKILL_SECTIONS = [
  {
    label: '💻 Programming Languages',
    icons: [
      { name: 'Python',      src: `${DEVICON}/python/python-original.svg` },
      { name: 'Java',        src: `${DEVICON}/java/java-original.svg` },
      { name: 'JavaScript',  src: `${DEVICON}/javascript/javascript-original.svg` },
    ],
    badges: [],
  },
  {
    label: '🌐 Full-Stack',
    icons: [
      { name: 'MongoDB',  src: `${DEVICON}/mongodb/mongodb-original.svg` },
      { name: 'Express',  src: `${DEVICON}/express/express-original.svg` },
      { name: 'React',    src: `${DEVICON}/react/react-original.svg` },
      { name: 'Node.js',  src: `${DEVICON}/nodejs/nodejs-original.svg` },
      { name: 'Django',   src: `${DEVICON}/django/django-plain.svg` },
    ],
    badges: [],
  },
  {
    label: '☁️ Cloud & DevTools',
    icons: [
      { name: 'AWS',    src: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
      { name: 'Git',    src: `${DEVICON}/git/git-original.svg` },
      { name: 'GitHub', src: `${DEVICON}/github/github-original.svg` },
      { name: 'Oracle', src: `${DEVICON}/oracle/oracle-original.svg` },
    ],
    badges: [],
  },
  {
    label: '🤖 AI / ML',
    icons: [
      { name: 'TensorFlow', src: `${DEVICON}/tensorflow/tensorflow-original.svg` },
      { name: 'Python (AI)', src: `${DEVICON}/python/python-original.svg` },
    ],
    badges: ['OpenAI / LLMs', 'FAISS', 'ChromaDB', 'RAG', 'Computer Vision', 'Prompt Engineering', 'AI Agents'],
  },
  {
    label: '⚙️ Other Tools',
    icons: [],
    badges: ['Salesforce', 'Automation Anywhere'],
  },
]

export default function About() {
  return (
    <section id="about" className="about-section">

      <div className="about-section-header">
        <p className="section-label">WHO I AM</p>
        <h2 className="section-heading">ABOUT <span className="teal">ME</span></h2>
      </div>

      <div className="about-grid">

        {/* ── Profile scanner ── */}
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

        {/* ── Bio ── */}
        <div className="about-card about-intro">
          <p className="about-label">ABOUT ME</p>
          <h3 className="about-name">Maruthi <span className="teal">Sundar</span></h3>
          <p className="about-desc">
            I'm Maruthi Sundar, a passionate <span className="teal">Full-Stack and AI Engineer</span>.
            I build scalable web apps and intelligent systems using modern tech.
            From MERN stack to LLMs and cloud platforms — I love turning complex ideas into real products.
          </p>
        </div>

        {/* ── Contact ── */}
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

        {/* ── Education ── */}
        <div className="about-card about-education">
          <p className="card-label">EDUCATION</p>
          <p className="edu-degree">B.Tech — Computer Science</p>
          <p className="edu-years">2022 – Present</p>
          <div className="edu-bar">
            <div className="edu-bar-fill" style={{ width: '80%' }} />
          </div>
          <p className="edu-progress teal">4th Year</p>
        </div>

        {/* ── Experience ── */}
        <div className="about-card about-experience">
          <p className="card-label">WORK EXPERIENCE</p>
          <ul className="exp-list">
            <li>
              <span className="exp-dot" />
              <div>
                <span className="exp-year">2023</span>
                <p className="exp-role">Software Engineering Intern</p>
              </div>
            </li>
            <li>
              <span className="exp-dot" />
              <div>
                <span className="exp-year">2024</span>
                <p className="exp-role">Freelance Full-Stack Developer</p>
              </div>
            </li>
            <li>
              <span className="exp-dot active" />
              <div>
                <span className="exp-year teal">2025 — Now</span>
                <p className="exp-role">AI / ML Project Developer</p>
              </div>
            </li>
          </ul>
        </div>

        {/* ── Languages ── */}
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

        {/* ── Skills — full width ── */}
        <div className="about-card about-skills-full">
          <p className="card-label">TECH SKILLS</p>
          <div className="skills-sections">
            {SKILL_SECTIONS.map((sec) => (
              <div key={sec.label} className="skills-category">
                <p className="skills-cat-label">{sec.label}</p>
                <div className="skills-row">
                  {sec.icons.map((icon) => (
                    <div key={icon.name} className="skill-icon-item">
                      <img
                        src={icon.src}
                        alt={icon.name}
                        width={40}
                        height={40}
                        style={{ filter: icon.name === 'Express' || icon.name === 'GitHub' ? 'invert(1)' : undefined }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                      <span className="skill-icon-label">{icon.name}</span>
                    </div>
                  ))}
                  {sec.badges.map((b) => (
                    <span key={b} className="skill-pill">{b}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
