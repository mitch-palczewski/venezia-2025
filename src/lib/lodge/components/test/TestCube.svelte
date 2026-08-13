<script lang="ts">
	import { T } from '@threlte/core';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof T.Group>;
	let { ...rest }: Props = $props();
</script>

<T.Group {...rest}>
	<T.Mesh  name="pivot">
		<T.BoxGeometry args={[2, 1, 0.5]} />
		<T.MeshStandardMaterial color="#fcba03" roughness={0.8} />
	</T.Mesh>
</T.Group>
