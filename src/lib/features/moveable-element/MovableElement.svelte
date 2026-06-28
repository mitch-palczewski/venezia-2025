<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import { TransformGizmo } from '../canvas-2d';
	import type { MovableElementModel } from './MovableElementModel.svelte';

	type Props = {
		moveableElement: MovableElementModel;
		onSelect?: () => void;
		togglableTransformGizmo?: boolean;
		class?: string;
		children?: Snippet;
	};

	let {
		moveableElement,
		onSelect,
		togglableTransformGizmo = true,
		class: className = 'bg-cyan-950 border border-blue-500 text-white',
		children
	}: Props = $props();

	let startPointer = { x: 0, y: 0 };
	let startBox = { x: 0, y: 0 };
	let totalMovement = 0;

	function handlePointerDown(event: PointerEvent) {
		if (!moveableElement.draggable) return;
		if (event.button !== 0) return;
		if (onSelect) {
			onSelect();
		}
		startPointer = { x: event.clientX, y: event.clientY };
		startBox = { x: moveableElement.x, y: moveableElement.y };
		totalMovement = 0;

		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp);
	}

	function handlePointerMove(event: PointerEvent) {
        const physicalDeltaX = event.clientX - startPointer.x;
        const physicalDeltaY = event.clientY - startPointer.y;

        totalMovement = Math.abs(physicalDeltaX) + Math.abs(physicalDeltaY);

		
        const designDeltaX = physicalDeltaX / moveableElement.scale;
        const designDeltaY = physicalDeltaY / moveableElement.scale;

        moveableElement.x = startBox.x + designDeltaX;
        moveableElement.y = startBox.y + designDeltaY;
    }

	function handlePointerUp() {
		window.removeEventListener('pointermove', handlePointerMove);
		window.removeEventListener('pointerup', handlePointerUp);
		if (totalMovement < 4 && togglableTransformGizmo) {
			moveableElement.showTransformGizmo = !moveableElement.showTransformGizmo;
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
	class="absolute touch-none select-none {moveableElement.draggable
		? 'cursor-move'
		: 'cursor-default'} {className}"
	style="
    left: {moveableElement.x}px; 
    top: {moveableElement.y}px; 
    width: {moveableElement.width}px; 
    height: {moveableElement.height}px; 
    z-index: {moveableElement.zIndex};
  "
	onpointerdown={handlePointerDown}
	ondragstart={(e) => e.preventDefault()} 
>
	{#if moveableElement.showTransformGizmo}
		<TransformGizmo
			ondrag={(side, delta) => {
				const scaleDelta = delta / moveableElement.scale
				if (side === 'left' || side === 'right') {
					moveableElement.x = moveableElement.x + scaleDelta;
				}
				if (side === 'top' || side === 'bottom') {
					moveableElement.y = moveableElement.y + scaleDelta;
				}
			}}
		/>
	{/if}
	<div class="pointer-events-auto relative h-full w-full cursor-auto">
		{@render children?.()}
	</div>
</div>
