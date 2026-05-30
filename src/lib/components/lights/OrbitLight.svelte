<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { AmbientLight, Color } from 'three';

	let { radius = 9000, height = 7000, speed = .2, sunSize = 500, baseOpacity = 0.1} = $props();
	let time = $state(Math.random()*360);
	useTask((delta) => {
		time += delta * speed;
	});
	let x = $derived(Math.cos(time) * radius);
	let z = $derived(Math.sin(time) * radius);
	let y = $derived(Math.sin(time * 0.5) * 1000 + height);

	const colorA = new Color('#ff5500');
    const colorB = new Color('#d49500'); 
    const workingColor = new Color();

	let intensity = $derived(1);
	let t = $derived((Math.sin(time) + 1) / 2);
	let sunColor =  $derived.by(() => {
        workingColor.copy(colorA).lerp(colorB, t);
        return `#${workingColor.getHexString()}`;
    });
</script>

<T.DirectionalLight position={[x, radius, z]} {intensity} {sunColor} />
<T.DirectionalLight position={[x, -radius, -z]} intensity={intensity} color={'#088F8F'} />
<T.DirectionalLight position={[-x, -radius, -z]} intensity={intensity*.6} color={'#400754'} />


