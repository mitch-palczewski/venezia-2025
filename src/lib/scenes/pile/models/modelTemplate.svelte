<script lang="ts">
	//TODO: get node function
	import type { Props } from '@threlte/core';
	import * as THREE from 'three';
	import { T } from '@threlte/core';
	import { interactivity, meshBounds, TransformControls, useGltf } from '@threlte/extras';
	import { onMount, type Snippet } from 'svelte';
	import { pileState, isSelectedObject } from '../pileState.svelte';
	import type { ModelName } from './models';
	import { getModelPath } from './models';
	import type { GltfNode } from '../types';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		name = 'Arch_01',
		...props
	}: Props<THREE.Group> & {
		ref?: THREE.Group;
		children?: Snippet<[{ ref: THREE.Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
		name?: string;
	} = $props();
	interactivity();

	const gltfPath = getModelPath(name);
	const gltf = useGltf(gltfPath);
	console.log(gltf);

	let showThisTransformControls = $derived.by(() => {
		if (name && isSelectedObject(name)) {
			return pileState.showTransformControls;
		} else {
			return false;
		}
	});

	function handleDoubleClick(e: MouseEvent) {
		e.stopPropagation();
		if (!name) return;
		if (isSelectedObject(name)) {
			pileState.showTransformControls = !pileState.showTransformControls;
			return;
		} else {
			if (ref) {
				pileState.selectedObject = ref;
			}
			pileState.showTransformControls = true;
		}
	}

</script>

<T.Group bind:ref dispose={false} {name} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<TransformControls
			showX={showThisTransformControls}
			showY={showThisTransformControls}
			showZ={showThisTransformControls}
			mode={pileState.transformControlsMode}
		>
			<T.Mesh
				geometry={gltf.nodes[name].geometry}
				material={gltf.nodes[name].material}
				raycast={meshBounds}
				ondblclick={handleDoubleClick}
			></T.Mesh>
		</TransformControls>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
