<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Vector3, type PerspectiveCamera } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

  let cameraRef = $state<PerspectiveCamera>()
  let controlsRef = $state<ThreeOrbitControls>()

  const keys = $state({
    w: false, a: false, s: false, d: false,
    space: false, shift: false
  })

  // Adjusted speed (units per second)
  const baseSpeed = 5
  const direction = new Vector3()
  const tempVector = new Vector3()

  const onKey = (e: KeyboardEvent, isPressed: boolean) => {
    const key = e.key.toLowerCase()
    const keyMap = e.code === 'Space' ? 'space' : key
    if (keyMap in keys) keys[keyMap as keyof typeof keys] = isPressed
  }

  useTask((delta) => {
    if (!cameraRef || !controlsRef) return

    direction.set(0, 0, 0)

    // 1. Get Forward and Side Vectors
    const forward = new Vector3()
    cameraRef.getWorldDirection(forward)
    forward.y = 0 
    forward.normalize()

    const side = new Vector3().crossVectors(cameraRef.up, forward).normalize()

    // 2. Accumulate movement components
    if (keys.w) direction.add(forward)
    if (keys.s) direction.sub(forward)
    if (keys.a) direction.add(side)
    if (keys.d) direction.sub(side)

    // 3. Normalize horizontal movement only
    // This ensures diagonal movement isn't faster, but vertical is independent
    if (direction.length() > 0) direction.normalize()

    // 4. Add vertical movement separately
    if (keys.space) direction.y += 1
    if (keys.shift) direction.y -= 1

    // 5. Finalize movement
    if (direction.length() > 0) {
      // delta * 60 approximates "units per frame" based on "units per second"
      const moveStep = direction.multiplyScalar(baseSpeed * delta)
      
      cameraRef.position.add(moveStep)
      controlsRef.target.add(moveStep)
      controlsRef.update()
    }
  })
</script>

<svelte:window 
  onkeydown={(e) => onKey(e, true)} 
  onkeyup={(e) => onKey(e, false)} 
/>

<T.PerspectiveCamera
  bind:ref={cameraRef}
  makeDefault
  position={[5, 5, 10]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls bind:ref={controlsRef} enableDamping />
</T.PerspectiveCamera>