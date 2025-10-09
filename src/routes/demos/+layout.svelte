<script lang="ts">
  import CanvasPortalTarget from "$lib/components/3d-core/CanvasPortalTarget.svelte";
  import { Canvas } from "@threlte/core";
	import {onMount, type  Snippet } from 'svelte';
  //add data
  let { children }: { children: Snippet } = $props();

</script>

<div class="m-0 ">
    <Canvas>
        <CanvasPortalTarget />
    </Canvas>
</div>

{@render children?.()}

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>