<script lang="ts">
	
	import { MovableElementModel, type MovableElementConfig } from '../moveable-element/MovableElementFrameModel.svelte';
	import MovableImage from '../moveable-element/MovableImage.svelte';

	const modelConfig: MovableElementConfig = {
		x: 100,
		y: 100
	};
	const container = new MovableElementModel(modelConfig);
</script>

<MovableImage movableElement={container} src={"/media/Cover_v4.1.png"} class={"border"} fixedRatio={true}>
<div>

 </div>
</MovableImage>


