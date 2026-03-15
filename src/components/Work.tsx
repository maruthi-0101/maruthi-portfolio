import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const PROJECTS = [
  {
    emoji: '🚗',
    title: 'AI-Powered Car Part Recognition',
    description:
      'An AI-based computer vision system that detects and identifies car parts from images and provides smart suggestions related to the detected component.',
    features: [
      'Image recognition using deep learning',
      'Automatic identification from uploads',
      'Intelligent suggestions based on detection',
      'Interactive web interface',
    ],
    stack: ['Python', 'TensorFlow', 'CNN', 'Computer Vision', 'Flask/FastAPI', 'Streamlit'],
    github: 'https://github.com/maruthi-0101',
    live: null,
  },
  {
    emoji: '💬',
    title: 'Intelligent NLP Chatbot',
    description:
      'A conversational AI chatbot capable of understanding user queries and generating meaningful responses using Natural Language Processing.',
    features: [
      'Text preprocessing — tokenization & stemming',
      'Intent detection & response generation',
      'Context-aware conversation flow',
      'Web interface integration',
    ],
    stack: ['Python', 'NLTK', 'SpaCy', 'Transformers', 'Flask/FastAPI'],
    github: 'https://github.com/maruthi-0101',
    live: null,
  },
  {
    emoji: '🌐',
    title: 'Project Collaboration System',
    description:
      'A web-based platform that allows teams to manage projects, assign tasks, and track progress efficiently with a real-time monitoring dashboard.',
    features: [
      'Project & task management',
      'Real-time progress tracking',
      'User authentication & roles',
      'Monitoring dashboard',
    ],
    stack: ['MERN Stack', 'React', 'Node.js', 'MongoDB', 'JavaScript'],
    github: 'https://github.com/maruthi-0101',
    live: null,
  },
]

export default function Work() {
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('card-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    cardsRef.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="work" className="section work-section">
      <div className="section-inner work-inner">

        <div className="work-header">
          <p className="section-label">WHAT I'VE BUILT</p>
          <h2 className="section-heading">FEATURED <span className="teal">PROJECTS</span></h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className="project-card"
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="project-card-top">
                <span className="project-emoji">{p.emoji}</span>
                <div className="project-links">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" aria-label="GitHub">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    GitHub
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link-btn live" aria-label="Live Demo">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>

              <ul className="project-features">
                {p.features.map((f) => (
                  <li key={f}>
                    <span className="feature-check">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="project-stack">
                {p.stack.map((t) => <span key={t} className="stack-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="work-more-wrap">
          <Link to="/projects" className="more-projects-btn">
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
