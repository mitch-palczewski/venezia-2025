import type { Viewport } from './viewport.svelte';

interface Point {
	x: number;
	y: number;
}

export class CoordinateProjector {
	public viewport = $state<Viewport>();
	public virtualBase = $state(1000);

	public scaleX = $derived((this.viewport?.width ?? 0) / (this.virtualBase || 1 ));

	public scaleY = $derived((this.viewport?.height ?? 0) / (this.virtualBase || 1));

	constructor(viewport: Viewport, virtualBase?: number) {
		this.viewport = viewport;
		this.virtualBase = virtualBase ?? 1000;
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
