<!--
@component

- A interactive, floating window that you can drag, and position anywhere on your digital workspace stage.

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
	import { getContext, onDestroy, type Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import type { MovableElementModel } from './MovableElementModel.svelte';
	import TransformGizmo from './transform-gizmo/TransformGizmo.svelte';
	import type { CoordinateProjector } from '$lib/core/viewport/coordinateProjector.svelte';
	import ProjectedElement from '../projected-element/ProjectedElement.svelte';
	import { ProjectedElementModel } from '../projected-element/projectedElementModel.svelte';

	type Props = {
		movableElement: MovableElementModel;
		scaleOverride?: number | undefined;
		onSelect?: () => void;
		togglableTransformGizmo?: boolean;
		projector?: CoordinateProjector;
		class?: string;
		children?: Snippet;
	};

	let {
		movableElement,
		scaleOverride,
		onSelect,
		togglableTransformGizmo = true,
		projector,
		class: className = 'bg-cyan-950 border border-blue-500 text-white',
		children
	}: Props = $props();

	let startPointer = { x: 0, y: 0 };
	let startBox = { x: 0, y: 0 };
	let totalMovement = 0;

	const stageContext = getContext<{ current: number }>('canvas-stage-scale');    
    const scale = $derived( scaleOverride ?? stageContext?.current ?? 1);
	const activeScaleX = $derived(projector?.scaleX ?? scaleOverride ?? stageContext?.current ?? 1);
    const activeScaleY = $derived(projector?.scaleY ?? scaleOverride ?? stageContext?.current ?? 1);

	const projectorModel = $derived.by(() => {
        return new ProjectedElementModel({
            x: movableElement.x,
            y: movableElement.y,
            width: movableElement.width,
            height: movableElement.height,
            zIndex: movableElement.zIndex,
        }, projector);
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

{#if projector}
    <ProjectedElement
        model = {projectorModel}
        class="touch-none select-none {movableElement.draggable ? 'cursor-move' : 'cursor-default'} {className}"
        onpointerdown={handlePointerDown}
        ondragstart={(e) => e.preventDefault()}
    >
        {@render innerContent()}
    </ProjectedElement>
{:else}
    <div
        role="application"
        class="absolute touch-none select-none {movableElement.draggable ? 'cursor-move' : 'cursor-default'} {className}"
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
        {@render innerContent()}
    </div>
{/if}
