<script lang="ts">
	import ZardozAscii from '$lib/assets/ascii-art/ZardozAscii.svelte';
	import BullAscii from '$lib/assets/ascii-art/BullAscii.svelte';
	import BurntBoyAscii from '$lib/assets/ascii-art/BurntBoyAscii.svelte';
	import ArchwayMultipleAscii from '$lib/assets/ascii-art/ArchwayMultipleAscii.svelte';

   const slides = [BullAscii, BurntBoyAscii, ArchwayMultipleAscii, ZardozAscii];
   const index1 = Math.floor(Math.random() * slides.length)
   const RanOne = slides.splice(index1, 1)[0]
      const index2 = Math.floor(Math.random() * slides.length)

    const RanTwo = slides[index2]


</script>

<div class="flex flex-row items-start justify-center gap-8 w-full h-screen bg-linear-to-r from-black to-blue-950 p-10 overflow-hidden">
  
  <pre class="bg-linear-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent font-bold font-mono">
    <RanOne/>
  </pre>

  <pre class="bg-linear-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent font-bold font-mono">
    <RanTwo/>
  </pre>
  
</div>