import { useEffect, useRef, useState, Component, ReactNode } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { handleMouseMove, applyHeadTracking, MouseState } from './mouseUtils'

const CHARACTER_URL = '/models/character.glb'
const FALLBACK_URL  = '/RobotExpressive.glb'

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl')))
  } catch { return false }
}

function SceneInner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglOk(false)
      return
    }

    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch {
      setWebglOk(false)
      return
    }

    const W = window.innerWidth
    const H = window.innerHeight
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.setClearColor(0x000000, 0)

    const canvas = renderer.domElement
    canvas.style.width  = '100%'
    canvas.style.height = '100%'
    container.appendChild(canvas)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(28, W / H, 0.01, 1000)
    camera.position.set(0, 1.5, 5)
    camera.lookAt(0, 1, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 3.5))

    const key = new THREE.DirectionalLight(0xffffff, 4.0)
    key.position.set(-1, 3, 6)
    scene.add(key)

    const rim = new THREE.DirectionalLight(0x5eead4, 2.5)
    rim.position.set(4, 5, -2)
    scene.add(rim)

    const fill = new THREE.DirectionalLight(0xffeedd, 1.5)
    fill.position.set(3, -1, 4)
    scene.add(fill)

    const mouse: MouseState = { x: 0, y: 0 }
    const onMouse = (e: MouseEvent) => handleMouseMove(e, mouse)
    window.addEventListener('mousemove', onMouse)

    const clock = new THREE.Clock()
    let mixer: THREE.AnimationMixer | null = null
    let model: THREE.Object3D | null = null
    let alive = true

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)

    function loadModel(url: string) {
      loader.load(
        url,
        (gltf) => {
          if (!alive) return
          const root = gltf.scene
          scene.add(root)
          model = root

          root.updateMatrixWorld(true)
          const box    = new THREE.Box3().setFromObject(root)
          const size   = new THREE.Vector3()
          const center = new THREE.Vector3()
          box.getSize(size)
          box.getCenter(center)

          const fovRad  = (camera.fov * Math.PI) / 180
          const camDist = (size.y / 1.4) / Math.tan(fovRad / 2)
          const upperY  = box.max.y - size.y * 0.38

          camera.position.set(center.x, upperY, center.z + camDist)
          camera.lookAt(center.x, upperY, center.z)
          camera.aspect = W / H
          camera.updateProjectionMatrix()

          if (gltf.animations.length) {
            mixer = new THREE.AnimationMixer(root)
            const clip = gltf.animations.find(a => /idle/i.test(a.name)) ?? gltf.animations[0]
            mixer.clipAction(clip).play()
          }

          container.style.opacity = '1'
          console.log('[Scene] loaded:', url)
        },
        undefined,
        (err) => {
          console.warn('[Scene] failed:', url, String(err))
          if (url === CHARACTER_URL) loadModel(FALLBACK_URL)
        }
      )
    }

    loadModel(CHARACTER_URL)

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    let raf: number
    const tick = () => {
      if (!alive) return
      raf = requestAnimationFrame(tick)
      if (mixer) mixer.update(clock.getDelta())
      if (model) applyHeadTracking(model, mouse)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      dracoLoader.dispose()
      renderer.dispose()
      if (container.contains(canvas)) container.removeChild(canvas)
    }
  }, [])

  // WebGL not supported — show the teal glow orb as fallback
  if (!webglOk) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '420px',
          height: '580px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 40% 35%, rgba(94,234,212,0.22) 0%, rgba(34,211,238,0.08) 40%, transparent 70%)',
          filter: 'blur(32px)',
          animation: 'fadeIn 1.2s ease both',
        }} />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 1s ease',
      }}
    />
  )
}

export default function Scene() {
  return <SceneBoundary><SceneInner /></SceneBoundary>
}
