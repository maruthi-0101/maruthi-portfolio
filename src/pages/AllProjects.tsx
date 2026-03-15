import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Cursor from '../components/Cursor'

const ALL_PROJECTS = [
  {
    emoji: '🚗',
    title: 'AI-Powered Car Part Recognition',
    description: 'AI-based computer vision system that detects car parts from images and provides smart suggestions related to the detected component.',
    features: ['Image recognition using deep learning', 'Automatic identification from uploads', 'Intelligent suggestions based on detection', 'Interactive web interface'],
    stack: ['Python', 'TensorFlow', 'CNN', 'Computer Vision', 'Flask', 'Streamlit'],
    github: 'https://github.com/maruthi-0101',
  },
  {
    emoji: '💬',
    title: 'Intelligent NLP Chatbot',
    description: 'Conversational AI chatbot capable of understanding user queries and generating meaningful responses using Natural Language Processing.',
    features: ['Text preprocessing — tokenization & stemming', 'Intent detection & response generation', 'Context-aware conversation flow', 'Web interface integration'],
    stack: ['Python', 'NLTK', 'SpaCy', 'Transformers', 'Flask'],
    github: 'https://github.com/maruthi-0101',
  },
  {
    emoji: '🌐',
    title: 'Project Collaboration System',
    description: 'Web-based platform that allows teams to manage projects, assign tasks, and track progress efficiently with a real-time monitoring dashboard.',
    features: ['Project & task management', 'Real-time progress tracking', 'User authentication & roles', 'Monitoring dashboard'],
    stack: ['MERN Stack', 'React', 'Node.js', 'MongoDB', 'JavaScript'],
    github: 'https://github.com/maruthi-0101',
  },
  {
    emoji: '🔎',
    title: 'Retrieval-Augmented Generation (RAG) System',
    description: 'AI system combining document retrieval with language models for highly accurate, knowledge-grounded answers.',
    features: ['Document ingestion & chunking', 'Vector similarity search', 'LLM-based answer generation', 'Knowledge-grounded responses'],
    stack: ['Python', 'FAISS', 'ChromaDB', 'RAG', 'LLMs'],
    github: 'https://github.com/maruthi-0101',
  },
  {
    emoji: '🎙️',
    title: 'NYRA AI Voice Agent',
    description: 'Voice-enabled AI agent that interacts with users through speech input and generates intelligent, real-time responses.',
    features: ['Real-time speech recognition', 'LLM-based response generation', 'Natural conversational flow', 'Voice output synthesis'],
    stack: ['Python', 'Speech Recognition', 'LLM APIs'],
    github: 'https://github.com/maruthi-0101',
  },
  {
    emoji: '📄',
    title: 'ATS Resume Analyzer',
    description: 'AI system that evaluates resumes against job descriptions to determine Applicant Tracking System compatibility.',
    features: ['Resume parsing & analysis', 'Job description matching', 'ATS score calculation', 'Improvement suggestions'],
    stack: ['Python', 'NLP', 'Machine Learning', 'Text Similarity'],
    github: 'https://github.com/maruthi-0101',
  },
  {
    emoji: '🛠️',
    title: 'AI Bug Fixer',
    description: 'Automated debugging assistant that analyzes code errors and suggests possible fixes using large language models.',
    features: ['Error detection & analysis', 'LLM-powered fix suggestions', 'Multi-language support', 'Explanation of root cause'],
    stack: ['Python', 'LLMs', 'Code Analysis'],
    github: 'https://github.com/maruthi-0101',
  },
  {
    emoji: '🧠',
    title: 'AI Feedback Agent',
    description: 'AI agent designed to analyze user input and generate context-aware structured feedback.',
    features: ['Context-aware analysis', 'Structured feedback generation', 'Agent-based architecture', 'Custom evaluation criteria'],
    stack: ['Python', 'LLM APIs', 'Agent Architecture'],
    github: 'https://github.com/maruthi-0101',
  },
  {
    emoji: '🏠',
    title: 'House Price Prediction Model',
    description: 'Machine learning regression model predicting house prices based on property attributes and location features.',
    features: ['Feature engineering & selection', 'Regression model training', 'Data preprocessing pipeline', 'Prediction with confidence intervals'],
    stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    github: 'https://github.com/maruthi-0101',
  },
]

export default function AllProjects() {
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add('card-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    cardsRef.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <div className="bg-blobs">
        <div className="blob blob-top" />
        <div className="blob blob-bottom" />
      </div>

      <div className="all-projects-page">
        <div className="all-projects-inner">

          <Link to="/" className="back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>

          <div className="all-projects-header">
            <p className="section-label">PORTFOLIO</p>
            <h1 className="section-heading">ALL <span className="teal">PROJECTS</span></h1>
            <p className="all-projects-subtitle">
              A complete collection of my work spanning AI, full-stack development, and machine learning.
            </p>
          </div>

          <div className="projects-grid">
            {ALL_PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className="project-card"
                ref={(el) => { if (el) cardsRef.current[i] = el }}
                style={{ animationDelay: `${(i % 3) * 0.1}s` }}
              >
                <div className="project-card-top">
                  <span className="project-emoji">{p.emoji}</span>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    GitHub
                  </a>
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

        </div>
      </div>
    </>
  )
}
