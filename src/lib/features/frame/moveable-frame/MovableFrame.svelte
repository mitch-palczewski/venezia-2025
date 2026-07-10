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
		width = $bindable(),
		height = $bindable(),
		anchor = 'NW',
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

	let x = $state(position.x);
    let y = $state(position.y);
    let z = $state(position.z);


    $effect(() => {
        x = position.x;
        y = position.y;
        z = position.z;
    });

    $effect(() => {
        if (position.x !== x || position.y !== y || position.z !== z) {
            position = { x, y, z };
        }
    });

	const coordinateProjector = projector ?? safeGetProjectorContext() ?? null;
	const stageContext = getContext<{ current: number }>('canvas-stage-scale');

	let startPointer = { x: 0, y: 0 };
	let startBox = { x: 0, y: 0 };
	let totalMovement = 0;

	const activeScaleX = $derived(
		stageContext?.current ?? coordinateProjector?.scaleX ?? scaleOverride ??  1
	);
	const activeScaleY = $derived(
		stageContext?.current ?? coordinateProjector?.scaleY ?? scaleOverride ??  1
	);

	const isContentDriven = $derived(width === undefined || height === undefined);

	const projectorModel = coordinateProjector
		? new ProjectedFrameModel(
				{
					x: position.x,
					y: position.y,
					pixelWidth: width,
					pixelHeight: height,
					zIndex: position.z
				},
				coordinateProjector
			)
		: null;

	$effect(() => {
		if (projectorModel) {
			projectorModel.x = x;
			projectorModel.y = y;
			projectorModel.pixelWidth = width;
			projectorModel.pixelHeight = height;
			projectorModel.zIndex = z ?? 1;
		}
	});

	const standardFallbackStyle = $derived(
		`position: absolute; ` +
			`left: ${x}px; ` +
			`top: ${y}px; ` +
			(typeof width === 'number' && width > 0 ? `width: ${width}px; ` : '') +
			(typeof height === 'number' && height > 0 ? `height: ${height}px; ` : '') +
			`z-index: ${z}; ` +
			`${style}`
	);

	function handlePointerDown(event: PointerEvent) {
		if (!draggable) return;
		if (event.button !== 0) return;
		if (onSelect) {
			onSelect();
		}
		startPointer = { x: event.clientX, y: event.clientY };
		startBox = { x: x, y: y };
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

		x = startBox.x + designDeltaX;
		y = startBox.y + designDeltaY;
	}

	function handlePointerUp() {
		window.removeEventListener('pointermove', handlePointerMove);
		window.removeEventListener('pointerup', handlePointerUp);
		if (totalMovement < 4 && togglableTransformGizmo) {
			showTransformGizmo = !showTransformGizmo;
		}
	}

	function fallbackMeasure(node: HTMLElement) {
        if (!isContentDriven || coordinateProjector) return;

        requestAnimationFrame(() => {
            const rect = node.getBoundingClientRect();
            if (rect.width > 0) width = rect.width;
            if (rect.height > 0) height = rect.height;
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
	{#if showTransformGizmo}
		<TransformGizmo
			ondrag={(side, delta) => {
				const scaleDeltaX = delta / activeScaleX;
				const scaleDeltaY = delta / activeScaleY;
				if (side === 'left' || side === 'right') {
					x = x + scaleDeltaX;
				}
				if (side === 'top' || side === 'bottom') {
					y = y + scaleDeltaY;
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
		class="touch-none select-none {draggable ? 'cursor-move' : 'cursor-default'} {className}"
		onpointerdown={handlePointerDown}
		ondragstart={(e) => e.preventDefault()}
		{...restProps}
	>
		{@render innerContent()}
	</ProjectedFrame>
{:else}
	<div
		use:fallbackMeasure
		class="touch-none select-none {draggable ? 'cursor-move' : 'cursor-default'} {className}"
		onpointerdown={handlePointerDown}
		ondragstart={(e) => e.preventDefault()}
		style={standardFallbackStyle}
		{...restProps}
	>
		{@render innerContent()}
	</div>
{/if}
