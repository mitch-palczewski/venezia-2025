<script lang="ts">
	import { MovableElementFrameModel, type MovableElementFrameConfig } from "../element-frame/moveable-element-frame/MovableFrameModel.svelte";
	import MovableImageFrame from "../element-frame/moveable-element-frame/MovableImageFrame.svelte";





	const modelConfig: MovableElementFrameConfig = {
		x: 500,
		y: 300
	};
	const container = new MovableElementFrameModel(modelConfig);
</script>

<MovableImageFrame movableElement={container} src={"/gifs/Ibix_01_preview2.gif"}  fixedRatio={true}>
</MovableImageFrame>


