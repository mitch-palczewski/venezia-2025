<script lang="ts">
    import type { Snippet } from 'svelte';
	import type { AspectStageModel } from './aspectStageModel.svelte';

    interface Props {
        stage: AspectStageModel;
        clipContent?: boolean; 
        class?: string;
        children?: Snippet;
    }

    let {
        stage,
        clipContent = true, 
        class: className = 'bg-slate-900 border border-slate-800 shadow-2xl',
        children
    }: Props = $props();
</script>

<div
    class="absolute pointer-events-auto {className} {clipContent ? 'overflow-hidden' : 'overflow-visible'}"
    style="
        left: {stage.x}px; 
        top: {stage.y}px; 
        width: {stage.width}px; 
        height: {stage.height}px;
    "
>
    {#if children}
        {@render children()}
    {/if}
</div>