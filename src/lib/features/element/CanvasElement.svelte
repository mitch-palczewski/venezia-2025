<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { MovableElementModel } from '../moveable-element/MovableElementModel.svelte';
	import type { ProjectedElementModel } from '../projected-element/projectedElementModel.svelte';
	import ProjectedElement from '../projected-element/ProjectedElement.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		projectorModel?: ProjectedElementModel;
		movableElement?: MovableElementModel;
	}

	let {
		projectorModel,
		movableElement,
		children,
		class: className = '',
		style = '',
		...restProps
	}: Props = $props();

	const fallbackStyles = $derived(
		movableElement
			? `left: ${movableElement.x}px; top: ${movableElement.y}px; width: ${movableElement.width}px; height: ${movableElement.height}px; z-index: ${movableElement.zIndex}; ${style}`
			: style
	);
</script>

{#if projectorModel && projectorModel.projector}
	<ProjectedElement model={projectorModel} class={className} {style} {...restProps}>
		{@render children?.()}
	</ProjectedElement>
{:else if movableElement}
	<div role="application" class="absolute {className}" style={fallbackStyles} {...restProps}>
		{@render children?.()}
	</div>
{:else}
	<div class={className} {style} {...restProps}>
		{@render children?.()}
	</div>
{/if}
