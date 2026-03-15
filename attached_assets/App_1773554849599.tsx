import Navbar from './components/Navbar'
import HeroText from './components/HeroText'
import Scene from './components/Character/Scene'
import SocialIcons from './components/SocialIcons'
import Cursor from './components/Cursor'

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
      <main className="hero">
        <HeroText />
        <Scene />
      </main>
      <a href="#" className="resume-btn" style={{ animation: 'fadeInUp 0.5s ease 0.2s both' }}>RESUME ⊞</a>
    </>
  )
}
