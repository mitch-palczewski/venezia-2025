<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
	import BurntBoyAscii from '$lib/assets/ascii-art/BurntBoyAscii.svelte';
	import BullAscii from '$lib/assets/ascii-art/BullAscii.svelte';
	import ArchwayMultipleAscii from '$lib/assets/ascii-art/ArchwayMultipleAscii.svelte';
	import ZardozAscii from '$lib/assets/ascii-art/ZardozAscii.svelte';
	import PileTitleAscii from '$lib/assets/ascii-art/PileTitleAscii.svelte';


  const slides = [BullAscii, BurntBoyAscii, ArchwayMultipleAscii, ZardozAscii];
  let currentIndex = $state(1);
  let lastIndex = $state(0)
  let showing = $state(true)
  const ActiveComponent = $derived(slides[currentIndex]);
  const LastActive = $derived(slides[lastIndex])

  onMount(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      lastIndex = (lastIndex + 1) % slides.length
    }, 2000); 

 

    return () => {
      clearInterval(interval);
    };
  });
</script>

{#if showing}
  <div class="relative h-[95vh] font-mono font-bold overflow-hidden ">
  {#key currentIndex}
    <div 
     
      
      class="flex flex-row items-start justify-center gap-8 w-full  bg-linear-to-r from-cyan-800 to-fuchsia-500 bg-clip-text pl-25 text-transparent text-bold overflow-hidden "
    >
        <pre>
        
        <ActiveComponent/>
        </pre>
        <pre>
            <LastActive/>
          
        </pre>
      
    </div>
  {/key}
</div>  
{/if}

