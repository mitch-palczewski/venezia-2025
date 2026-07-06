<script lang="ts">
	import { MovableElementFrameModel, type MovableElementFrameConfig } from "../element-frame/moveable-element-frame/MovableFrameModel.svelte";
	import MovableImageFrame from "../element-frame/moveable-element-frame/MovableImageFrame.svelte";

	


	const modelConfig: MovableElementFrameConfig = {
		x: 100,
		y: 100
	};
	const container = new MovableElementFrameModel(modelConfig);
</script>

<MovableImageFrame movableElement={container} src={"/media/Cover_v4.1.png"} class={"border"} fixedRatio={true}>
<div>

 </div>
</MovableImageFrame>


