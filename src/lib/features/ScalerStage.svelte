<script lang="ts">
	import type { CanvasScaler } from '$lib/core/viewport/canvasScaler.svelte';
    import { setContext, type Snippet } from 'svelte';

    interface Props {
        scaler: CanvasScaler;
        children?: Snippet;
    }

    let { scaler, children }: Props = $props();

    setContext('canvas-stage-scale', {
        get current() { return scaler.scale; }
    });
</script>

<div 
    class="absolute origin-top-left "
    style="
        width: {scaler.referenceWidth}px; 
        height: {scaler.referenceHeight}px;
        transform: scale({scaler.scale});
    "
>
    {#if children}
        {@render children()}
    {/if}
</div>