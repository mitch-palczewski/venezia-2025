<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';

	import { fetchPositions } from './hooks/fetchPositions';
	import PileZardoz01 from './models/pile_Zardoz_01.svelte';

	import type { Vec3, ObjectTransform, ObjectPositions } from './types';

	//export let blobUrl: string = import.meta.env.VITE_PILE_POSITION_URL || '';
	const data = writable<ObjectPositions | null>(null);
	const loading = writable<boolean>(true);
	const error = writable<string | null>(null);

	export function getPositions(): ObjectPositions {
		// return a fresh snapshot from scene state
		return {
			PileZardoz01: { position: [1, 2, 3], rotation: [0, 0, 0], scale: [1, 1, 1] }
		};
	}

	onMount(() => {
		//fetchPositions(blobUrl, data, loading, error);
	
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[1, 2, 5]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<PileZardoz01 />
