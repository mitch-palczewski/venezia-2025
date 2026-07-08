<!--
@component

- An interactive, floating window that you can drag, and position anywhere on your digital workspace stage.

@Props 

```svelte
		position: Point
		width?: number
		height?: number
		draggable?: boolean
		showTransformGizmo?: boolean;
		scaleOverride?: number | undefined;
		onSelect?: () => void;
		togglableTransformGizmo?: boolean;
		projector?: CoordinateProjector;
```

@example

```svelte
<MovableElement position = {{x:100, y:100}}>
    <div>Your custom content, tool, or graphic goes here!</div>
</MovableElement>
```
-->
<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { MovableFrameModel } from './MovableFrameModel.svelte';
	import TransformGizmo from './transform-gizmo/TransformGizmo.svelte';
	import type { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
	import { ProjectedFrameModel } from '../projected-frame/projectedFrameModel.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Point } from '$lib/core/viewport/viewport.types';
	import { safeGetProjectorContext } from '$lib/core/projector/projector.context.svelte';
	import ProjectedFrame from '../projected-frame/ProjectedFrame.svelte';
	import type { CompassAnchor } from '../util/anchor';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		position: Point;
		width?: number;
		height?: number;
		anchor?: CompassAnchor;
		draggable?: boolean;
		showTransformGizmo?: boolean;
		scaleOverride?: number | undefined;
		onSelect?: () => void;
		togglableTransformGizmo?: boolean;
		projector?: CoordinateProjector;
	}

	let {
		position,
		width,
		height,
		anchor = 'C',
		draggable = true,
		showTransformGizmo = true,
		scaleOverride,
		onSelect,
		togglableTransformGizmo = true,
		projector,
		style = '',
		class: className = 'bg-cyan-950 border border-blue-500 text-white',
		children,
		...restProps
	}: Props = $props();

	const model = new MovableFrameModel({
		x: position.x,
		y: position.y,
		zIndex: position.z,
		width: width,
		height: height,
		draggable: draggable,
		showTransformGizmo: showTransformGizmo
	});

	const coordinateProjector = projector ?? safeGetProjectorContext() ?? null;
	const stageContext = getContext<{ current: number }>('canvas-stage-scale');

	let startPointer = { x: 0, y: 0 };
	let startBox = { x: 0, y: 0 };
	let totalMovement = 0;

	const activeScaleX = $derived(
		coordinateProjector?.scaleX ?? scaleOverride ?? stageContext?.current ?? 1
	);
	const activeScaleY = $derived(
		coordinateProjector?.scaleY ?? scaleOverride ?? stageContext?.current ?? 1
	);

	const isContentDriven = $derived(width === undefined || height === undefined);

	const projectorModel = coordinateProjector
		? new ProjectedFrameModel(
				{
					x: model.x,
					y: model.y,
					pixelWidth: model.width,
					pixelHeight: model.height,
					zIndex: model.zIndex
				},
				coordinateProjector
			)
		: null;

	// 2. Reactively synchronize the values whenever the user drags or resizes.
	// This keeps the DOM projection updated without destroying the instance's measured state!
	$effect(() => {
		if (projectorModel) {
			projectorModel.x = model.x;
			projectorModel.y = model.y;
			projectorModel.pixelWidth = model.width;
			projectorModel.pixelHeight = model.height;
			projectorModel.zIndex = model.zIndex;
		}
	});

	const standardFallbackStyle = $derived(
		`position: absolute; ` +
			`left: ${model.x}px; ` +
			`top: ${model.y}px; ` +
			(typeof model.width === 'number' && model.width > 0 ? `width: ${model.width}px; ` : '') +
			(typeof model.height === 'number' && model.height > 0 ? `height: ${model.height}px; ` : '') +
			`z-index: ${model.zIndex}; ` +
			`${style}`
	);

	function handlePointerDown(event: PointerEvent) {
		if (!model.draggable) return;
		if (event.button !== 0) return;
		if (onSelect) {
			onSelect();
		}
		startPointer = { x: event.clientX, y: event.clientY };
		startBox = { x: model.x, y: model.y };
		totalMovement = 0;

		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp);
	}

	function handlePointerMove(event: PointerEvent) {
		const physicalDeltaX = event.clientX - startPointer.x;
		const physicalDeltaY = event.clientY - startPointer.y;

		totalMovement = Math.abs(physicalDeltaX) + Math.abs(physicalDeltaY);

		const designDeltaX = physicalDeltaX / activeScaleX;
		const designDeltaY = physicalDeltaY / activeScaleY;

		model.x = startBox.x + designDeltaX;
		model.y = startBox.y + designDeltaY;
	}

	function handlePointerUp() {
		window.removeEventListener('pointermove', handlePointerMove);
		window.removeEventListener('pointerup', handlePointerUp);
		if (totalMovement < 4 && togglableTransformGizmo) {
			model.showTransformGizmo = !model.showTransformGizmo;
		}
	}

	function fallbackMeasure(node: HTMLElement) {
		if (!isContentDriven || coordinateProjector) return;

		requestAnimationFrame(() => {
			const rect = node.getBoundingClientRect();
			if (rect.width > 0) model.width = rect.width;
			if (rect.height > 0) model.height = rect.height;
		});
	}

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerup', handlePointerUp);
		}
	});
</script>

{#snippet innerContent()}
	{#if model.showTransformGizmo}
		<TransformGizmo
			ondrag={(side, delta) => {
				const scaleDeltaX = delta / activeScaleX;
				const scaleDeltaY = delta / activeScaleY;
				if (side === 'left' || side === 'right') {
					model.x = model.x + scaleDeltaX;
				}
				if (side === 'top' || side === 'bottom') {
					model.y = model.y + scaleDeltaY;
				}
			}}
		/>
	{/if}
	<div class="pointer-events-auto relative h-full w-full cursor-auto">
		{@render children?.()}
	</div>
{/snippet}

{#if coordinateProjector && projectorModel}
	<ProjectedFrame
		model={projectorModel}
		class="touch-none select-none {model.draggable ? 'cursor-move' : 'cursor-default'} {className}"
		onpointerdown={handlePointerDown}
		ondragstart={(e) => e.preventDefault()}
		{...restProps}
	>
		{@render innerContent()}
	</ProjectedFrame>
{:else}
	<div
		use:fallbackMeasure
		class="touch-none select-none {model.draggable ? 'cursor-move' : 'cursor-default'} {className}"
		onpointerdown={handlePointerDown}
		ondragstart={(e) => e.preventDefault()}
		style={standardFallbackStyle}
		{...restProps}
	>
		{@render innerContent()}
	</div>
{/if}
