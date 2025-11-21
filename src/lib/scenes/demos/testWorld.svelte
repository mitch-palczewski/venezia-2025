<script lang="ts">
	import { T } from "@threlte/core";
	import { DoubleSide } from "three";


</script>

<!--
<T.Mesh
   position={[0,0, -3]}> 
	<T.BoxGeometry 
		args={[1,2,1]}
		/>
	<T.MeshStandardMaterial color = "hotpink"/>
</T.Mesh>

<T.Mesh
   position={[3,0, -3]}> 
	<T.BoxGeometry 
		args={[1,2,1]}
		/>
	<T.MeshStandardMaterial color = "hotpink"/>
</T.Mesh>

<T.Mesh
   position={[-3,0, -3]}> 
	<T.BoxGeometry 
		args={[1,2,1]}
		/>
	<T.MeshStandardMaterial color = "hotpink"/>
</T.Mesh>
-->



<T.Mesh 
    rotation.x={-Math.PI/2}
    position={[0,-1.01,0]}
>
    <T.CircleGeometry args={[4,40]}  />
    <T.MeshStandardMaterial color="white" side={DoubleSide}/>
</T.Mesh>