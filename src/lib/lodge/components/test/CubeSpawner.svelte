<script lang="ts">
  import { T } from '@threlte/core';
  import TestCube from './TestCube.svelte';
  import type { ComponentProps } from 'svelte';

  type Props = ComponentProps<typeof T.Group> & {
    /** Maximum number of active cubes allowed */
    maxCubes?: number;
  };

  let { maxCubes = 10, position = [0, 0, 0], userData, ...rest }: Props = $props();

  // 1. Svelte 5 reactive array tracking active instances
  let spawnedCubes = $state<{ id: number; pos: [number, number, number] }[]>([]);
  let idCounter = 0;

  function spawnCube() {
    if (spawnedCubes.length >= maxCubes) return;

    // Convert string/array positions into numbers safely
    const posX = Array.isArray(position) ? position[0] : 0;
    const posY = Array.isArray(position) ? position[1] : 0;
    const posZ = Array.isArray(position) ? position[2] : 0;

    // Spawn point slightly above the spawner pedestal with slight random offset
    const spawnPos: [number, number, number] = [
      posX + (Math.random() - 0.5) * 0.2,
      posY + 2,
      posZ + (Math.random() - 0.5) * 0.2
    ];

    spawnedCubes.push({
      id: idCounter++,
      pos: spawnPos
    });
  }

  export function clearCubes() {
    spawnedCubes = [];
  }
</script>

<!-- The Spawner Base (Interactive Object) -->
<T.Group
  {position}
  userData={{
    interactionType: 'interact',
    onInteract: spawnCube,
    ...userData
  }}
  {...rest}
>
  <!-- Base Pedestal -->
  <T.Mesh position.y={0.4} castShadow>
    <T.CylinderGeometry args={[0.4, 0.5, 0.8]} />
    <T.MeshStandardMaterial color="#4d1f59" roughness={0.3} />
  </T.Mesh>

  <!-- Glowing Spawn Button -->
  <T.Mesh position.y={0.85}>
    <T.CylinderGeometry args={[0.25, 0.25, 0.1]} />
    <T.MeshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={0.6} />
  </T.Mesh>
</T.Group>

<!-- 2. Dynamically rendered TestCubes -->
{#each spawnedCubes as cube (cube.id)}
  <TestCube position={cube.pos} />
{/each}