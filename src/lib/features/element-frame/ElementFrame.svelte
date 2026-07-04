<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { MovableElementModel } from '../moveable-element/MovableElementFrameModel.svelte';
	import type { ProjectedElementFrameModel } from './projected-element-frame/projectedElementFrameModel.svelte';
	import ProjectedElement from './projected-element-frame/ProjectedElementFrame.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		projectorModel?: ProjectedElementFrameModel;
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
</script>

{#if projectorModel && projectorModel.projector}
	<ProjectedElement model={projectorModel} class={className} {...restProps}>
		{@render children?.()}
	</ProjectedElement>
{:else if movableElement}
	<div
		role="application"
		class="absolute touch-none select-none {className}"
		style="{projectorModel?.cssStyle}; {style}"
		{...restProps}
	>
		{@render children?.()}
	</div>
{:else}
	<div class={className} {style} {...restProps}>
		{@render children?.()}
	</div>
{/if}
