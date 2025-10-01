<script lang="ts">
  import CanvasPortalTarget from "$lib/components/CanvasPortalTarget.svelte";
  import { Canvas } from "@threlte/core";
	import {onMount, type  Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

</script>

<div >
    <Canvas>
        <CanvasPortalTarget />
    </Canvas>
</div>

{@render children?.()}

<style>
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>