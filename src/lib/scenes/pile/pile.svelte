<script lang="ts">

	import { onMount } from 'svelte';
  	import { writable } from 'svelte/store';
    import { T } from "@threlte/core";
    import { OrbitControls } from "@threlte/extras";

	import type { Vec3, ObjectTransform, ObjectPositions } from './pileTypes';
    import PileZardoz01 from "./models/pile_Zardoz_01.svelte";
	
	export let blobUrl: string = import.meta.env.VITE_BLOB_URL || "";

	const data = writable<ObjectPositions | null>(null);
	const error = writable<string | null>(null);
	const loading = writable<boolean>(true);

	async function fetchPositions(url:string){
		loading.set(true);
		error.set(null);
		try {
			if (!url) throw new Error('Blob URL is not set')
			const response = await fetch(url, {cache: "no-cache"})
			if (!response.ok) throw new Error('Fetch failed: ${res.status} ${res.status.text}')
			const json: ObjectPositions = await response.json();
			console.log(json)
			data.set(json)
		} catch (e) {
			error.set(e instanceof Error ? e.message : String(e))
			data.set(null)
		} finally {
			loading.set(false)
		}
	}

	onMount(() => {
		fetchPositions(blobUrl)
	})

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