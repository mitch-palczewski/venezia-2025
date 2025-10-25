<script lang="ts">
	import type { Props } from '@threlte/core';
	import * as THREE from 'three';
	import { T} from '@threlte/core';
	import { interactivity, meshBounds, TransformControls, useGltf, Text } from '@threlte/extras';
	import {  type Snippet } from 'svelte';

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
	
	let showTransformControls = $state(true);
	let meshRef: THREE.Mesh | undefined;

	export function getPosition(target: THREE.Vector3){
		if (!meshRef){
			return
		}
		const out = meshRef.getWorldPosition(target)
		console.log(out)
		return out
	}
	
	const gltf = useGltf('/models/undertow/Zardoz_01.glb');
</script>




<T.Group bind:ref dispose={false} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
	<TransformControls 
	showX={showTransformControls} 
	showY={showTransformControls}
	showZ={showTransformControls}	
>
		<T.Mesh
			geometry={gltf.nodes.Zardoz_01.geometry} 
			material={gltf.nodes.Zardoz_01.material}  
			raycast={meshBounds}
			ondblclick={(e: any) => 
				showTransformControls = !showTransformControls
			}
			oncreate={(mesh) => {
				meshRef = mesh;
			}}
		>
		</T.Mesh>
		<Text
			text ="Double click to show or hide Transform Controls"
			color="black"
			anchorX="50%"
			anchorY="650%"
		/>
		</TransformControls>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>


