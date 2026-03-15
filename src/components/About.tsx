const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const SKILL_SECTIONS = [
  {
    label: '💻 Languages',
    icons: [
      { name: 'Python',     src: `${DEVICON}/python/python-original.svg`,     invert: false },
      { name: 'Java',       src: `${DEVICON}/java/java-original.svg`,          invert: false },
      { name: 'JavaScript', src: `${DEVICON}/javascript/javascript-original.svg`, invert: false },
    ],
    badges: [],
  },
  {
    label: '🌐 Full-Stack',
    icons: [
      { name: 'MongoDB',        src: `${DEVICON}/mongodb/mongodb-original.svg`,    invert: false },
      { name: 'Express',        src: `${DEVICON}/express/express-original.svg`,    invert: true  },
      { name: 'React',          src: `${DEVICON}/react/react-original.svg`,        invert: false },
      { name: 'Node.js',        src: `${DEVICON}/nodejs/nodejs-original.svg`,      invert: false },
      { name: 'Django',         src: `${DEVICON}/django/django-plain.svg`,         invert: true  },
      { name: 'Java Full Stack',src: `${DEVICON}/java/java-original.svg`,          invert: false },
    ],
    badges: [],
  },
  {
    label: '☁️ Cloud & Dev',
    icons: [
      { name: 'AWS',    src: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, invert: true  },
      { name: 'Oracle', src: `${DEVICON}/oracle/oracle-original.svg`,   invert: false },
      { name: 'Git',    src: `${DEVICON}/git/git-original.svg`,         invert: false },
      { name: 'GitHub', src: `${DEVICON}/github/github-original.svg`,   invert: true  },
    ],
    badges: [],
  },
  {
    label: '🤖 AI & ML',
    icons: [
      { name: 'TensorFlow', src: `${DEVICON}/tensorflow/tensorflow-original.svg`, invert: false },
      { name: 'Python',     src: `${DEVICON}/python/python-original.svg`,         invert: false },
      { name: 'OpenCV',     src: `${DEVICON}/opencv/opencv-original.svg`,         invert: false },
    ],
    badges: ['Prompt Engineering', 'RAG', 'FAISS', 'ChromaDB', 'AI Agents'],
  },
  {
    label: '⚙️ Other',
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
          <div className="about-bio">
            <p>
              I am <strong>Maruthi Sundar</strong>, a Computer Science Engineering student at{' '}
              <span className="teal">KL University</span> with a CGPA of{' '}
              <span className="teal">8.0</span>, passionate about building intelligent software
              systems and scalable web applications.
            </p>
            <p>
              I have hands-on experience in{' '}
              <span className="teal">full-stack development</span>,{' '}
              <span className="teal">artificial intelligence</span>, and cloud technologies. My
              technical work includes developing web applications using Java, Python, JavaScript,{' '}
              <span className="teal">MERN stack</span>, and{' '}
              <span className="teal">Django</span>, as well as building AI models using{' '}
              <span className="teal">TensorFlow</span>, machine learning algorithms, and natural
              language processing techniques.
            </p>
            <p>
              I completed a self-driven 2-month Artificial Intelligence learning program where I
              worked on machine learning, deep learning, NLP, reinforcement learning, and model
              deployment using modern tools such as NumPy, Pandas, TensorFlow, NLTK, SpaCy,
              Flask, and FastAPI.
            </p>
            <p>
              I enjoy solving real-world problems through technology and continuously improve my
              skills by building projects, exploring AI systems like{' '}
              <span className="teal">vector databases</span>,{' '}
              <span className="teal">RAG</span>, and{' '}
              <span className="teal">AI agents</span>, and staying updated with modern software
              development practices.
            </p>
            <p>
              My goal is to become a software engineer specializing in AI-powered applications
              and scalable cloud systems.
            </p>
          </div>
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
              <a href="https://github.com/maruthi-0101" target="_blank" rel="noopener noreferrer">github.com/maruthi-0101</a>
            </li>
            <li>
              <span className="contact-icon">◈</span>
              <a href="https://www.linkedin.com/in/maruthi-sundar-22ab76109" target="_blank" rel="noopener noreferrer">linkedin.com/in/maruthi-sundar</a>
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
        <div className="about-card about-experience exp-bento">
          <p className="card-label">WORK EXPERIENCE</p>

          <div className="exp-header">
            <div>
              <p className="exp-role-title">Software Development Intern</p>
              <p className="exp-company">ZettaByte Plus</p>
            </div>
            <span className="exp-badge">Internship</span>
          </div>

          <ul className="exp-bullets">
            {[
              'Worked on software development tasks and application features as part of the engineering team.',
              'Assisted in building and improving backend and frontend components of web applications.',
              'Collaborated with team members to develop scalable solutions and improve application performance.',
              'Participated in debugging, testing, and optimizing code to ensure reliable functionality.',
              'Gained practical experience with modern development tools, databases, and version control systems.',
            ].map((point, i) => (
              <li key={i}>
                <span className="exp-chevron">›</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="exp-tech-tags">
            {['Java', 'Python', 'JavaScript', 'Web Dev Tools', 'Git'].map((t) => (
              <span key={t} className="skill-pill">{t}</span>
            ))}
          </div>
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

        {/* ── Skills — full width bento cubes ── */}
        <div className="about-card about-skills-full">
          <p className="card-label">TECH SKILLS</p>
          <div className="bento-skills">
            {SKILL_SECTIONS.map((sec) => (
              <div key={sec.label} className="bento-group">
                <p className="bento-group-label">{sec.label}</p>
                <div className="bento-cubes">
                  {sec.icons.map((icon) => (
                    <div key={icon.name} className="bento-cube">
                      <img
                        src={icon.src}
                        alt={icon.name}
                        width={28}
                        height={28}
                        style={{ filter: icon.invert ? 'invert(1) brightness(0.85)' : undefined }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                      <span className="bento-cube-label">{icon.name}</span>
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
