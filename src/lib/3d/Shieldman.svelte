<script lang="ts">
	import ShieldManLOD1 from "./Shield_Man_LOD1.svelte";
	import { OrbitControls, TransformControls } from "@threlte/extras";
	import { T, useTask } from "@threlte/core";

    let rotation = $state(0)

    useTask((delta) => {
    // delta is the time elapsed since the last frame
    // 0.5 is the speed multiplier
    rotation += 0.5 * delta; 
  });

</script>
<T.PerspectiveCamera>
</T.PerspectiveCamera>
<T.AmbientLight intensity={3} />
<T.DirectionalLight/>
<T.DirectionalLight position={[10,10,10]} castShadow />


<TransformControls mode={"rotate"}>
   <T.Group rotation.y={rotation}>
    <ShieldManLOD1 />
</T.Group>
</TransformControls>
