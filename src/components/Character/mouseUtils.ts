import * as THREE from 'three'

export interface MouseState {
  x: number
  y: number
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function handleMouseMove(e: MouseEvent, mouse: MouseState) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
}

const MAX_Y_ROT = Math.PI / 6

export function applyHeadTracking(
  model: THREE.Object3D,
  mouse: MouseState
): void {
  const boneNames = ['Head', 'mixamorigHead', 'spine006', 'Neck', 'head']

  for (const name of boneNames) {
    const bone = model.getObjectByName(name) as THREE.Bone | undefined
    if (bone) {
      bone.rotation.y = lerp(bone.rotation.y, mouse.x * MAX_Y_ROT, 0.1)
      bone.rotation.x = lerp(bone.rotation.x, -mouse.y * 0.3, 0.2)
      break
    }
  }
}
