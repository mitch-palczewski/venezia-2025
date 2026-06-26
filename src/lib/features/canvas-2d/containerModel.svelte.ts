export interface ContainerConfig {
	x: number;
	y: number;
	zIndex?: number;
	width?: number;
	height?: number;
}

export class ContainerModel {
	public readonly id = crypto.randomUUID();
	public x = $state(0);
	public y = $state(0);
	public zIndex = $state(1);
	public width = $state(240);
	public height = $state(160);

	constructor(config: ContainerConfig) {
		this.x = config.x;
		this.y = config.y;
		this.zIndex = config.zIndex ?? 1;
		if (config.width) this.width = config.width;
		if (config.height) this.height = config.height;
	}
    
	moveTo(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
