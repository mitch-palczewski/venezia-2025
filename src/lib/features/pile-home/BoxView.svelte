<script lang="ts">
  interface Props {
    depth?: number; // How "deep" the box feels in pixels
  }

  let { depth = 300 }: Props = $props();

  const gridCells = Array.from({ length: 100 }, (_, i) => i);
</script>

<div 
  class="relative w-screen h-screen bg-neutral-950 overflow-hidden flex items-center justify-center -z-100"
  style="perspective: {depth * 2}px;"
>
  <div 
    class="relative w-full h-full"
    style="transform-style: preserve-3d;"
  >
    
    <div 
      class="absolute top-0 left-0 h-full bg-neutral-900 border-r border-neutral-700/50"
      style="
        width: {depth}px; 
        transform-origin: left center; 
        transform: rotateY(90deg);
      "
    ></div>

    <div 
      class="absolute top-0 right-0 h-full bg-neutral-900 border-l border-neutral-700/50"
      style="
        width: {depth}px; 
        transform-origin: right center; 
        transform: rotateY(-90deg);
      "
    ></div>

    <div 
      class="absolute top-0 left-0 w-full bg-neutral-850 border-b border-neutral-700/50"
      style="
        height: {depth}px; 
        transform-origin: center top; 
        transform: rotateX(-90deg);
      "
    ></div>

    <div 
      class="absolute bottom-0 left-0 w-full bg-neutral-800 border-t border-neutral-700/50"
      style="
        height: {depth}px; 
        transform-origin: center bottom; 
        transform: rotateX(90deg);
      "
    ></div>

    <div 
      class="absolute inset-0 grid grid-cols-10 grid-rows-10 bg-neutral-900"
      style="transform: translateZ(-{depth}px);"
    >
      {#each gridCells as cell (cell)}
        <div class="flex justify-center items-center border border-neutral-800/50 text-neutral-600 text-xs select-none">
         
        </div>
      {/each}
    </div>

  </div>
</div>