<script lang="ts">
	import type { Props } from '@threlte/core';
	import type * as THREE from 'three';
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import type { Snippet } from 'svelte';
	import { TransformControls, interactivity, meshBounds } from '@threlte/extras';
	import { pileState } from '../pileState.svelte';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		...props
	}: Props<THREE.Group> & {
		ref?: THREE.Group;
		children?: Snippet<[{ ref: THREE.Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
	} = $props();

	interactivity();

	const gltf = useGltf('/models/undertow/Zardoz_01.glb');
</script>

<T.Group bind:ref dispose={false} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<T.Mesh
			geometry={gltf.nodes.Zardoz_01.geometry}
			material={gltf.nodes.Zardoz_01.material}
			
			onclick={() => {console.log("click")}}
		/>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
