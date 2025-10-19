<script lang="ts">


  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import Arch01 from '$lib/assets/models/Arch_01/Arch_01.svelte';



</script>



<T.PerspectiveCamera 
    makeDefault
    position={[10,10,10]}
    oncreate={(ref) => {ref.lookAt(0,1,0)}}
    
><OrbitControls enableDamping /></T.PerspectiveCamera>


<T.DirectionalLight 
    position={[0,10,10]}
    castShadow
/>

<Arch01/>