<script lang="ts">

	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Interactive1Zardoz01 from '$lib/components/models/Zardoz_01/interactive1_Zardoz_01.svelte';
    import Interactive2Zardoz01 from '$lib/components/models/Zardoz_01/interactive2_Zardoz_01.svelte';
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


<Interactive2Zardoz01
   
/>
<Interactive2Zardoz01
   position = {[1,1,1]}
/>