import { useEffect, Component, ReactNode } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { handleMouseMove, applyHeadTracking, MouseState } from './mouseUtils'

const MODEL_URL = '/RobotExpressive.glb'

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
  useEffect(() => {
    if (!isWebGLAvailable()) return

    // ── Renderer — appended directly to body, guaranteed full-screen ──
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch { return }

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.NoToneMapping
    renderer.setClearColor(0x000000, 0)

    const el = renderer.domElement
    el.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:2;pointer-events:none;opacity:0'
    document.body.appendChild(el)

    // ── Scene / Camera ────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.01, 1000
    )

    // ── Lights ───────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 2.5))

    const key = new THREE.DirectionalLight(0xffffff, 3.0)
    key.position.set(-1, 2, 5)
    scene.add(key)

    const rim = new THREE.DirectionalLight(0x5eead4, 2.0)
    rim.position.set(3, 4, -2)
    scene.add(rim)

    const fill = new THREE.DirectionalLight(0xffeedd, 1.5)
    fill.position.set(3, -1, 4)
    scene.add(fill)

    // ── Debug marker — confirms camera/renderer is working ────────
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    )
    marker.position.set(0, 0, 0)
    scene.add(marker)

    // ── Mouse ─────────────────────────────────────────────────────
    const mouse: MouseState = { x: 0, y: 0 }
    const onMouse = (e: MouseEvent) => handleMouseMove(e, mouse)
    window.addEventListener('mousemove', onMouse)

    const clock = new THREE.Clock()
    let mixer: THREE.AnimationMixer | null = null
    let model:  THREE.Object3D | null      = null

    // ── Load GLB ─────────────────────────────────────────────────
    const loader = new GLTFLoader()
    loader.load(MODEL_URL, (gltf) => {
      const root = gltf.scene
      scene.add(root)
      model = root

      // Step 1: get bbox at RAW scale (identity transform)
      // updateMatrixWorld ensures transforms are computed
      root.updateMatrixWorld(true)
      const rawBox    = new THREE.Box3().setFromObject(root)
      const rawSize   = new THREE.Vector3()
      const rawCenter = new THREE.Vector3()
      rawBox.getSize(rawSize)
      rawBox.getCenter(rawCenter)

      console.log('[Scene] raw size  Y:', rawSize.y.toFixed(1), 'X:', rawSize.x.toFixed(1))
      console.log('[Scene] raw center:', rawCenter.x.toFixed(1), rawCenter.y.toFixed(1), rawCenter.z.toFixed(1))

      // Step 2: compute scale so model is TARGET_H world-units tall
      const TARGET_H = 4.8   // visible character height in world units
      const scale    = TARGET_H / rawSize.y
      root.scale.setScalar(scale)

      // Step 3: shift so model centre sits at world origin
      root.position.set(
        -rawCenter.x * scale,
        -rawCenter.y * scale,
        -rawCenter.z * scale
      )

      // Step 4: camera — back far enough for TARGET_H to fill ~85 % of screen
      // visible height at dist d with fov f = 2*d*tan(f/2)
      // d = (TARGET_H / fill) / (2*tan(f/2))
      const fovRad = 30 * Math.PI / 180
      const fill85 = TARGET_H / 0.85
      const camDist = (fill85 / 2) / Math.tan(fovRad / 2)
      camera.position.set(0, 0, camDist)
      camera.lookAt(0, 0, 0)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      console.log('[Scene] scale:', scale.toFixed(4), ' camDist:', camDist.toFixed(2), ' TARGET_H:', TARGET_H)
      scene.remove(marker)   // hide debug sphere once model loads

      // Animations
      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(root)
        const idle = gltf.animations.find(a => /idle/i.test(a.name)) ?? gltf.animations[0]
        mixer.clipAction(idle).play()
        console.log('[Scene] playing:', idle.name)
      }

      // Fade in
      el.style.transition = 'opacity 0.8s ease'
      el.style.opacity    = '1'
    })

    // Show canvas immediately so debug sphere is visible while model loads
    el.style.opacity = '1'

    // ── Resize ───────────────────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Render loop ───────────────────────────────────────────────
    let raf: number
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (mixer) mixer.update(clock.getDelta())
      if (model) applyHeadTracking(model, mouse)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (document.body.contains(el)) document.body.removeChild(el)
    }
  }, [])

  return null
}

export default function Scene() {
  return <SceneBoundary><SceneInner /></SceneBoundary>
}
