import type { Transform3D } from '$lib/pile/types';

export interface PileObjectJson {
	name: string;
	transform: Transform3D;
	animation: string | null;
}

export interface PileDataSchema {
	pile_position_data: {
		objects2D: Record<string, PileObjectJson>;
		objects3D: Record<string, PileObjectJson>;
		sky: number;
	};
}
