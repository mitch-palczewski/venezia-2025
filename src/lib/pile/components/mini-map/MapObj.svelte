<!-- MapObj.svelte -->
<script lang="ts">
  interface Props {
    x: number;
    y: number;
    radius: number;
    borderColor?: string; 
    borderWidth?: number;
    imageSrc?: string;
    imageSize?: number;
  }

  let { 
    x, 
    y, 
    radius, 
    borderColor = 'stroke-dark-green', 
    borderWidth = 2,
    imageSrc,
    imageSize
  }: Props = $props();

  let imgSize = $derived(imageSize ?? radius * 0.8);
  let imgX = $derived(x - imgSize / 2);
  let imgY = $derived(y - imgSize / 2);
  let lineStartX = $derived(imageSrc ? x + imgSize / 2 : x);
</script>

<!-- 
  Fix: Instead of h-full w-full relative to a 0x0 container, 
  we position the SVG wrapper at (x, y) with a bounding box 
  large enough to hold the object and its radius line.
-->
<svg 
  class="absolute pointer-events-none overflow-visible"
  style="left: {x - radius - borderWidth}px; top: {y - radius - borderWidth}px; width: {(radius + borderWidth) * 2}px; height: {(radius + borderWidth) * 2}px;"
  viewBox="{x - radius - borderWidth} {y - radius - borderWidth} {(radius + borderWidth) * 2} {(radius + borderWidth) * 2}"
>
  <!-- The outer boundary circle -->
  <circle 
    cx={x} 
    cy={y} 
    r={radius} 
    class="fill-none {borderColor}" 
    stroke-width={borderWidth}
  />

  <!-- The Radius Line -->
  <line 
    x1={lineStartX} 
    y1={y} 
    x2={x + radius} 
    y2={y} 
    class={borderColor} 
    stroke-width={borderWidth} 
  />

  {#if imageSrc}
    <image 
      href={imageSrc} 
      x={imgX} 
      y={imgY} 
      width={imgSize} 
      height={imgSize} 
      preserveAspectRatio="xMidYMid meet"
    />
  {:else}
    <line 
      x1={x} 
      y1={y} 
      x2={x} 
      y2={y} 
      stroke-linecap="round" 
      stroke-width={borderWidth * 2.5} 
      class={borderColor} 
    />
  {/if}
</svg>