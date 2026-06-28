<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import type { ContainerModel } from './containerModel.svelte';
	import { TransformGizmo } from '..';
	import type { CanvasScaler } from '$lib/core/viewport/canvasScaler.svelte';

	type Props = {
		container: ContainerModel;
		scaler?: CanvasScaler
		onSelect?: () => void;
		togglableTransformGizmo?: boolean;
		class?: string;
		children?: Snippet;
	};

	let {
		container,
		onSelect,
		scaler,
		togglableTransformGizmo = true,
		class: className = 'bg-cyan-950 border border-blue-500 text-white',
		children
	}: Props = $props();

	const currentScale = $derived(scaler?.scale ?? 1);
	let startPointer = { x: 0, y: 0 };
	let startBox = { x: 0, y: 0 };
	let totalMovement = 0;

	function handlePointerDown(event: PointerEvent) {
		if (!container.draggable) return;
		if (event.button !== 0) return;
		if (onSelect) {
			onSelect();
		}
		startPointer = { x: event.clientX, y: event.clientY };
		startBox = { x: container.x, y: container.y };
		totalMovement = 0;

		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp);
	}

	function handlePointerMove(event: PointerEvent) {
        const physicalDeltaX = event.clientX - startPointer.x;
        const physicalDeltaY = event.clientY - startPointer.y;

        totalMovement = Math.abs(physicalDeltaX) + Math.abs(physicalDeltaY);

		
        const designDeltaX = physicalDeltaX / currentScale;
        const designDeltaY = physicalDeltaY / currentScale;

        container.x = startBox.x + designDeltaX;
        container.y = startBox.y + designDeltaY;
    }

	function handlePointerUp() {
		window.removeEventListener('pointermove', handlePointerMove);
		window.removeEventListener('pointerup', handlePointerUp);
		if (totalMovement < 4 && togglableTransformGizmo) {
			container.showTransformGizmo = !container.showTransformGizmo;
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
	class="absolute touch-none select-none {container.draggable
		? 'cursor-move'
		: 'cursor-default'} {className}"
	style="
    left: {container.x}px; 
    top: {container.y}px; 
    width: {container.width}px; 
    height: {container.height}px; 
    z-index: {container.zIndex};
  "
	onpointerdown={handlePointerDown}
	ondragstart={(e) => e.preventDefault()} 
>
	{#if container.showTransformGizmo}
		<TransformGizmo
			ondrag={(side, delta) => {
				const scaleDelta = delta / currentScale
				if (side === 'left' || side === 'right') {
					container.x = container.x + scaleDelta;
				}
				if (side === 'top' || side === 'bottom') {
					container.y = container.y + scaleDelta;
				}
			}}
		/>
	{/if}
	<div class="pointer-events-auto relative h-full w-full cursor-auto">
		{@render children?.()}
	</div>
</div>
