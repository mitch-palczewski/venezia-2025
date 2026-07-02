import type { DimensionalSource, Point } from "./viewport.types";



export class CoordinateProjector {
	public source = $state<DimensionalSource>();
	public virtualResolution = $state(1000);

	public scaleX = $derived((this.source?.width ?? 0) / (this.virtualResolution || 1 ));

	public scaleY = $derived((this.source?.height ?? 0) / (this.virtualResolution || 1));

	constructor(source: DimensionalSource, virtualResolution: number = 1000) {
		this.source = source;
		this.virtualResolution = virtualResolution
	}

	public toVirtual(point: Point, scroll: Point = { x: 0, y: 0 }): Point {
		if (this.scaleX === 0 || this.scaleY === 0) {
			return { x: scroll.x, y: scroll.y };
		}
		return {
			x: point.x / this.scaleX + scroll.x,
			y: point.y / this.scaleY + scroll.y
		};
	}

	public toViewport(point: Point, scroll: Point = { x: 0, y: 0 }): Point {
		return {
			x: (point.x - scroll.x) * this.scaleX,
			y: (point.y - scroll.y) * this.scaleY
		};
	}
}
