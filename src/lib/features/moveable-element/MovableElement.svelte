<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import { TransformGizmo } from '../canvas-2d';
	import type { MovableElementModel } from './MovableElementModel.svelte';

	type Props = {
		movableElement: MovableElementModel;
		scale?: number;
		onSelect?: () => void;
		togglableTransformGizmo?: boolean;
		class?: string;
		children?: Snippet;
	};

	let {
		movableElement,
		scale = 1,
		onSelect,
		togglableTransformGizmo = true,
		class: className = 'bg-cyan-950 border border-blue-500 text-white',
		children
	}: Props = $props();

	let startPointer = { x: 0, y: 0 };
	let startBox = { x: 0, y: 0 };
	let totalMovement = 0;

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

		const designDeltaX = physicalDeltaX / scale;
		const designDeltaY = physicalDeltaY / scale;

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

<div
	role="application"
	class="absolute touch-none select-none {movableElement.draggable
		? 'cursor-move'
		: 'cursor-default'} {className}"
	style="
    left: {movableElement.x}px; 
    top: {movableElement.y}px; 
    width: {movableElement.width}px; 
    height: {movableElement.height}px; 
    z-index: {movableElement.zIndex};
  "
	onpointerdown={handlePointerDown}
	ondragstart={(e) => e.preventDefault()}
>
	{#if movableElement.showTransformGizmo}
		<TransformGizmo
			ondrag={(side, delta) => {
				const scaleDelta = delta / scale;
				if (side === 'left' || side === 'right') {
					movableElement.x = movableElement.x + scaleDelta;
				}
				if (side === 'top' || side === 'bottom') {
					movableElement.y = movableElement.y + scaleDelta;
				}
			}}
		/>
	{/if}
	<div class="pointer-events-auto relative h-full w-full cursor-auto">
		{@render children?.()}
	</div>
</div>
