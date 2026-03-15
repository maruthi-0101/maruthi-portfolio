import { useEffect, Component, ReactNode } from 'react'
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
  useEffect(() => {
    if (!isWebGLAvailable()) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch { return }

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    renderer.shadowMap.enabled = true
    renderer.setClearColor(0x000000, 0)

    const el = renderer.domElement
    el.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:2;pointer-events:none;opacity:0;transition:opacity 0.8s ease'
    document.body.appendChild(el)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      14.5,
      window.innerWidth / window.innerHeight,
      0.1, 1000
    )
    camera.position.set(0, 13.1, 24.7)
    camera.zoom = 1.1
    camera.updateProjectionMatrix()

    scene.add(new THREE.AmbientLight(0xffffff, 2.5))

    const key = new THREE.DirectionalLight(0xffffff, 3.0)
    key.position.set(-1, 2, 5)
    scene.add(key)

    const rim = new THREE.DirectionalLight(0x5eead4, 2.0)
    rim.position.set(3, 4, -2)
    rim.castShadow = true
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

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)

    function loadModel(url: string) {
      loader.load(
        url,
        (gltf) => {
          const root = gltf.scene
          root.position.set(0, 0, 0)
          root.scale.set(1, 1, 1)
          scene.add(root)
          model = root

          console.log('[Scene] Model loaded:', url)

          if (gltf.animations.length) {
            mixer = new THREE.AnimationMixer(root)
            const idle = gltf.animations.find(a => /idle/i.test(a.name)) ?? gltf.animations[0]
            mixer.clipAction(idle).play()
            console.log('[Scene] Playing animation:', idle.name)
          }

          el.style.opacity = '1'
        },
        undefined,
        (err) => {
          console.warn('[Scene] Failed to load', url, err)
          if (url === CHARACTER_URL) {
            console.log('[Scene] Trying fallback model...')
            loadModel(FALLBACK_URL)
          }
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
      dracoLoader.dispose()
      renderer.dispose()
      if (document.body.contains(el)) document.body.removeChild(el)
    }
  }, [])

  return null
}

export default function Scene() {
  return <SceneBoundary><SceneInner /></SceneBoundary>
}
