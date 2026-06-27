<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import type { ContainerModel } from './containerModel.svelte';
	import { TransformGizmo } from '..';

	type Props = {
		container: ContainerModel;
		onSelect?: () => void;
		togglableTransformGizmo?: boolean;
		class?: string;
		children?: Snippet;
	};

	let {
		container,
		onSelect,
		togglableTransformGizmo = true,
		class: className = 'bg-cyan-950 border border-blue-500 text-white',
		children
	}: Props = $props();

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
		const deltaX = event.clientX - startPointer.x;
		const deltaY = event.clientY - startPointer.y;

		totalMovement = Math.abs(deltaX) + Math.abs(deltaY);

		container.x = startBox.x + deltaX;
		container.y = startBox.y + deltaY;
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
				if (side === 'left' || side === 'right') {
					container.x = container.x + delta;
				}
				if (side === 'top' || side === 'bottom') {
					container.y = container.y + delta;
				}
			}}
		/>
	{/if}
	<div class="pointer-events-auto relative h-full w-full cursor-auto">
		{@render children?.()}
	</div>
</div>
