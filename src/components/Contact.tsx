import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner contact-inner">
        <div className="contact-header">
          <p className="section-label">GET IN TOUCH</p>
          <h2 className="section-heading">LET'S <span className="teal">TALK</span></h2>
        </div>
        <div className="contact-body">
          {sent ? (
            <div className="contact-thanks">
              <span className="teal" style={{ fontSize: '3rem' }}>✓</span>
              <p>Thanks! I'll get back to you shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="contact-submit">SEND MESSAGE</button>
            </form>
          )}
          <div className="contact-social">
            <a href="https://github.com/maruthi-0101" target="_blank" rel="noopener noreferrer" className="contact-social-link">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/maruthi-sundar-22ab76109" target="_blank" rel="noopener noreferrer" className="contact-social-link">
              LinkedIn
            </a>
            <a href="https://x.com/maruthisundar1" target="_blank" rel="noopener noreferrer" className="contact-social-link">
              Twitter / X
            </a>
            <a href="https://www.instagram.com/maruthi_4/" target="_blank" rel="noopener noreferrer" className="contact-social-link">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <footer className="site-footer">
        <p>Made with <span className="teal">♥</span> by Maruthi Sundar &nbsp;·&nbsp; © 2026</p>
      </footer>
    </section>
  )
}
