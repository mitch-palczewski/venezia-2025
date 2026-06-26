<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ContainerModel } from './containerModel.svelte';
	import TransformGizmo from './TransformGizmo.svelte';

	type Props = {
		container: ContainerModel;
        showTransformGizmo: boolean;
		onSelect: () => void;
		children?: Snippet;
	};
	let { container, showTransformGizmo, onSelect, children}: Props = $props();
</script>

<div class="absolute bg-slate-500 border"
	style="
    left: {container.x}px; 
    top: {container.y}px; 
    width: {container.width}px; 
    height: {container.height}px; 
    z-index: {container.zIndex};
  "
>
    {#if showTransformGizmo}
        <TransformGizmo/>
    {/if}
	<div class="relative w-full h-full">
        {@render children?.()}
    </div>
</div>
