<script lang="ts">
    import { PileState } from '$lib/pile/util/pileState.svelte';

    let { pileState }: { pileState: PileState } = $props();
    let localScale = $state(1);
    let lastId = $state<string | null>(null);

    $effect(() => {
        const selectedObj = pileState.getSelectedObject();
        if (selectedObj ) {
            lastId = selectedObj.id;
            if (selectedObj.ref) {
                const scale = PileState.getObjScale(selectedObj.ref);
                const average = (scale.x + scale.y + scale.z) / 3;
                localScale = Math.round(average * 10000) / 10000;
            }
        } else if (!selectedObj) {
            lastId = null;
        }
    });

    function handleInput(e: Event) {
        const selectedObj = pileState.getSelectedObject();
        if (selectedObj?.ref) {
            PileState.setScale(selectedObj.ref, localScale);
        }
    }
</script>

<input 
    bind:value={localScale} 
    oninput={handleInput}
    type="number" 
    min="0.01" 
    step="0.1" 
/>