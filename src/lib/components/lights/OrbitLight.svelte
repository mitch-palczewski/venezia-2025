<script lang="ts">
	import { T, useTask } from '@threlte/core';

	let { radius = 9000, height = 7000, speed = 0.01, sunSize = 500, baseOpacity = 0.1} = $props();
	let time = $state(Math.random()*360);
	useTask((delta) => {
		time += delta * speed;
	});
	let x = $derived(Math.cos(time) * radius);
	let z = $derived(Math.sin(time) * radius);
	let y = $derived(Math.sin(time * 0.5) * 1000 + height);
	let intensity = $derived(2.7 + Math.sin(time * 2) * 0.4);
	let sunColor = $derived(y > 12 ? '#ffcc00' : '#ff5500');
    let currentOpacity = $derived(baseOpacity + Math.sin(time) * 0.3);
</script>

<T.DirectionalLight position={[x, radius, z]} {intensity} {sunColor} castShadow />

<T.Mesh position={[x, y, z]}>
	<T.SphereGeometry args={[sunSize, 32, 32]} />
	<T.MeshStandardMaterial color={sunColor} emissive={sunColor} emissiveIntensity={2} transparent={true} opacity={currentOpacity} alphaTest={0.01}/>
</T.Mesh>
