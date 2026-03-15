const SKILLS = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Python', icon: '🐍' },
  { name: 'Git', icon: '🔀' },
]

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-inner about-inner">
        <div className="about-left">
          <p className="section-label">WHO I AM</p>
          <h2 className="section-heading">ABOUT <span className="teal">ME</span></h2>
          <p className="about-bio">
            I'm <strong>Maruthi Sundar</strong>, a software engineer passionate about crafting
            fast, beautiful web experiences. I thrive at the intersection of design and
            engineering — turning ideas into production-grade products.
          </p>
          <p className="about-bio" style={{ marginTop: '1rem' }}>
            With a focus on <span className="teal">React</span>, <span className="teal">Node.js</span>,
            and <span className="teal">TypeScript</span>, I build scalable full-stack apps that
            users love. I'm driven by clean code, thoughtful architecture, and continuous learning.
          </p>
        </div>
        <div className="about-right">
          <p className="section-label">WHAT I USE</p>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <div key={s.name} className="skill-card">
                <span className="skill-icon">{s.icon}</span>
                <span className="skill-name">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
