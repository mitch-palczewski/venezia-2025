<script lang="ts">
	import { MovableFrameModel, type MovableFrameConfig } from "../frame/moveable-frame/MovableFrameModel.svelte";
	import MovableImageFrame from "../frame/moveable-frame/MovableImageFrame.svelte";







	const modelConfig: MovableFrameConfig = {
		x: 500,
		y: 300
	};
	const container = new MovableFrameModel(modelConfig);
</script>

<MovableImageFrame movableElement={container} src={"/gifs/Ibix_01_preview2.gif"}  fixedRatio={true}>
</MovableImageFrame>


