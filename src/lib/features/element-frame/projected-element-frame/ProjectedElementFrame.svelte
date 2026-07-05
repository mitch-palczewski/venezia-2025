<script lang="ts">
	import type { ProjectedElementFrameModel } from './projectedElementFrameModel.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		model: ProjectedElementFrameModel;
	}

	let { model, class: className = '', children, ...restProps }: Props = $props();

	function autoMeasure(node: HTMLElement) {
		// Guard check against your new content-driven flags
		if (!model.isContentDrivenWidth && !model.isContentDrivenHeight) return;

		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				// Just store the exact real screen pixels the browser is rendering
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
