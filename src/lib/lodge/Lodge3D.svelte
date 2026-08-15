<script lang="ts">
	import { T } from '@threlte/core';
	import type { Lodge } from './Lodge.svelte';
	import TestLodgeRoom from './components/test/TestLodgeRoom.svelte';
	import CameraControls from './core/CameraControls.svelte';
	import { type Group } from 'three';
	import TestInteractableObjects from './components/test/TestInteractableObjects.svelte';
	import ObjectInteractions from './core/interaction/ObjectInteractions.svelte';
	import { PerfMonitor, SoftShadows } from '@threlte/extras';

	type Props = {
		lodge: Lodge;
	};
	let { lodge }: Props = $props();

	let interactiveGroup = $state<Group>();
</script>

<ObjectInteractions {lodge} {interactiveGroup}/>

<CameraControls {lodge} position={[0, 3, 0]} />

<T.AmbientLight intensity={1.5} />
<T.PointLight position={[2, 8, 5]} intensity={13} distance={25} castShadow />

<TestLodgeRoom {lodge} height={10} width={20} depth={20} />

<TestInteractableObjects {lodge} bind:interactiveGroup />


<SoftShadows/>

<PerfMonitor/>