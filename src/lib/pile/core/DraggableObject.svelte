<script lang="ts">
	import { isInstanceOf, T, useThrelte } from '@threlte/core';
	import { bvh, BVHSplitStrategy, meshBounds, useGltf } from '@threlte/extras';
	import { Box3, Group, Mesh, Object3D, Vector3 } from 'three';
	import type { Props } from '@threlte/core';
	import { type Snippet } from 'svelte';
	import { setObjectMapIfNull, type PileObject3D } from '../util/pileObject.svelte';
	import type { PileApp } from '../util/pileApp.svelte';
	import { createMover } from '../util/animator.svelte';
	import { useCameraPlaneDrag } from '$lib/3d/core/controls/interactions/useCameraPlaneDrag';
	import { useCameraLaunch } from '$lib/3d/core/controls/interactions/useCameraLaunch';

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

	let shown = $state(pileObjectData.shown);
	setObjectMapIfNull(pileApp, pileObjectData);
	const { renderer, scene, camera } = useThrelte();
	const gltf = useGltf(pileObjectData.objectMap!.path);
	const sceneChildren = $derived.by(() => {
		if (!$gltf || !$gltf.scene.children) {
			return [];
		}
		const thisSceneChildren = Object.values($gltf.scene.children) as Mesh[];
		console.log(`3D Object: ${pileObjectData.name}  `, thisSceneChildren);
		return thisSceneChildren;
	});



	let gltfReady = $state(false);
	$effect(() => {
		if (!$gltf?.scene || !renderer) return;

		renderer
			.compileAsync($gltf.scene, camera.current, scene)
			.then(() => {
				gltfReady = true;
			})
			.catch((err) => {
				console.error('Failed to pre-compile GLTF:', err);
				gltfReady = true; // Fallback so it doesn't stay hidden forever
			});
	});

	//Moving Animation
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

	//Get AssetSize when GLTF store resolves
	let baseAssetSize = $state(1);
	$effect(() => {
		if (!$gltf?.scene) return;
		const box = new Box3().setFromObject($gltf.scene);
		const size = new Vector3();
		box.getSize(size);
		baseAssetSize = Math.max(size.x, size.y, size.z);
		if (baseAssetSize === 0) baseAssetSize = 1;
	});

	// Hide Object if small and far away
	let shouldRender = $state(true);
	$effect(() => {
		if (!ref || !pileApp.cameraRef) return;
		const staggeredDelay = 2000 + Math.random() * 400;
		const interval = setInterval(() => {
			if (!ref || !pileApp.cameraRef) return;
			if (pileApp.state.selectedObjectID === pileObjectData.id) {
				shouldRender = true;
				return;
			}
			const distance = ref.position.distanceTo(pileApp.cameraRef.position);
			const currentScaleFactor = Math.max(scale[0], scale[1], scale[2]);
			const trueWorldSize = baseAssetSize * currentScaleFactor;
			const apparentSize = trueWorldSize / distance;

			const CUTOFF_THRESHOLD =
				pileApp.deviceContext.performance.performanceTier <= 1 ? 0.03 : 0.015;
			shouldRender = apparentSize > CUTOFF_THRESHOLD;
		}, staggeredDelay);
		return () => clearInterval(interval);
	});

	// BVH Settings
	const isLowQuality = pileApp.deviceContext.performance.performanceTier <= 1;
	const isMedQuality = pileApp.deviceContext.performance.performanceTier === 2;

	bvh(() => ({
		enabled: pileApp.deviceContext.performance.performanceTier > 2,
		strategy: BVHSplitStrategy.CENTER,
		maxDepth: pileApp.deviceContext.performance.performanceTier === 4 ? 10 : 5,
		maxLeafTris: pileApp.deviceContext.performance.performanceTier === 4 ? 100 : 500,
		verbose: false,
		setBoundingBox: false,
		helper: false
	}));

	$effect(() => {
		if ($gltf && pileObjectData.onLoad) {
			pileObjectData.onLoad();
			delete pileObjectData.onLoad;
		}
	});

	let isSelected = $state(false);

	const { onPointerDown } = useCameraPlaneDrag({
		onPickUp: () => {
			pileApp.state.selectedObjectID = pileObjectData.id;
			pileApp.state.cameraControlsLocked = true;
			isSelected = true;
		},
		onDrop: (obj) => {
			pileApp.state.cameraControlsLocked = false;
			if (obj) {
				pileApp.database.update(pileObjectData);
			}
			isSelected = false;
		}
	});

	const MAX_INTERACTION_DISTANCE = $state((pileApp.controlsRef?.getDistance() ?? 1 ) * 1000);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function isWithinInteractionRange(e: any): boolean {
		if (typeof e.distance === 'number' && e.distance <= MAX_INTERACTION_DISTANCE) {
			return true;
		}

		if (ref && camera.current) {
			const cameraPos = camera.current.position;
			const box = new Box3().setFromObject(ref);
			if (
				box.containsPoint(cameraPos) ||
				box.distanceToPoint(cameraPos) <= MAX_INTERACTION_DISTANCE
			) {
				return true;
			}
		}
		return false;
	}

	function handleSingleClick(e: PointerEvent) {
		if (!isWithinInteractionRange(e)) return;
		e.stopPropagation();
		onPointerDown(e, ref!);
	}

	const { onDblClick } = useCameraLaunch({
		distance: 200,
		duration: 3,
		onLaunchComplete: (obj) => {
			pileApp.database.update(pileObjectData);
		}
	});

	function handleDblClick(e: PointerEvent) {
		if (!isWithinInteractionRange(e)) return;
		onDblClick(e, ref!);
	}
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
				raycast={isMedQuality ? meshBounds : undefined}
			></T.Mesh>
		{/if}
	{/each}
{/snippet}

<!-- MAIN EXECUTION -->

<T.Group
	bind:ref
	dispose={true}
	name={pileObjectData.name}
	onpointerdown={handleSingleClick}
	ondblclick={handleDblClick}
>
	{#await $gltf}
		{@render fallback?.()}
	{:then gltf}
		{#if shown && sceneChildren && shouldRender && gltfReady}
			<T.Group>
				{@render sceneBuilder(sceneChildren)}
				{#if isSelected}
					<T.Mesh rotation.x={-Math.PI / 2} position.y={0.01}>
						<T.RingGeometry args={[1.0, 1.04, 32]} />
						<T.MeshBasicMaterial color="#E7F04D" side={2} transparent={true} opacity={0.5} />
					</T.Mesh>
					<T.Mesh rotation.x={0} position.y={0.01}>
						<T.RingGeometry args={[1.0, 1.04, 32]} />
						<T.MeshBasicMaterial color="#E7F04D" side={2} transparent={true} opacity={0.5} />
					</T.Mesh>
					<T.Mesh rotation.y={-Math.PI / 2} position.y={0.01}>
						<T.RingGeometry args={[1.0, 1.04, 32]} />
						<T.MeshBasicMaterial color="#E7F04D" side={2} transparent={true} opacity={0.5} />
					</T.Mesh>
				{/if}
			</T.Group>
		{/if}
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
