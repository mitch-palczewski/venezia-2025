<script lang="ts">
  import { T } from '@threlte/core';
  import { MeshStandardMaterial } from 'three';
  import type { ComponentProps } from 'svelte';

  type Props = ComponentProps<typeof T.Group> & {
    colors?: string[];
  };

  let {
    userData,
    colors = ['#fcba03', '#ff5722', '#4caf50', '#2196f3', '#9c27b0', '#e91e63'],
    ...rest
  }: Props = $props();

  // Re-creates materials reactively whenever the `colors` prop changes
  let materials = $derived(
    colors.map((color) => new MeshStandardMaterial({ color, roughness: 0.8 }))
  );
</script>

<T.Group 
  userData={{ interactionType: 'grab', ...userData }} 
  {...rest}
>
  <T.Mesh name="pivot" castShadow material={materials}>
    <T.BoxGeometry args={[2, 1, 0.5]} />
  </T.Mesh>
</T.Group>