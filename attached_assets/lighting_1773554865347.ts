import * as THREE from 'three'

export function setupLights(scene: THREE.Scene): void {
  // Strong ambient so model is never fully dark
  scene.add(new THREE.AmbientLight(0xffffff, 1.8))

  // Main front key light — white, from upper-front-left
  const key = new THREE.DirectionalLight(0xffffff, 2.0)
  key.position.set(-2, 3, 5)
  scene.add(key)

  // Teal accent rim — from upper-right-back
  const rim = new THREE.DirectionalLight(0x5eead4, 1.2)
  rim.position.set(3, 4, -3)
  scene.add(rim)

  // Warm fill from below-front-right
  const fill = new THREE.DirectionalLight(0xffeedd, 0.8)
  fill.position.set(4, -1, 3)
  scene.add(fill)
}
