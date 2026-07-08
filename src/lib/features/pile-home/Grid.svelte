<script lang="ts">
  // Define the types for your props
  interface Props {
    width?: number;
    height?: number;
  }

  // Accept the typed props
  let { width, height }: Props = $props();
    
  const gridCells = Array.from({ length: 100 }, (_, i) => i);
</script>

<div 
  class="grid grid-cols-10 grid-rows-10 w-full h-full  pointer-events-none" 
>
  {#each gridCells as cell (cell)}
    <div class="bg-transparent flex justify-center border border-slate-400">
      
    </div>
  {/each}
</div>