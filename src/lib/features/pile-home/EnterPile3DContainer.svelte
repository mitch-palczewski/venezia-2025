<script lang="ts">
	import {
		ContainerModel,
		type ContainerConfig
	} from '../canvas-2d/container/containerModel.svelte';
	import ImageContainer from '../canvas-2d/container/ImageContainer.svelte';

	const modelConfig: ContainerConfig = {
		x: 100,
		y: 100
	};
	const container = new ContainerModel(modelConfig);
</script>

<ImageContainer {container} src={"/media/Cover_v4.1.png"} class={"border"} fixedRatio={true}>
<div>

 </div>
</ImageContainer>


