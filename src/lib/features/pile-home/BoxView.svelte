<script lang="ts">
  interface Props {
    depth?: number;
    resolution?: number; 
    backImg?: string; 
    leftImg?: string;
    rightImg?: string;
    topImg?: string;
    bottomImg?: string;
  }

  // Set default values for props using Svelte 5 runes
  let { 
    depth = 3, 
    resolution = 300, 
    backImg= '',
    leftImg='',
    rightImg='',
    topImg='',
    bottomImg=''

  }: Props = $props();

  const gridCells = Array.from({ length: 110 }, (_, i) => i);
  const getBgStyle = (url: string | undefined) => url ? `background-image: url('${url}');` : '';
</script>

<div 
  class="relative w-screen h-screen bg-neutral-800 overflow-hidden flex items-center justify-center -z-100"
  style={`perspective: ${resolution * depth}px;`}
>
  <div 
    class="relative w-full h-full"
    style="transform-style: preserve-3d;"
  >
    
    <div 
      class="absolute top-0 left-0 h-full bg-neutral-850 border-r border-neutral-700/50"
      style={`
        width: ${resolution}px; 
        transform-origin: left center; 
        transform: rotateY(90deg);
        ${getBgStyle(leftImg)}
      `}
    ></div>

    <div 
      class="absolute top-0 right-0 h-full bg-neutral-800 border-l border-neutral-700/50"
      style={`
        width: ${resolution}px; 
        transform-origin: right center; 
        transform: rotateY(-90deg);
        ${getBgStyle(rightImg)}
      `}
    ></div>

    <div 
      class="absolute top-0 left-0 w-full bg-neutral-950 border-b border-neutral-700/50"
      style={`
        height: ${resolution}px; 
        transform-origin: center top; 
        transform: rotateX(-90deg);
        ${getBgStyle(topImg)}
      `}
    ></div>

    <div 
      class="absolute bottom-0 left-0 w-full bg-neutral-700 border-t border-neutral-700/50"
      style={`
        height: ${resolution}px; 
        transform-origin: center bottom; 
        transform: rotateX(90deg);
        ${getBgStyle(bottomImg)}
      `}
    ></div>

    <div 
      class="absolute inset-0 grid grid-cols-11 grid-rows-11 bg-neutral-900 bg-cover bg-center bg-no-repeat"
      style={`
        transform: translateZ(-${resolution}px);
        ${getBgStyle(backImg)}
      `}
    >
      {#each gridCells as cell (cell)}
        <div class="flex justify-center items-center border border-neutral-800/40 text-neutral-600 text-xs select-none">
         
        </div>
      {/each}
    </div>

  </div>
</div>

