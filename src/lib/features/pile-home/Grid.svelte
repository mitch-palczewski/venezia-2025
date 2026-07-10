<script lang="ts">
  // Define the types for your props
  interface Props {
    width?: number;
    height?: number;
  }

  // Accept the typed props
  let { width, height }: Props = $props();
    
  const gridCells = Array.from({ length: 121 }, (_, i) => i);
</script>

<div 
  class="grid grid-cols-11 grid-rows-11 w-full h-full  pointer-events-none" 
>
  {#each gridCells as cell (cell)}
    <div class="bg-transparent flex justify-center border border-r-slate-300/20 border-b-slate-300/30">
      
    </div>
  {/each}
</div>