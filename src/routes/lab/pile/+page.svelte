<script lang="ts">
	import { useViewportProjector } from '$lib/core/projector/projector.context.svelte';
	import { MovableFrame } from '$lib/features';
	import ProjectedStage from '$lib/features/stages/projected-stage/ProjectedStage.svelte';

	const viewportProjector = useViewportProjector();
</script>

<ProjectedStage projector={viewportProjector}>
	<MovableFrame position={{ x: 100, y: 100 }} width={300} >
		<img src="/media/Cover_v4.1.png" alt="cover">
	</MovableFrame>
</ProjectedStage>
	<MovableFrame position={{ x: 100, y: 100 }} >hello world</MovableFrame>

