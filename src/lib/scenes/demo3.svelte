<script>
  // Note opening this link used 40/2,000 Advanced Operations
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

{#await useGltf('https://ib2aqt4stktesjza.public.blob.vercel-storage.com/Misc_03.glb') then gltf}
  <T is={gltf.scene} />
{/await}


