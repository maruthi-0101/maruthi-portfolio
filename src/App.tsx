import Navbar from './components/Navbar'
import HeroText from './components/HeroText'
import Scene from './components/Character/Scene'
import SocialIcons from './components/SocialIcons'
import Cursor from './components/Cursor'
import About from './components/About'
import Work from './components/Work'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Cursor />
      <div className="bg-blobs">
        <div className="blob blob-top" />
        <div className="blob blob-bottom" />
      </div>
      <Navbar />
      <SocialIcons />

      <section className="hero" id="home">
        <HeroText />
        <Scene />
        <a href="#" className="resume-btn">RESUME ⊞</a>
      </section>

      <About />
      <Work />
      <Contact />
    </>
  )
}
