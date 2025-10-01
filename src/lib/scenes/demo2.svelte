<script>
  import { T } from '@threlte/core';
  import { useGltf } from '@threlte/extras';
  import { OrbitControls } from '@threlte/extras';
  
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

{#await useGltf('/models/undertow/Arch_01.glb') then gltf}
  <T is={gltf.scene} />
{/await}
