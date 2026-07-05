<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ProjectedElementFrameModel } from './projected-element-frame/projectedElementFrameModel.svelte';
	import ProjectedElement from './projected-element-frame/ProjectedElementFrame.svelte';
	import type { MovableElementFrameModel } from './moveable-element-frame/MovableElementFrameModel.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		projectorModel?: ProjectedElementFrameModel;
		movableElementFrameModel?: MovableElementFrameModel;
	}

	let {
		projectorModel,
		movableElementFrameModel,
		children,
		class: className = '',
		style = '',
		...restProps
	}: Props = $props();
</script>

{#snippet movableElement()}
	<div
		role="application"
		class="absolute touch-none select-none {className}"
		style="{projectorModel?.physicalBoundsStyle}; {style}"
		{...restProps}
	>
		{@render children?.()}
	</div>
{/snippet}


{#if projectorModel && projectorModel.projector}
	<ProjectedElement model={projectorModel} class={className} {...restProps}>
		{@render children?.()}
	</ProjectedElement>
{:else if movableElementFrameModel}
	{@render movableElement()}
{:else}
	<div class={className} {style} {...restProps}>
		{@render children?.()}
	</div>
{/if}
