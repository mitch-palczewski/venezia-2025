export type Tier = 0 | 1 | 2 | 3 | 4;
export type TierText = 'Extra Small' | 'Small' | 'Medium' | 'Large' | 'Extra Large';
export type Orientation = 'tall' | 'wide' | 'square';
export type CommonRatioText =
	| '1:1'
	| '16:9'
	| '9:16'
	| '4:3'
	| '3:4'
	| '3:2'
	| '2:3'
	| '21:9'
	| '9:21'
	| 'Unknown';

export interface RatioMap {
	text: CommonRatioText;
	value: number;
}

export interface TierBreakpoints {
	XsSm: number;
	SmMd: number;
	MdLg: number;
	LgXl: number;
}

export const widthTierBreaks: TierBreakpoints = { XsSm: 300, SmMd: 440, MdLg: 660, LgXl: 1000 };
export const shortestEdgeTierBreaks: TierBreakpoints = {
	XsSm: 300,
	SmMd: 440,
	MdLg: 660,
	LgXl: 1000
};
export const areaTierBreaks: TierBreakpoints = {
	XsSm: 150000,
	SmMd: 350000,
	MdLg: 850000,
	LgXl: 2100000
};

export const COMMON_RATIOS: RatioMap[] = [
	{ text: '1:1', value: 1 },
	{ text: '16:9', value: 16 / 9 },
	{ text: '9:16', value: 9 / 16 },
	{ text: '4:3', value: 4 / 3 },
	{ text: '3:4', value: 3 / 4 },
	{ text: '3:2', value: 3 / 2 },
	{ text: '2:3', value: 2 / 3 },
	{ text: '21:9', value: 21 / 9 },
	{ text: '9:21', value: 9 / 21 }
];
