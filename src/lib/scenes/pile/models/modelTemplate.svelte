<script lang="ts">
	import type { Props } from '@threlte/core';
	import * as THREE from 'three';
	import { T } from '@threlte/core';
	import { interactivity, meshBounds, TransformControls, useGltf } from '@threlte/extras';
	import { type Snippet } from 'svelte';
	import { pileState, isSelectedObject } from '../pileState.svelte';
	import type { ModelName } from './models';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		name,
        gltfPath='',
		...props
	}: Props<THREE.Group> & {
		ref?: THREE.Group;
		children?: Snippet<[{ ref: THREE.Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
		name?: ModelName;
        gltfPath?: string;
	} = $props();
	interactivity();

	const gltf = useGltf(gltfPath);
	let showThisTransformControls = $derived.by(() => {
		if(name && isSelectedObject(name)){
			return pileState.showTransformControls
		}else{
			return false
		}
	})
</script>

<T.Group bind:ref dispose={false} name={name} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<TransformControls
			showX={ showThisTransformControls }
			showY={ showThisTransformControls }
			showZ={ showThisTransformControls }
			mode={pileState.transformControlsMode}
		>
			<T.Mesh
				geometry={gltf.nodes.name.geometry}
				material={gltf.nodes.name.material}
				raycast={meshBounds}
				ondblclick={(e: any) => {
					if (name && isSelectedObject(name)){
						pileState.showTransformControls = !pileState.showTransformControls
					}else{
						if(ref){
							pileState.selectedObject = ref
						}
						pileState.showTransformControls = true
					}	
				}}
			></T.Mesh>
		</TransformControls>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
