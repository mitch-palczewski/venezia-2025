<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import type { IdleTimer } from './idleManager.svelte';
	import type { PerspectiveCamera } from 'three';
	import Controls from '$lib/pile/components/UI/settings-menu/Controls.svelte';

	const AUTO_ROTATE_SPEED = 0.5;
	const CAMERA_POS: [x: number, y: number, z: number] = [20, 20, 20];
	const CAMERA_LOOK_AT_POS: [x: number, y: number, z: number] = [0, 3, 0];
	const MAX_CAMERA_DISTANCE = 30000;
	const ROT_SPEED = 0.4;
	const DAMPING = 0.1;
	const PAN_SPEED = 0.8;

	export interface CameraControlsTarget {
        cameraRef?: PerspectiveCamera;
        controlsRef?: ThreeOrbitControls;
    }

	export interface ControlsLockObj {
		cameraControlsLocked: boolean
	}
	
	interface Props {
		app: CameraControlsTarget;
		idleTimer: IdleTimer;
		far: number;
		lockableObj?: ControlsLockObj
	}

	let { app, idleTimer, far, lockableObj}: Props = $props();

	function getIsEnabled(){
		if(lockableObj?.cameraControlsLocked === true){
			return false
		}
		if(lockableObj?.cameraControlsLocked === false){
			return true
		}
		return true

	}

</script>
<T.PerspectiveCamera
	bind:ref={app.cameraRef}
	makeDefault
	{far}
	near={15}
	position={CAMERA_POS}
	oncreate={(ref) => ref.lookAt(...CAMERA_LOOK_AT_POS)}
	zoom={0.7}
>
	<OrbitControls
		bind:ref={app.controlsRef}
		enabled={getIsEnabled()}
		enableDamping
		dampingFactor={DAMPING}
		rotateSpeed={ROT_SPEED}
		autoRotate={idleTimer.isIdle}
		autoRotateSpeed={AUTO_ROTATE_SPEED}
		zoomSpeed={0.4}
		maxDistance={MAX_CAMERA_DISTANCE}
		panSpeed={PAN_SPEED}
		onstart={idleTimer.stop}
		onend={idleTimer.reset}
	/>
</T.PerspectiveCamera>
