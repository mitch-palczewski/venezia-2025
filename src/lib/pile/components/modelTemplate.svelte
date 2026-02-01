<script lang="ts">
	import { isInstanceOf, T, useTask } from '@threlte/core';
	import {
		bvh,
		BVHSplitStrategy,
		interactivity,
		meshBounds,
		TransformControls,
		useGltf,
		type BVHOptions
	} from '@threlte/extras';
	import { Group, Mesh, Object3D, Vector3 } from 'three';
	import type { Props } from '@threlte/core';
	import { type Snippet } from 'svelte';
	import {
		handleModelClick,
		setObjectMapIfNull,
		type PileObject3D
	} from '../util/pileObject.svelte';
	import type { PileApp } from '../util/pileApp.svelte';
	import { createMover } from '../util/animator.svelte';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		pileObjectData,
		pileApp,
		...props
	}: Props<Group> & {
		children?: Snippet<[{ ref: Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
		ref?: Group;
		pileObjectData: PileObject3D;
		pileApp: PileApp;
	} = $props();
	interactivity();

	let shown = $state(pileObjectData.shown);
	setObjectMapIfNull(pileApp, pileObjectData);
	const gltf = useGltf(pileObjectData.objectMap!.path);
	const sceneChildren = $derived.by(() => {
		if (!$gltf || !$gltf.scene.children) {
			return [];
		}
		const thisSceneChildren = Object.values($gltf.scene.children) as Mesh[];
		console.log(`3D Object: ${pileObjectData.name}  `, thisSceneChildren);
		return thisSceneChildren;
	});

	let showThisTransformControls = $derived.by(() => {
		if (!pileObjectData.id || pileObjectData.id === '')
			throw Error(`Pile Object has no id ${pileObjectData}`);
		if (pileApp.state.selectedObjectID === pileObjectData.id) {
			return pileApp.state.showTransformControls;
		} else {
			return false;
		}
	});

	const options: BVHOptions = {
		enabled: true,
		helper: false,
		strategy: BVHSplitStrategy.SAH,
		indirect: true,
		verbose: false,
		maxDepth: 20,
		maxLeafTris: 15,
		setBoundingBox: true
	};

	//bvh(() => options)
	let targetPosition = $state(new Vector3());
	let isAnimating = $state(false);
	let lerpFactor = $state(0.1); // This acts as your 'speed'
	let isUserInteracting = $state(false); // Guard for TransformControls

	const mover = createMover(() => ref);

	$effect(() => {
		pileObjectData.moveTo = mover.moveTo;
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
				raycast={meshBounds}
				onclick={(e: MouseEvent) => handleModelClick(e, pileApp, pileObjectData)}
			/>
		{/if}
	{/each}
{/snippet}

<!-- MAIN EXECUTION -->

<T.Group bind:ref dispose={true} {name} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		{#if shown && sceneChildren}
			<TransformControls
				showX={showThisTransformControls}
				showY={showThisTransformControls}
				showZ={showThisTransformControls}
				mode={pileApp.uiSettings.transformControlsMode}
			>
				<T.Group>
					{@render sceneBuilder(sceneChildren)}
				</T.Group>
			</TransformControls>
		{/if}
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
