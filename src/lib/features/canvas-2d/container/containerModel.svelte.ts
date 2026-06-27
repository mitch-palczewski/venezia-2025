export interface ContainerConfig {
	x: number;
	y: number;
	zIndex?: number;
	width?: number;
	height?: number;
	draggable: boolean;       
    showTransformGizmo: boolean;
}

export class ContainerModel {
	public readonly id = crypto.randomUUID();
	public x = $state(0);
	public y = $state(0);
	public zIndex = $state(1);
	public width = $state(240);
	public height = $state(160);
	public draggable = $state(true);
	public showTransformGizmo = $state(true)

	constructor(config: ContainerConfig) {
		this.x = config.x;
		this.y = config.y;
		this.zIndex = config.zIndex ?? 1;
		this.draggable = config.draggable
		this.showTransformGizmo = config.showTransformGizmo
		if (config.width) this.width = config.width;
		if (config.height) this.height = config.height;
	}
    
	moveTo(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
