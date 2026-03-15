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
  const wrapRef = useRef<HTMLDivElement>(null)
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    if (!isWebGLAvailable()) { setWebglOk(false); return }

    const wrap = wrapRef.current
    if (!wrap) return

    // ── Renderer ──────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch { setWebglOk(false); return }

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.setClearColor(0x000000, 0)

    const canvas = renderer.domElement
    canvas.style.cssText = 'width:100%;height:100%;display:block'
    wrap.appendChild(canvas)

    // ── Scene / Camera ────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(14.5, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 14.5, 24.7)
    camera.lookAt(0, 14.5, 0)
    camera.zoom = 1.1
    camera.updateProjectionMatrix()

    // ── Lights ────────────────────────────────────────────────────────
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

    // ── Mouse ─────────────────────────────────────────────────────────
    const mouse: MouseState = { x: 0, y: 0 }
    const onMouse = (e: MouseEvent) => handleMouseMove(e, mouse)
    window.addEventListener('mousemove', onMouse)

    const clock = new THREE.Clock()
    let mixer: THREE.AnimationMixer | null = null
    let model:  THREE.Object3D | null = null
    let alive = true

    // ── Load model ────────────────────────────────────────────────────
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

          // Move character UP so desk/furniture goes below camera view
          root.position.set(0, -8, 0)
          root.scale.set(1, 1, 1)

          // Hide desk, monitor, keyboard, chair and any flat plane objects
          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const name = child.name.toLowerCase()
              if (
                name.includes('desk') || name.includes('table') ||
                name.includes('monitor') || name.includes('screen') ||
                name.includes('computer') || name.includes('plane') ||
                name.includes('keyboard') || name.includes('chair') ||
                name.includes('floor') || name.includes('ground')
              ) {
                child.visible = false
                console.log('[Scene] hidden:', child.name)
              }
            }
          })

          if (gltf.animations.length) {
            mixer = new THREE.AnimationMixer(root)
            const clip = gltf.animations.find(a => /idle/i.test(a.name)) ?? gltf.animations[0]
            mixer.clipAction(clip).play()
          }

          wrapRef.current!.style.opacity = '1'
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

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight
      camera.aspect = w / h
      camera.zoom = 1.1
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Render loop ───────────────────────────────────────────────────
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
      if (wrap.contains(canvas)) wrap.removeChild(canvas)
    }
  }, [])

  if (!webglOk) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '420px', height: '580px', borderRadius: '50%',
          background: 'radial-gradient(ellipse at 40% 35%, rgba(94,234,212,0.22) 0%, rgba(34,211,238,0.08) 40%, transparent 70%)',
          filter: 'blur(32px)',
          animation: 'fadeIn 1.2s ease both',
        }} />
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 2,
        pointerEvents: 'none', opacity: 0,
        transition: 'opacity 1s ease',
      }}
    />
  )
}

export default function Scene() {
  return <SceneBoundary><SceneInner /></SceneBoundary>
}
