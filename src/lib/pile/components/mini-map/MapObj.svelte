<!-- MapObj.svelte -->
<script lang="ts">
  interface Props {
    x: number;
    y: number;
    radius: number;
    borderColor?: string; 
    borderWidth?: number;
    /** URL or path to the center icon image (e.g., "/icons/gargoyle.png") */
    imageSrc?: string;
    /** Optional custom size for the center icon. Defaults to 80% of the radius. */
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

  // 1. Determine the size of the icon dynamically
  let imgSize = $derived(imageSize ?? radius * 0.8);

  // 2. Calculate top-left coordinates so the image is perfectly centered on (x, y)
  let imgX = $derived(x - imgSize / 2);
  let imgY = $derived(y - imgSize / 2);

  // 3. Offset the radius line so it doesn't draw underneath/clash with the icon
  let lineStartX = $derived(imageSrc ? x + imgSize / 2 : x);
</script>

<svg class="absolute inset-0 pointer-events-none h-full w-full">
  <!-- The outer boundary circle -->
  <circle 
    cx={x} 
    cy={y} 
    r={radius} 
    class="fill-none {borderColor}" 
    stroke-width={borderWidth}
  />

  <!-- 
    The Radius Line. 
    If there is an image, the line starts from the edge of the image 
    instead of the center, keeping the look incredibly clean!
  -->
  <line 
    x1={lineStartX} 
    y1={y} 
    x2={x + radius} 
    y2={y} 
    class={borderColor} 
    stroke-width={borderWidth} 
  />

  {#if imageSrc}
    <!-- Centered Custom Image -->
    <image 
      href={imageSrc} 
      x={imgX} 
      y={imgY} 
      width={imgSize} 
      height={imgSize} 
      preserveAspectRatio="xMidYMid meet"
    />
  {:else}
    <!-- Fallback Center Dot (if no image is provided) -->
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