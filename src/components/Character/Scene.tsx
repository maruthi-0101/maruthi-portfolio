import { useEffect, useRef, useState, Component, ReactNode } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { handleMouseMove, applyHeadTracking, findHeadBone, filterOutBoneTracks, MouseState } from './mouseUtils'

const CHARACTER_URL = '/models/character.glb'
const FALLBACK_URL = '/RobotExpressive.glb'

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
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!isWebGLAvailable()) { setWebglOk(false); return }

    const wrap = wrapRef.current
    if (!wrap) return

    // ── Renderer ─────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch { setWebglOk(false); return }

    const getW = () => inline ? wrap.clientWidth : window.innerWidth
    const getH = () => inline ? wrap.clientHeight : window.innerHeight

    renderer.setSize(getW(), getH())
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.setClearColor(0x000000, 0)

    const canvas = renderer.domElement
    // Force own GPU compositing layer — prevents CSS repaints from other
    // elements (e.g. HeroText role cycling) from causing the canvas to blink
    canvas.style.cssText = 'width:100%;height:100%;display:block;will-change:transform;transform:translateZ(0)'
    wrap.appendChild(canvas)

    // ── Scene / Camera ────────────────────────────────────────────────
    const scene = new THREE.Scene()

    let w = getW(), h = getH()
    const aspect = w / h
    let camera: THREE.PerspectiveCamera

    if (inline) {
      camera = new THREE.PerspectiveCamera(22, aspect, 0.1, 1000)
      camera.position.set(0, 13.1, 12)
      camera.lookAt(0, 13.1, 0)
      camera.zoom = 2.0
    } else {
      // Matching exact Rajesh camera setup meant for the diorama
      camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000)
      camera.position.set(0, 13.1, 24.7)
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
    let model: THREE.Object3D | null = null
    let headBone: THREE.Object3D | null = null
    let alive = true

    // ── Load model ────────────────────────────────────────────────────
    const loader = new GLTFLoader()

    // Simulated progress ticker for when server omits Content-Length
    let simInterval: ReturnType<typeof setInterval> | null = null
    let simPercent = 0

    function dispatchProgress(p: number) {
      if (!inline) window.dispatchEvent(new CustomEvent('scene:progress', { detail: p }))
    }
    function dispatchComplete() {
      if (!inline) window.dispatchEvent(new CustomEvent('scene:complete'))
    }

    function startSimProgress() {
      simPercent = 0
      simInterval = setInterval(() => {
        simPercent = Math.min(simPercent + Math.random() * 4, 90)
        dispatchProgress(Math.round(simPercent))
        if (simPercent >= 90 && simInterval) { clearInterval(simInterval); simInterval = null }
      }, 80)
    }

    function loadModel(url: string) {
      startSimProgress()
      loader.load(
        url,
        (gltf) => {
          if (!alive) return
          if (simInterval) { clearInterval(simInterval); simInterval = null }

          const root = gltf.scene
          console.log('[Scene] new character gltf:', gltf, 'root:', root)

          // Hide massive monitor meshes that obstruct the default camera angle
          root.traverse((child: any) => {
            if (child.name === 'Plane004' || child.name === 'screenlight') {
              if (child.isMesh) child.visible = false
              if (child.children) {
                child.children.forEach((c: any) => c.visible = false)
              }
            }

            if (child.isMesh && child.material) {
              if (child.name === 'BODY.SHIRT') {
                const newMat = child.material.clone()
                newMat.color = new THREE.Color("#8B4513")
                child.material = newMat
              } else if (child.name === 'Pant') {
                const newMat = child.material.clone()
                newMat.color = new THREE.Color("#000000")
                child.material = newMat
              }
              child.castShadow = true
              child.receiveShadow = true
            }
          })

          const footR = root.getObjectByName('footR')
          if (footR) footR.position.y = 3.36
          const footL = root.getObjectByName('footL')
          if (footL) footL.position.y = 3.36

          // Center the diorama fully in the viewport
          root.position.set(0, 0, 0)

          scene.add(root)
          model = root

          // Cache head bone once — never traverse in the render loop
          headBone = findHeadBone(root)

          if (gltf.animations.length) {
            mixer = new THREE.AnimationMixer(root)
            const headlessBones = ['spine006', 'head', 'neck']

            // 1. Play the intro animation ONCE (clamp at end pose).
            //    Never loop it — looping causes a snap every ~3s that looks like a "refresh".
            const introClip = gltf.animations.find(a => /intro/i.test(a.name))
            if (introClip) {
              const filteredIntro = filterOutBoneTracks(introClip, headlessBones)
              const introAction = mixer.clipAction(filteredIntro)
              introAction.setLoop(THREE.LoopOnce, 1)
              introAction.clampWhenFinished = true
              introAction.play()
            }

            // 2. Loop the keyboard/typing animations (key1, key2, key5, key6).
            //    These loop seamlessly and animate only the hands/arms.
            const keyNames = ['key1', 'key2', 'key5', 'key6']
            keyNames.forEach(name => {
              const clip = gltf.animations.find(a => a.name === name)
              if (clip && mixer) {
                const filtered = filterOutBoneTracks(clip, headlessBones)
                const action = mixer.clipAction(filtered)
                action.timeScale = 1.2
                action.play()
              }
            })
          }

          setLoaded(true)
          if (wrapRef.current) wrapRef.current.style.opacity = '1'
          console.log('[Scene] loaded:', url)
          dispatchComplete()
        },
        (xhr) => {
          if (xhr.total && xhr.total > 0) {
            if (simInterval) { clearInterval(simInterval); simInterval = null }
            dispatchProgress(Math.min(Math.round((xhr.loaded / xhr.total) * 100), 99))
          }
        },
        (err) => {
          if (simInterval) { clearInterval(simInterval); simInterval = null }
          console.warn('[Scene] failed:', url, String(err))
          dispatchComplete()
          setLoaded(true)
          if (wrapRef.current) wrapRef.current.style.opacity = '1'
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
      if (headBone) applyHeadTracking(headBone, mouse)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      if (simInterval) clearInterval(simInterval)
      window.removeEventListener('mousemove', onMouse)
      if (ro) ro.disconnect()
      else window.removeEventListener('resize', onResize)
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
      opacity: loaded ? 1 : 0,
      transition: 'opacity 1s ease',
      zIndex: 10,
      willChange: 'transform',
      transform: 'translateZ(0)',
    }
    : {
      position: 'fixed',
      inset: 0,
      zIndex: 2,
      pointerEvents: 'none',
      opacity: loaded ? 1 : 0,
      transition: 'opacity 1s ease',
      willChange: 'transform',
      transform: 'translateZ(0)',
    }

  return <div ref={wrapRef} className="scene-container" style={containerStyle} />
}

interface SceneProps {
  inline?: boolean
}

export default function Scene({ inline = false }: SceneProps) {
  return <SceneBoundary><SceneInner inline={inline} /></SceneBoundary>
}
