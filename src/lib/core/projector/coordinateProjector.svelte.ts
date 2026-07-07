import type { LayoutBounds, Point } from "../viewport/viewport.types";

export class CoordinateProjector {
	public source = $state<LayoutBounds>();
	public virtualResolution = $state(1000);

	public scaleX = $derived((this.source?.width ?? 0) / (this.virtualResolution || 1 ));
	public scaleY = $derived((this.source?.height ?? 0) / (this.virtualResolution || 1));

	public scrollX = $derived(this.source?.scrollX ?? 0)
	public scrollY = $derived(this.source?.scrollY ?? 0)

	constructor(source: LayoutBounds, virtualResolution: number = 1000) {
		this.source = source;
		this.virtualResolution = virtualResolution
	}

	public toVirtual(point: Point): Point {
		if (this.scaleX === 0 || this.scaleY === 0) {
			return { x: this.scrollX, y: this.scrollY };
		}
		return {
			x: point.x / this.scaleX + this.scrollX,
			y: point.y / this.scaleY + this.scrollY
		};
	}

	public toViewport(point: Point): Point {
		return {
			x: (point.x - this.scrollX) * this.scaleX,
			y: (point.y - this.scaleY) * this.scaleY
		};
	}
}
