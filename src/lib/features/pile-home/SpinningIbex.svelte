<script lang="ts">
	import {
		ContainerModel,
		type ContainerConfig
	} from '../canvas-2d/container/containerModel.svelte';
	import ImageContainer from '../canvas-2d/container/ImageContainer.svelte';

	const modelConfig: ContainerConfig = {
		x: 500,
		y: 300
	};
	const container = new ContainerModel(modelConfig);
</script>

<ImageContainer {container} src={"/gifs/Ibix_01_preview2.gif"}  fixedRatio={true}>
</ImageContainer>


