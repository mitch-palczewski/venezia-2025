<script lang="ts">
	import type { ProjectedFrameModel } from './projectedElementFrameModel.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		model: ProjectedFrameModel;
	}

	let { model, class: className = '', children, ...restProps }: Props = $props();

	function autoMeasure(node: HTMLElement) {
		if (!model.isContentDrivenWidth && !model.isContentDrivenHeight) return;
		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				model.measuredWidth = entry.contentRect.width;
				model.measuredHeight = entry.contentRect.height;
			}
		});
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<div
	use:autoMeasure
	class="touch-none select-none {className}"
	style={model.physicalBoundsStyle}
	{...restProps}
>
	{@render children?.()}
</div>
