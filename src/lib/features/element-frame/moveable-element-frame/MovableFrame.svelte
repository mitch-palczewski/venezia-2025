<!--
@component

- An interactive, floating window that you can drag, and position anywhere on your digital workspace stage.

@Props 

```svelte
		movableElement: MovableElementModel;
		scaleOverride?: number;
		onSelect?: () => void;
		togglableTransformGizmo?: boolean;
		class?: string;
		children?: Snippet;
```

@example

```svelte
<MovableElement {movableElement}>
    <div>Your custom content, tool, or graphic goes here!</div>
</MovableElement>
```
-->
<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import type { MovableElementFrameModel } from './MovableFrameModel.svelte';
	import TransformGizmo from './transform-gizmo/TransformGizmo.svelte';
	import type { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
	import { ProjectedFrameModel } from '../projected-element-frame/projectedElementFrameModel.svelte';
	import ElementFrame from '../Frame.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		movableElementFrameModel: MovableElementFrameModel;
		scaleOverride?: number | undefined;
		onSelect?: () => void;
		togglableTransformGizmo?: boolean;
		projector?: CoordinateProjector;
	};

	let {
		movableElementFrameModel: movableElement,
		scaleOverride,
		onSelect,
		togglableTransformGizmo = true,
		projector,
		class: className = 'bg-cyan-950 border border-blue-500 text-white',
		children,
		...restProps
	}: Props = $props();

	let startPointer = { x: 0, y: 0 };
	let startBox = { x: 0, y: 0 };
	let totalMovement = 0;

	const stageContext = getContext<{ current: number }>('canvas-stage-scale');
	const activeScaleX = $derived(projector?.scaleX ?? scaleOverride ?? stageContext?.current ?? 1);
	const activeScaleY = $derived(projector?.scaleY ?? scaleOverride ?? stageContext?.current ?? 1);

	const projectorModel = $derived.by(() => {
		if (projector)
			return new ProjectedFrameModel(
				{
					x: movableElement.x,
					y: movableElement.y,
					pixelWidth: movableElement.width,
					pixelHeight: movableElement.height,
					zIndex: movableElement.zIndex
				},
				projector
			);
	});

	function handlePointerDown(event: PointerEvent) {
		if (!movableElement.draggable) return;
		if (event.button !== 0) return;
		if (onSelect) {
			onSelect();
		}
		startPointer = { x: event.clientX, y: event.clientY };
		startBox = { x: movableElement.x, y: movableElement.y };
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

		movableElement.x = startBox.x + designDeltaX;
		movableElement.y = startBox.y + designDeltaY;
	}

	function handlePointerUp() {
		window.removeEventListener('pointermove', handlePointerMove);
		window.removeEventListener('pointerup', handlePointerUp);
		if (totalMovement < 4 && togglableTransformGizmo) {
			movableElement.showTransformGizmo = !movableElement.showTransformGizmo;
		}
	}

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerup', handlePointerUp);
		}
	});
</script>

{#snippet innerContent()}
	{#if movableElement.showTransformGizmo}
		<TransformGizmo
			ondrag={(side, delta) => {
				const scaleDeltaX = delta / activeScaleX;
				const scaleDeltaY = delta / activeScaleY;
				if (side === 'left' || side === 'right') {
					movableElement.x = movableElement.x + scaleDeltaX;
				}
				if (side === 'top' || side === 'bottom') {
					movableElement.y = movableElement.y + scaleDeltaY;
				}
			}}
		/>
	{/if}
	<div class="pointer-events-auto relative h-full w-full cursor-auto">
		{@render children?.()}
	</div>
{/snippet}

<ElementFrame
	{projectorModel}
	class="touch-none select-none {movableElement.draggable
		? 'cursor-move'
		: 'cursor-default'} {className}"
	onpointerdown={handlePointerDown}
	ondragstart={(e) => e.preventDefault()}
	{...restProps}
>
	{@render innerContent()}
</ElementFrame>
