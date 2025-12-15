<script lang='ts'>
    import { T } from "@threlte/core";
    import { OrbitControls } from "@threlte/extras";
    import ModelTemplate from "$lib/pile/models/modelTemplate.svelte";
	import ArchwayMultiple01 from "$lib/components/models/_test/Archway_Multiple_01.svelte";
	
	

    const modelInventory = [
		//'Zardoz_01', 
		'BT_02',
		'Archway_Multiple_01'
		]
    let counter = 0
</script>


<T.PerspectiveCamera
	makeDefault
	position={[1, 2, 5]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />
<T.AmbientLight intensity={0.08} />


<!--
{#each modelInventory as model}
	<ModelTemplate
		name={model}
		id={'00000'}
		oncreate={() => {
            counter += 1
			
		}}
		position={[
            counter, 0, counter

		]}
		quaternion={[
			0,0,0,0
		]}
		scale={[1,1,1]}
	/>
{/each}
-->



