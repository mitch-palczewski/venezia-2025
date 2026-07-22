<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { ProjectedFrameModel } from './projected-frame/projectedFrameModel.svelte';
	import ProjectedElement from './projected-frame/ProjectedFrame.svelte';
	import { getContext } from 'svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		projectorModel?: ProjectedFrameModel;
	}

	let {
		projectorModel,
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
