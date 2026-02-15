<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Vector3, type PerspectiveCamera } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
	import type { SettingsState } from '../util/ui/settingsState.svelte';

  interface Props {
    uiSettings: SettingsState
  }
  let {uiSettings}:Props = $props()
  let cameraRef = $state<PerspectiveCamera>()
  let controlsRef = $state<ThreeOrbitControls>()

  const keys = $state({
    w: false, a: false, s: false, d: false,
    space: false, shift: false
  })

  const onKey = (e: KeyboardEvent, isPressed: boolean) => {
    const key = e.key.toLowerCase()
    const keyMap = e.code === 'Space' ? 'space' : key
    if (keyMap in keys) keys[keyMap as keyof typeof keys] = isPressed
  }

  useTask((delta) => {
    if (!cameraRef || !controlsRef) return

    uiSettings.cameraLocation.set(0, 0, 0)


    const forward = new Vector3()
    cameraRef.getWorldDirection(forward)
    forward.y = 0 
    forward.normalize()

    const side = new Vector3().crossVectors(cameraRef.up, forward).normalize()

    if (keys.w) uiSettings.cameraLocation.add(forward)
    if (keys.s) uiSettings.cameraLocation.sub(forward)
    if (keys.a) uiSettings.cameraLocation.add(side)
    if (keys.d) uiSettings.cameraLocation.sub(side)

    if (uiSettings.cameraLocation.length() > 0) uiSettings.cameraLocation.normalize()


    if (keys.space) uiSettings.cameraLocation.y += 1
    if (keys.shift) uiSettings.cameraLocation.y -= 1

    if (uiSettings.cameraLocation.length() > 0) {
      const moveStep = uiSettings.cameraLocation.multiplyScalar(uiSettings.movementSpeed * delta)
      
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
  far={100000}
  position={[5, 5, 10]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls bind:ref={controlsRef} enableDamping />
</T.PerspectiveCamera>