<script lang="ts">
    import { PileState } from '$lib/pile/util/pileState.svelte';

    let { pileState }: { pileState: PileState } = $props();

    // 1. Local state for the input field (The "Source of Truth" for the UI)
    let localScale = $state(1);
    let lastId = $state<string | null>(null);

    // 2. PULL: Update the UI when a NEW object is selected
    $effect(() => {
        const selectedObj = pileState.getSelectedObject();
        
        // Only reset the input if we actually changed which object is selected
        if (selectedObj && selectedObj.id !== lastId) {
            lastId = selectedObj.id;
            if (selectedObj.ref) {
                const scale = PileState.getObjScale(selectedObj.ref);
                // Set the UI to match the object's current scale
                localScale = (scale.x + scale.y + scale.z) / 3;
            }
        } else if (!selectedObj) {
            lastId = null;
        }
    });

    // 3. PUSH: Update the 3D Object when the input changes
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