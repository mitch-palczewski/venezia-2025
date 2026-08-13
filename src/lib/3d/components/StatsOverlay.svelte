<script lang="ts">
  import { useTask } from '@threlte/core';
  import { onMount, onDestroy } from 'svelte';
  import Stats from 'three/addons/libs/stats.module.js';

  interface Props {
    /** 0: FPS, 1: Frame Time (ms), 2: Memory (MB) */
    showPanel?: 0 | 1 | 2;
    /** Position on screen */
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  }

  let { showPanel = 0, position = 'top-left' }: Props = $props();

  let stats: Stats | null = null;

  onMount(() => {
    stats = new Stats();
    stats.showPanel(showPanel);

    // Apply positioning styles to the DOM node
    const dom = stats.dom;
    dom.style.position = 'fixed';
    dom.style.zIndex = '9999';

    if (position.includes('top')) dom.style.top = '0px';
    if (position.includes('bottom')) dom.style.bottom = '0px';
    if (position.includes('left')) dom.style.left = '0px';
    if (position.includes('right')) dom.style.right = '0px';

    document.body.appendChild(dom);
  });

  onDestroy(() => {
    if (stats?.dom) {
      stats.dom.remove();
    }
  });

  // Ticks stats.update() automatically every frame in the Threlte render task
  useTask(() => {
    stats?.update();
  });
</script>