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

/**
 * Find and cache the head bone once after model load.
 * Never call traverse() inside the render loop.
 */
export function findHeadBone(model: THREE.Object3D): THREE.Object3D | null {
  let found: THREE.Object3D | null = null
  model.traverse((child: any) => {
    if (found) return
    if (child.isBone) {
      const name = child.name.toLowerCase()
      if (name === 'spine006' || name.includes('head') || name.includes('neck')) {
        found = child
      }
    }
  })
  return found
}

/**
 * Filter an AnimationClip to EXCLUDE tracks for the given bone names.
 * This prevents the AnimationMixer from overwriting head/neck rotations
 * that we apply manually for mouse tracking.
 */
export function filterOutBoneTracks(
  clip: THREE.AnimationClip,
  excludeBoneNames: string[]
): THREE.AnimationClip {
  const filteredTracks = clip.tracks.filter(
    (track) => !excludeBoneNames.some((bone) => track.name.toLowerCase().includes(bone.toLowerCase()))
  )
  return new THREE.AnimationClip(clip.name + '_headless', clip.duration, filteredTracks)
}

/**
 * Apply mouse-driven head rotation — port of Rajesh's handleHeadRotation.
 * Call this AFTER mixer.update() every frame so it always wins.
 * The bone must be pre-cached via findHeadBone().
 */
export function applyHeadTracking(
  headBone: THREE.Object3D,
  mouse: MouseState
): void {
  const maxRotation = Math.PI / 6  // ±30°

  // Horizontal tracking — full range
  headBone.rotation.y = lerp(headBone.rotation.y, mouse.x * maxRotation, 0.1)

  // Vertical tracking with clamping (exactly from Rajesh source)
  const minY = -0.3
  const maxY = 0.4
  if (mouse.y > minY) {
    if (mouse.y < maxY) {
      headBone.rotation.x = lerp(
        headBone.rotation.x,
        -mouse.y - 0.5 * maxRotation,
        0.1
      )
    } else {
      // Cursor very high — clamp at max upward look
      headBone.rotation.x = lerp(
        headBone.rotation.x,
        -maxRotation - 0.5 * maxRotation,
        0.1
      )
    }
  } else {
    // Cursor very low — clamp at max downward look
    headBone.rotation.x = lerp(
      headBone.rotation.x,
      -minY - 0.5 * maxRotation,
      0.1
    )
  }
}
