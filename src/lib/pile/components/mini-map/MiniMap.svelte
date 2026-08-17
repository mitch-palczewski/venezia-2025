<script lang="ts">
    import type { UiState } from '$lib/pile/util/ui/uiState.svelte';
    import type { PileDatabaseObj } from '../../util/api/pileDatabase';
    import MapObj from './MapObj.svelte';

    type Props = {
        pileObjects: PileDatabaseObj[];
        uiState: UiState;
        width?: number; // Kept so parent component doesn't throw errors
        height?: number; // Kept so parent component doesn't throw errors
    };

    let { pileObjects, uiState, width = 500, height = 500 }: Props = $props();

    let scale = $state(0.3);
    const scaleStep = 0.005;
    function incrementScale() {
        scale += scaleStep;
    }
    function decrementScale() {
        scale -= scaleStep;
    }

    let camX = $state(0);
    let camZ = $state(0);
    let camAngle = $state(0); 
    let hasCamera = $state(false);

    // 1. Single derived string for the infinite canvas transform
    let mapTransform = $derived(`rotate(${-camAngle}rad) translate(${-camX * scale}px, ${-camZ * scale}px)`);

    $effect(() => {
        let frameId: number;

        const updateCameraPosition = () => {
            const cam = uiState.app?.cameraRef;
            if (cam) {
                hasCamera = true;
                camX = cam.position.x;
                camZ = cam.position.z;

                cam.updateMatrixWorld();
                const e = cam.matrixWorld.elements;

                const dirX = -e[8];
                const dirZ = -e[10];

                camAngle = Math.atan2(dirX, -dirZ);
            } else {
                hasCamera = false;
            }

            frameId = requestAnimationFrame(updateCameraPosition);
        };

        frameId = requestAnimationFrame(updateCameraPosition);

        return () => {
            cancelAnimationFrame(frameId);
        };
    });

    $effect(() => {
    if (pileObjects.length > 0) {
        console.log("First Object Raw:", pileObjects[0].pos_x, pileObjects[0].pos_z);
        console.log("First Object Scaled:", pileObjects[0].pos_x * scale, pileObjects[0].pos_z * scale);
    }
});
</script>

{#if uiState.showMiniMap && !uiState.app?.state.showTransformControls}
    <div
        class="dock-nw m-3 mt-13 aspect-square w-[60dvh] overflow-hidden border-2 border-slate-400 bg-slate-800 text-white relative"
    >
        <div class="absolute top-3 right-3 z-10">
            <button
                onclick={incrementScale}
                class="bg-neutral-700/50 px-2 text-lg hover:bg-neutral-200/50">+</button
            >
            <button
                onclick={decrementScale}
                class="bg-neutral-700/50 px-2 text-lg hover:bg-neutral-200/50">-</button
            >
        </div>

        <!-- 2. The Infinite Canvas Anchor -->
        <!-- Locked to center (left-1/2 top-1/2), size 0x0 (w-0 h-0), using standard style="" -->
        <div
            class="absolute left-1/2 top-1/2 w-0 h-0 overflow-visible"
            style="transform: {mapTransform};"
        >
        <div class="absolute -ml-2 -mt-2 h-4 w-4 bg-cyan-600 z-50"></div>
            {#each pileObjects as obj}
                <!-- 3. Objects placed directly at scaled coordinates (Removed `+ width/2` and `+ height/2`) -->
                <MapObj
                    x={obj.pos_x * scale}
                    y={obj.pos_z * scale}
                    radius={obj.scale_x * scale}
                    imageSrc={uiState.app?.modelInventory.get(obj.name)?.preview}
                    
                />
            {/each}
        </div>

        {#if hasCamera}
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" class="fill-sky-400 drop-shadow-md filter">
                    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                </svg>
            </div>
        {/if}
    </div>
{/if}