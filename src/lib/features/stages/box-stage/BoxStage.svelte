<script lang="ts">
    import Wall from './Wall.svelte';

    let depth = $state(800); 
    
    let rotateX = $state(-5); 
    let rotateY = $state(15); 
</script>

<div class="viewport">
    <div 
        class="camera" 
        style="transform: translateZ(-200px) rotateX({rotateX}deg) rotateY({rotateY}deg);"
    >
        <!-- BACK WALL -->
        <Wall 
            side="back" 
            depth={depth} 
            img="https://picsum.photos/id/1018/800/800" 
        />

        <!-- SIDE WALLS -->
        <Wall 
            side="left" 
            depth={depth} 
            img="https://picsum.photos/id/1015/800/800" 
        />
        <Wall 
            side="right" 
            depth={depth} 
            img="https://picsum.photos/id/1016/800/800" 
        />

        <!-- CEILING -->
        <Wall 
            side="top" 
            depth={depth} 
            img="https://picsum.photos/id/1019/800/800" 
        />

        <!-- SLICED FLOOR -->
        <!-- Demonstrating Svelte 5 snippet passing sliceIndex for custom elements -->
        <Wall 
            side="bottom" 
            depth={depth} 
            slices={10} 
            img="https://picsum.photos/id/1021/800/800"
        >
            {#snippet children({ sliceIndex })}
                <div class="slice-overlay">
                    <!-- You can render lights, shadows, or track-markers per slice -->
                    <span>Row {sliceIndex}</span>
                </div>
            {/snippet}
        </Wall>
    </div>
</div>

<style>
    /* 1. THE VIEWPORT: This functions as the lens of your camera */
    .viewport {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: #0d0d0d;
        
        /* Perspective is critical. 
           Lower numbers = wide-angle lens (distortion)
           Higher numbers = telephoto lens (flat) */
        perspective: 1000px; 
        perspective-origin: center center;
    }

    .camera {
        position: relative;
        width: 100%;
        height: 100%;
        
        transform-style: preserve-3d;
        
        transition: transform 0.1s ease-out;
    }

    /* Styling for the snippets inside the sliced floors */
    .slice-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: monospace;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.15);
        pointer-events: none;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }
</style>