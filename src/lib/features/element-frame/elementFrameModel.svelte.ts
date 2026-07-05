class AbsoluteElementFrameModel {
	public x = $state(0);
	public y = $state(0);
	public zIndex = $state(1);
	public width = $state(240);
	public height = $state(160);
	constructor() {
	}

	moveTo(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
