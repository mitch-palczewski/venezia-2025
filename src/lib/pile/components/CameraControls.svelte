<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Vector3, type PerspectiveCamera } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
	import type { SettingsState } from '../util/ui/settingsState.svelte';
	import type { PileApp } from '../util/pileApp.svelte';

  interface Props {
    uiSettings: SettingsState
    app: PileApp
  }
  let {uiSettings, app}:Props = $props()

  const keys = $state({
    w: false, a: false, s: false, d: false,
    space: false, shift: false
  })

  const direction = new Vector3()
  const tempVector = new Vector3()

  const onKey = (e: KeyboardEvent, isPressed: boolean) => {
    const key = e.key.toLowerCase()
    const keyMap = e.code === 'Space' ? 'space' : key
    if (keyMap in keys) keys[keyMap as keyof typeof keys] = isPressed
  }

  useTask((delta) => {
    if (!app.cameraRef || !app.controlsRef) return

    direction.set(0, 0, 0)


    const forward = new Vector3()
    app.cameraRef.getWorldDirection(forward)
    forward.y = 0 
    forward.normalize()

    const side = new Vector3().crossVectors(app.cameraRef.up, forward).normalize()

    if (keys.w) direction.add(forward)
    if (keys.s) direction.sub(forward)
    if (keys.a) direction.add(side)
    if (keys.d) direction.sub(side)

    if (direction.length() > 0) direction.normalize()


    if (keys.space) direction.y += 1
    if (keys.shift) direction.y -= 1

    if (direction.length() > 0) {
      const moveStep = direction.multiplyScalar(uiSettings.movementSpeed * delta)
      
      app.cameraRef.position.add(moveStep)
      app.controlsRef.target.add(moveStep)
      app.controlsRef.update()
    }
  })
</script>

<svelte:window 
  onkeydown={(e) => onKey(e, true)} 
  onkeyup={(e) => onKey(e, false)} 
/>

<T.PerspectiveCamera
  bind:ref={app.cameraRef}
  makeDefault
  far={100000}
  position={[5, 5, 10]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls bind:ref={app.controlsRef} enableDamping />
</T.PerspectiveCamera>