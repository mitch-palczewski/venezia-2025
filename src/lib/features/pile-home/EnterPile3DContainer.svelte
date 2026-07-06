<script lang="ts">
	import { MovableFrameModel, type MovableFrameConfig } from "../frame/moveable-frame/MovableFrameModel.svelte";
	import MovableImageFrame from "../frame/moveable-frame/MovableImageFrame.svelte";



	


	const modelConfig: MovableFrameConfig = {
		x: 100,
		y: 100
	};
	const container = new MovableFrameModel(modelConfig);
</script>

<MovableImageFrame movableElement={container} src={"/media/Cover_v4.1.png"} class={"border"} fixedRatio={true}>
<div>

 </div>
</MovableImageFrame>


