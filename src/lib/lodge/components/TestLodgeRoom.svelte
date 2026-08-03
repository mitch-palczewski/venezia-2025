<script lang='ts'>
	import { T } from "@threlte/core";
	import { BackSide, Box3, Vector3 } from "three";
	import { Lodge } from "../Lodge.svelte";

    type Props = {
        lodge: Lodge,
        width: number,
        height: number,
        depth: number
    }
    let {lodge, width, height, depth}:Props = $props()  

    const boundsMin = new Vector3(-width/2 + 1, 1, -depth/2 + 1)
	const boundsMax = new Vector3(width/2 - 1, height - 1, depth/2 - 1)
    lodge.bounds = new Box3(boundsMin, boundsMax )

</script>



<T.Mesh position={[0, height / 2, 0]}>
    <T.BoxGeometry args={[width, height, depth]} />
    <T.MeshStandardMaterial 
        color="#2b2b2b" 
        side={BackSide} 
        roughness={0.8} 
    />
</T.Mesh>

<T.Mesh rotation.x={-Math.PI / 2} position.y={0.01}>
    <T.PlaneGeometry args={[width, depth]} />
    <T.MeshStandardMaterial color="#1a1a1a" roughness={0.5} />
</T.Mesh>
