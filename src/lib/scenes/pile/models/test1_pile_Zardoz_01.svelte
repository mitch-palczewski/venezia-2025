<script lang="ts">
    import Zardoz01 from "$lib/components/models/Zardoz_01/Zardoz_01.svelte";
    import { TransformControls } from "@threlte/extras";
    import { pileState } from "../pileState.svelte";

</script>


{#if pileState.selectedObject === "Zardoz01"}
    <TransformControls>
        <Zardoz01/>
    </TransformControls>
{:else}
    <Zardoz01/>

{/if}

