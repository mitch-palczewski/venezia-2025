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
		position,
		quaternion,
		scale,
		...props
	}: Props<Group> & {
		children?: Snippet<[{ ref: Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
		ref?: Group;
		pileObjectData: PileObject3D;
		pileApp: PileApp;
		position: [number, number, number];
		scale: [number, number, number];
		quaternion: [number, number, number, number];
	} = $props();
	const { raycaster } = interactivity();
	raycaster.firstHitOnly = true;

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

	const mover = createMover(() => ref);

	$effect(() => {
		if (ref && !mover.initialized) {
			ref.position.set(position[0], position[1], position[2]);
			ref.quaternion.set(quaternion[0], quaternion[1], quaternion[2], quaternion[3]);
			ref.scale.set(scale[0], scale[1], scale[2]);
		}
	});

	$effect(() => {
		pileObjectData.moveTo = mover.moveTo;
	});

	const options = $state<BVHOptions>({
		enabled: true,
		helper: false,
		strategy: BVHSplitStrategy.SAH,
		indirect: false,
		verbose: false,
		maxDepth: 20,
		maxLeafTris: 10,
		setBoundingBox: true
	});
	bvh(() => options)
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
				
				onclick={(e: MouseEvent) =>
					pileApp.uiSettings.doubleClick ? null : handleModelClick(e, pileApp, pileObjectData)}
				ondblclick={(e: MouseEvent) =>
					pileApp.uiSettings.doubleClick ? handleModelClick(e, pileApp, pileObjectData) : null}
			/>
		{/if}
	{/each}
{/snippet}

<!-- MAIN EXECUTION -->

<T.Group bind:ref dispose={true} name={pileObjectData.name}>
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
