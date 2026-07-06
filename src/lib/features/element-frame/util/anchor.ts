export type CompassAnchor = 'NW' | 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'C';

export function getAnchorOffset(width: number, height: number, anchor: CompassAnchor) {
	let offsetX = 0;
	let offsetY = 0;

	if (anchor.includes('E')) offsetX = width;
	else if (anchor.includes('W')) offsetX = 0;
	else offsetX = width / 2;

	if (anchor.includes('S')) offsetY = height;
	else if (anchor.includes('N')) offsetY = 0;
	else offsetY = height / 2;

	return { x: offsetX, y: offsetY };
}

export function getTransformOrigin(anchor: CompassAnchor): string {
		const mapping: Record<CompassAnchor, string> = {
			NW: 'top left',
			N: 'top center',
			NE: 'top right',
			E: 'center right',
			SE: 'bottom right',
			S: 'bottom center',
			SW: 'bottom left',
			W: 'center left',
			C: 'center center'
		};
		return mapping[anchor];
	}