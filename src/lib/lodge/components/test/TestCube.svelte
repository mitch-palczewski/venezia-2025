<script lang="ts">
	import { T } from '@threlte/core';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof T.Mesh>;
	let { ...rest }: Props = $props();

    
</script>

<T.Mesh {...rest}>
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color="#fcba03" roughness={0.8} />
</T.Mesh>
