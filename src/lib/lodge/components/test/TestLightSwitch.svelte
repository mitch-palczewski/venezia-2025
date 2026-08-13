<script lang="ts">
  import { T } from '@threlte/core';
  import type { ComponentProps } from 'svelte';
  import type { Group } from 'three';

  type Props = ComponentProps<typeof T.Group> & {
    isOn?: boolean;
    lightIntensity?: number;
    lightColor?: string;
    onToggle?: (isOn: boolean) => void;
  };

  let {
    isOn = $bindable(false),
    lightIntensity = 15,
    lightColor = '#fff5d6',
    onToggle,
    userData,
    ...rest
  }: Props = $props();

  let groupRef = $state<Group>();

  function toggle() {
    isOn = !isOn;
    onToggle?.(isOn);
  }
</script>

<!-- Attach interactive userData to the group root -->
<T.Group
  bind:ref={groupRef}
  userData={{
    interactionType: 'interact',
    onInteract: toggle,
    ...userData
  }}
  {...rest}
>
  <!-- 1. Wall Plate -->
  <T.Mesh position.z={0.02}>
    <T.BoxGeometry args={[0.3, 0.5, 0.04]} />
    <T.MeshStandardMaterial color="#eeeeee" roughness={0.4} />
  </T.Mesh>

  <!-- 2. Interactive Toggle Switch Lever (Rotates when toggled) -->
  <T.Mesh
    position={[0, 0, 0.06]}
    rotation.x={isOn ? -0.3 : 0.3}
  >
    <T.BoxGeometry args={[0.08, 0.16, 0.08]} />
    <T.MeshStandardMaterial
      color={isOn ? '#ffffff' : '#aaaaaa'}
      emissive={isOn ? '#44ffaa' : '#000000'}
      emissiveIntensity={isOn ? 0.8 : 0}
      roughness={0.2}
    />
  </T.Mesh>

  <!-- 3. Integrated Light Source -->
  {#if isOn}
    <T.PointLight
      position={[0, 0, 0.5]}
      intensity={lightIntensity}
      color={lightColor}
      distance={10}
      decay={2}
      castShadow
    />
  {/if}
</T.Group>