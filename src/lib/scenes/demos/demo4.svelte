<script lang="ts">
// @ts-nocheck

  
  import { T } from '@threlte/core';
  import { useGltf } from '@threlte/extras';
  import { OrbitControls } from '@threlte/extras';
    import Zardoz01 from '$lib/assets/models/Zardoz_01/Zardoz_01.svelte';
  
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

<Zardoz01/>

<Zardoz01
position={[2,0,0]}/>

<Zardoz01
position={[-2,0,0]}/>