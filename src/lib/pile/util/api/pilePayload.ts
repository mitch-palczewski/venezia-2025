import type { PILE_PAYLOAD_NAME } from '$lib/constants';
import type { Transform3D } from '$lib/pile/types';

export interface PileObjectPayload {
	name: string;
	transform: Transform3D;
	animation: string | null;
}

export interface PileDataSchema {
	[PILE_PAYLOAD_NAME]: {
		objects2D: Record<string, PileObjectPayload>;
		objects3D: Record<string, PileObjectPayload>;
		sky: number;
	};
}
