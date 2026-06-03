<script lang="ts">
	import type { Snippet } from 'svelte';
    import { fly } from 'svelte/transition';

    interface Props {
        children: Snippet;
        onClose: () => void;
    }

    let { children, onClose }: Props = $props();
</script>

<div
    transition:fly={{ y: 50, duration: 400 }}
    class="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 
           flex items-center gap-4 rounded-xl bg-neutral-900/90 px-5 py-3 text-sm text-white 
           shadow-xl backdrop-blur-md border border-neutral-800 max-w-[90vw] md:max-w-md"
>
    <div class="flex-1 text-neutral-200">
        {@render children()}
    </div>
    
    <button
        onclick={onClose}
        class="rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        aria-label="Dismiss"
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</div>