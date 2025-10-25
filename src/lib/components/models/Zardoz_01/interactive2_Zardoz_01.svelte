<script lang="ts">
	import type { Props } from '@threlte/core';
	import type * as THREE from 'three';
	import { T, useThrelte } from '@threlte/core';
	import { interactivity, meshBounds, TransformControls, useGltf, Text } from '@threlte/extras';
	import { onMount, type Snippet } from 'svelte';

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

	const {dom} = useThrelte()

	const {target} = interactivity();
	
	let showTransformControls = $state(true)

	$effect(() => {
		if (dom) {
			target.set(dom)
		}
    	
  	})
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


