<script lang="ts">
  import { T } from '@threlte/core';
	import type { IdleTimer } from './idleManager.svelte';
	import type { PerspectiveCamera } from 'three';
	import type { PointerState } from '$lib/3d/core/inputs/mouseInputs.svelte';
	import { useFlyControls } from '$lib/3d/core/controls/flyControls';

  export interface CameraTarget {
        cameraRef?: PerspectiveCamera;
    }

 type Props = {
  app:CameraTarget
  pointer: PointerState
  idleTimer: IdleTimer;
		far: number;
 }
 let {app, pointer, idleTimer, far }: Props = $props()

  useFlyControls(
    pointer,
    () => 1,
    ()=> 10,
    undefined,
    () => idleTimer
  )
</script>




<T.PerspectiveCamera
  bind:ref={app.cameraRef}
  makeDefault
/>