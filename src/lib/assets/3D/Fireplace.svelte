<script lang="ts">
	import { isInstanceOf, T} from '@threlte/core';
	import {
		useGltf
	} from '@threlte/extras';
	import { Group, Mesh, Object3D } from 'three';
	import type { Props } from '@threlte/core';
	import { type Snippet } from 'svelte';
	
	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		...props
	}: Props<Group> & {
		children?: Snippet<[{ ref: Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
		ref?: Group;
	} = $props();


const gltf = useGltf('/models/Misc_04_LOD1.glb');
	const sceneChildren = $derived.by(() => {
		if (!$gltf || !$gltf.scene.children) {
			console.log("ERROROROROR THE TOWER IS BORKEN YOU MUST FIX THE TOWER NOW!!! THE TOWER MUST BE CLIMBED. CLIMB THE TOWER TO THE TOP.")
			return [];
		}
		const thisSceneChildren = Object.values($gltf.scene.children) as Mesh[];
		return thisSceneChildren;
	});

	
</script>

<!-- 
	SNIPPET
	parameter: sceneChildren: Object3D[]
	description: If child is group calls self recursivly. If Mesh creates mesh. 
 -->
{#snippet sceneBuilder(sceneChildren: Object3D[])}
	{#each sceneChildren as child}
		{#if (child.type == 'Group' && child.children) || (child.type == 'Object3D' && child.children)}
			<T.Group
				position={[child.position.x, child.position.y, child.position.z]}
				rotation={[child.rotation.x, child.rotation.y, child.rotation.z]}
				scale={[child.scale.x, child.scale.y, child.scale.z]}
			>
				{@render sceneBuilder(child.children)}
			</T.Group>
		{/if}
		{#if child.type == 'Mesh' && isInstanceOf(child, 'Mesh')}
			<T.Mesh
				geometry={(child as Mesh).geometry}
				material={(child as Mesh).material}
				position={[child.position.x, child.position.y, child.position.z]}
				rotation={[child.rotation.x, child.rotation.y, child.rotation.z]}
				scale={[child.scale.x, child.scale.y, child.scale.z]}
			></T.Mesh>
		{/if}
	{/each}
{/snippet}

<!-- MAIN EXECUTION -->

<T.Group
	bind:ref
	dispose={true}
>
	{#await $gltf}
		{@render fallback?.()}
	{:then gltf}
		{#if  sceneChildren}

				<T.Group scale={[ 19600, 19600, 19600]} position={[74134.4088, -11705.8656 ,46914.1325 ]} quaternion={[ 0.0083, -0.703, -0.2286, 0.6733]}>
					{@render sceneBuilder(sceneChildren)}
				</T.Group>
		{/if}
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
