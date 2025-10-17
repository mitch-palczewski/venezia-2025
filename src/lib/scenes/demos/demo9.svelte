<script lang="ts">

  
    import { T, useTask } from '@threlte/core';
    import Crocodile01 from '$lib/assets/models/crocodile_01/Crocodile_01.svelte';
	import { degToRad, radToDeg } from 'three/src/math/MathUtils.js';



let rotation = $state(0)
    useTask((delta)=>{
        rotation += delta
    })

</script>


<T.PerspectiveCamera 
    makeDefault
    position={[0,6,1]}
    oncreate={(ref) => {ref.lookAt(0,0,0)}}
>
</T.PerspectiveCamera>



<T.DirectionalLight 
    position={[0,10,10]}
    castShadow
    color="lightgreen"
/>


<T.Object3D 
rotation.z={rotation}>
    <Crocodile01
    rotation.y={degToRad(-6)}
    position={[0,.2,0]}

    />
</T.Object3D>


