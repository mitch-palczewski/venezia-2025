<script lang="ts">
  import { T } from '@threlte/core';
	import type { IdleTimer } from './idleManager.svelte';
	import type { PerspectiveCamera } from 'three';
	import type { PointerState } from '$lib/3d/core/inputs/mouseInputs.svelte';
	import { useFlyControls } from '$lib/3d/core/controls/flyControls';

  export interface CameraTarget {
        cameraRef?: PerspectiveCamera;
    }

    export interface ControlsLockObj {
		cameraControlsLocked: boolean
	}

 type Props = {
  app:CameraTarget
  pointer: PointerState
  idleTimer: IdleTimer;
	far: number;
  movementSpeed: () => number;
  lockableObj?: ControlsLockObj;
 }
 let {app, pointer, idleTimer, far, movementSpeed, lockableObj }: Props = $props()

 function getIsEnabled(){
    if(lockableObj?.cameraControlsLocked === true){
      return false
    }
    if(lockableObj?.cameraControlsLocked === false){
      return true
    }
    return true
 }

  useFlyControls(
    pointer,
    () => 1,
    movementSpeed,
    undefined,
    () => idleTimer,
    getIsEnabled
  )
</script>




<T.PerspectiveCamera
  bind:ref={app.cameraRef}
  {far}
  makeDefault
/>