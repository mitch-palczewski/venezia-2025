<script lang="ts">
	import type * as THREE from 'three';

	import type { Snippet } from 'svelte';
	import { T, type Props } from '@threlte/core';
	import {interactivity, TransformControls, useGltf, meshBounds} from '@threlte/extras';
	import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';
	import type { ModelKey } from '../types';
	import { isSelectedObject, pileState } from '../pileState.svelte';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		name = 'BurntBoy_01',
		...props
	}: Props<THREE.Group> & {
		ref?: THREE.Group;
		children?: Snippet<[{ ref: THREE.Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
		name?: ModelKey;
	} = $props();

	type GLTFResult = {
		nodes: {
			BurntBoy_01: THREE.Mesh;
		};
		materials: {};
	};
	interactivity();

	const gltf = useGltf<GLTFResult>('/models/undertow/BurntBoy_01.glb');
	let showThisTransformControls = $derived.by(() => {
		if(isSelectedObject(name)){
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
				geometry={gltf.nodes.BurntBoy_01.geometry}
				material={gltf.nodes.BurntBoy_01.material}
				raycast={meshBounds}
				ondblclick={(e: any) => {
					if (isSelectedObject(name)){
						pileState.showTransformControls = !pileState.showTransformControls
						
					}else{
						if(ref){
							pileState.selectedObject = ref
						}
						pileState.showTransformControls = true
					}	
				}}
			/>
		</TransformControls>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
