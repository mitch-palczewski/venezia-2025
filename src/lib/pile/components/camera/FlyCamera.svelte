<script lang="ts">
  import { T } from '@threlte/core';
	import { useFlyControls } from '../controls/flyControls';
	import type { PointerState } from '../controls/inputs/mouseInputs.svelte';
	import type { IdleTimer } from './idleManager.svelte';
	import type { PerspectiveCamera } from 'three';

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