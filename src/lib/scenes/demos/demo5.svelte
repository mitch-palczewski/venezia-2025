<script>
	// @ts-nocheck

	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import { OrbitControls } from '@threlte/extras';
	import Interactive1Zardoz01 from '$lib/assets/models/interactive1_Zardoz_01.svelte';
    import Interactive2Zardoz01 from '$lib/assets/models/interactive2_Zardoz_01.svelte';
</script>

<T.PerspectiveCamera
	makeDefault
	position={[1, 2, 5]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
>
    <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} castShadow />

<Interactive1Zardoz01
position={[2,0,0]}
scale = {.5}
/>
<Interactive1Zardoz01
position={[2,1,0]}
scale = {.5}
/>
<Interactive1Zardoz01
position={[2,-1,0]}
scale = {.5}
/>

<Interactive2Zardoz01
   
/>