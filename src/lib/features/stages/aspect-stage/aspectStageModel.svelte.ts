import type { Viewport } from "$lib/core";

export class AspectStageModel {
	public readonly viewport: Viewport;

	public marginPercentage = $state(0);

	#bounds = $derived.by(() => {
		const targetRatio = this.viewport.closestCommonRatioValue;
		const maxW = this.viewport.width * (1 - this.marginPercentage * 2);
		const maxH = this.viewport.height * (1 - this.marginPercentage * 2);

		let stageW = maxW;
		let stageH = maxW / targetRatio;

		if (stageH > maxH) {
			stageH = maxH;
			stageW = maxH * targetRatio;
		}

		return {
			width: stageW,
			height: stageH,
			x: (this.viewport.width - stageW) / 2,
			y: (this.viewport.height - stageH) / 2
		};
	});

	get width() {
		return this.#bounds.width;
	}

	get height() {
		return this.#bounds.height;
	}

	get x() {
		return this.#bounds.x;
	}

	get y() {
		return this.#bounds.y;
	}

	constructor(viewport: Viewport, marginPercentage?: number) {
		this.viewport = viewport;
        this.marginPercentage = marginPercentage? marginPercentage : 0;
	}
}
