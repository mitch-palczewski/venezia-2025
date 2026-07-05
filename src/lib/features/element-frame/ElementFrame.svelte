<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ProjectedElementFrameModel } from './projected-element-frame/projectedElementFrameModel.svelte';
	import ProjectedElement from './projected-element-frame/ProjectedElementFrame.svelte';
	import type { MovableElementFrameModel } from './moveable-element-frame/MovableElementFrameModel.svelte';
	import { getContext } from 'svelte';

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

	const stageContext = getContext<{ current: number }>('canvas-stage-scale');
	const currentScale = $derived(stageContext?.current ?? 1);

	$effect(() => {
        if (projectorModel) {
            projectorModel.scale = currentScale;
        }
    });
</script>



{#if projectorModel}
	<ProjectedElement model={projectorModel} class={className} {...restProps}>
		{@render children?.()}
	</ProjectedElement>
{:else}
	<div class={className} style="transform: scale({currentScale}); {style}" {...restProps}>
		{@render children?.()}
	</div>
{/if}
