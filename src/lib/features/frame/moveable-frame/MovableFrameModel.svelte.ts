export interface MovableFrameConfig {
	x: number;
	y: number;
	zIndex?: number;
	width?: number;
	height?: number;
	draggable?: boolean;       
    showTransformGizmo?: boolean;
}

export class MovableFrameModel {
	public x = $state(0);
	public y = $state(0);
	public zIndex = $state(1);
	public width = $state(240);
	public height = $state(160);
	public draggable = $state(true);
	public showTransformGizmo = $state(true)

	constructor(config: MovableFrameConfig) {
		this.x = config.x;
		this.y = config.y;
		this.zIndex = config.zIndex ?? 1;
		this.draggable = config.draggable ?? true
		this.showTransformGizmo = config.showTransformGizmo ?? true
		this.width = config.width ?? 240
		this.height = config.height ?? 160
	}
    
	moveTo(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
