<script lang="ts">
	import { MovableElementModel, type MovableElementConfig } from "../moveable-element/MovableElementFrameModel.svelte";
	import MovableImage from "../moveable-element/MovableImage.svelte";



	const modelConfig: MovableElementConfig = {
		x: 500,
		y: 300
	};
	const container = new MovableElementModel(modelConfig);
</script>

<MovableImage movableElement={container} src={"/gifs/Ibix_01_preview2.gif"}  fixedRatio={true}>
</MovableImage>


