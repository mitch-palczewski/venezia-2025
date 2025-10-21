<script lang="ts">


  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import Arch01 from './models/Arch_01.svelte';
  import Bull01 from './models/Bull_01.svelte';
  import Bull02 from './models/Bull_02.svelte';
  import Crocodile01 from './models/Crocodile_01.svelte';
  import Zardoz01 from './models/Zardoz_01.svelte';

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


<Bull02/>
<Bull02/>
<Arch01/>
<Bull01/>
<Crocodile01/>
<Zardoz01/>
<Zardoz01/>