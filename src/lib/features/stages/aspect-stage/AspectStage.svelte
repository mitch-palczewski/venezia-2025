<script lang="ts">
    import type { Snippet } from 'svelte';
	import type { AspectStageModel } from './aspectStageModel.svelte';

    interface Props {
        model: AspectStageModel;
        clipContent?: boolean; 
        class?: string;
        children?: Snippet;
    }

    let {
        model: model,
        clipContent = false, 
        class: className = 'bg-slate-900 border border-slate-800 shadow-2xl',
        children
    }: Props = $props();
</script>

<div
    class="absolute pointer-events-auto {className} {clipContent ? 'overflow-hidden' : 'overflow-visible'}"
    style="
        left: {model.offsetX}px; 
        top: {model.offsetY}px; 
        width: {model.width}px; 
        height: {model.height}px;
    "
>
    {#if children}
        {@render children()}
    {/if}
</div>