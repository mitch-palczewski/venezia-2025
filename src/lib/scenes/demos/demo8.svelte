<script lang='ts'>
    import { generateTerrainGeometry } from "$lib/3d/generateTerrain";
	import { T } from "@threlte/core";
	import { OrbitControls } from "@threlte/extras";
    import { onMount } from "svelte";
	import type { PlaneGeometry } from "three";


    const geometry: PlaneGeometry = generateTerrainGeometry()
   

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

<T.Mesh>
    <T is={geometry}> </T>
    <T.MeshDepthMaterial></T.MeshDepthMaterial>
</T.Mesh>