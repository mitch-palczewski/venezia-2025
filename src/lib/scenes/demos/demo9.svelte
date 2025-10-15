<script lang="ts">

  
    import { isInstanceOf, T, useThrelte } from '@threlte/core';
    import { useGltf } from '@threlte/extras';
    import { OrbitControls } from '@threlte/extras';
    import Crocodile01 from '$lib/assets/models/crocodile_01/Crocodile_01.svelte';
    import InteractiveCorcodile01 from '$lib/assets/models/crocodile_01/interactive_Corcodile_01.svelte';
	import { PerspectiveCamera } from 'three';


</script>


<T.PerspectiveCamera 
    makeDefault
    position={[1,2,5]}
    oncreate={(ref) => {ref.lookAt(0,1,0)}}
><OrbitControls enableDamping />
</T.PerspectiveCamera>



<T.DirectionalLight 
    position={[0,10,10]}
    castShadow
/>

<InteractiveCorcodile01/>

