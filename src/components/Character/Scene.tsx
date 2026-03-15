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

interface SceneInnerProps {
  inline?: boolean
}

function SceneInner({ inline = false }: SceneInnerProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    if (!isWebGLAvailable()) { setWebglOk(false); return }

    const wrap = wrapRef.current
    if (!wrap) return

    // ── Renderer ─────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch { setWebglOk(false); return }

    const getW = () => inline ? wrap.clientWidth  : window.innerWidth
    const getH = () => inline ? wrap.clientHeight : window.innerHeight

    renderer.setSize(getW(), getH())
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.setClearColor(0x000000, 0)

    const canvas = renderer.domElement
    canvas.style.cssText = 'width:100%;height:100%;display:block'
    wrap.appendChild(canvas)

    // ── Scene / Camera ────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const fov    = inline ? 22 : 14.5
    const camera = new THREE.PerspectiveCamera(fov, getW() / getH(), 0.1, 1000)
    if (inline) {
      camera.position.set(0, 13.2, 22)
      camera.lookAt(0, 13.2, 0)
      camera.zoom = 1.3
    } else {
      camera.position.set(0, 13.8, 24.7)
      camera.lookAt(0, 13.8, 0)
      camera.zoom = 1.1
    }
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

          // Hide desk / monitor / keyboard / prop objects only
          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const n  = child.name
              const lc = n.toLowerCase()
              if (
                n === 'ground' ||
                n === 'screenlight' ||
                n.startsWith('KEYS') ||
                lc.includes('monitor') ||
                lc.includes('screen') ||
                lc.includes('desk') ||
                lc.includes('table') ||
                lc.includes('computer') ||
                lc.includes('keyboard')
              ) {
                child.visible = false
                console.log('[Scene] hidden:', n)
              }
            }
          })

          const box  = new THREE.Box3().setFromObject(root)
          const size = new THREE.Vector3()
          box.getSize(size)
          root.scale.setScalar(1.6 / size.y)
          root.position.set(0, 3.5, 0)

          scene.add(root)
          model = root

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
      const w = getW(), h = getH()
      camera.aspect = w / h
      camera.zoom = inline ? 1.3 : 1.1
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    let ro: ResizeObserver | null = null
    if (inline) {
      ro = new ResizeObserver(onResize)
      ro.observe(wrap)
    } else {
      window.addEventListener('resize', onResize)
    }

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
      if (ro) ro.disconnect()
      else window.removeEventListener('resize', onResize)
      dracoLoader.dispose()
      renderer.dispose()
      if (wrap.contains(canvas)) wrap.removeChild(canvas)
    }
  }, [inline])

  if (!webglOk) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at 40% 35%, rgba(94,234,212,0.18) 0%, transparent 70%)',
        borderRadius: 'inherit',
      }} />
    )
  }

  const containerStyle: React.CSSProperties = inline
    ? {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 'inherit',
        opacity: 0,
        transition: 'opacity 1s ease',
      }
    : {
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 1s ease',
      }

  return <div ref={wrapRef} style={containerStyle} />
}

interface SceneProps {
  inline?: boolean
}

export default function Scene({ inline = false }: SceneProps) {
  return <SceneBoundary><SceneInner inline={inline} /></SceneBoundary>
}
