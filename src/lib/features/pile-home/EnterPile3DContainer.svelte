<script lang="ts">
	import Container from '../canvas-2d/container/Container.svelte';
	import {
		ContainerModel,
		type ContainerConfig
	} from '../canvas-2d/container/containerModel.svelte';

	const modelConfig: ContainerConfig = {
		x: 100,
		y: 100
	};

	const container = new ContainerModel(modelConfig);
</script>

<Container {container}>
<div>
    <img
		src="/media/Cover_v4.1.png"
		alt="Pile Pile Pile Cover"
		class="h-full w-full object-cover pointer-events-none select-none"
	/>
	<div>
        hello world
    </div>
</div>
	
</Container>
