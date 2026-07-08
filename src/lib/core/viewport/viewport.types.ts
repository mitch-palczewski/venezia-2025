// --- Projection Util --- 

/**
 * @member x : number
 * @member y : number
 * @member z ?: number | undefined
 */
export interface Point {
    x: number;
    
    y: number;

    z?: number;
}

export interface LayoutBounds {
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
    scrollX?: number;
    scrollY?: number;
}

// --- Viewport Ratios ---

export type Orientation = 'tall' | 'wide' | 'square';

export type AspectRatio = {
    readonly text: string;
    readonly value: number;
};

export const COMMON_RATIOS = [
    { text: '1:1',   value: 1 },
    { text: '16:9',  value: 16 / 9 },
    { text: '9:16',  value: 9 / 16 },
    { text: '4:3',   value: 4 / 3 },
    { text: '3:4',   value: 3 / 4 }
] as const;

export const PHOTOGRAPHY_RATIOS = [
    { text: '1:1',   value: 1 },
    { text: '16:9',  value: 16 / 9 },
    { text: '9:16',  value: 9 / 16 },
    { text: '3:2',   value: 3 / 2 },
    { text: '2:3',   value: 2 / 3 }
] as const;

/**Used for Minimal Development First Approach. */
export const MINIMAL_TARGET_RATIOS = [
    { text: '16:9',  value: 16 / 9 },
    { text: '9:16',  value: 9 / 16 },
    { text: '3:2',   value: 3 / 2 },
] as const;


// --- Viewport Tier ---

export const TIER_TEXT_MAP = {
    0: 'Extra Small',
    1: 'Small',
    2: 'Medium',
    3: 'Large',
    4: 'Extra Large'
} as const;

export type Tier = keyof typeof TIER_TEXT_MAP;

export type TierText = typeof TIER_TEXT_MAP[Tier];

export interface TierBreakpoints {
	XsSm: number;
	SmMd: number;
	MdLg: number;
	LgXl: number;
}

export const widthTierBreaks = { 
    XsSm: 640, 
    SmMd: 768, 
    MdLg: 1024, 
    LgXl: 1280 
} as const;

export const shortestEdgeTierBreaks = {
	XsSm: 300,
	SmMd: 440,
	MdLg: 660,
	LgXl: 1000
} as const;

export const areaTierBreaks = {
	XsSm: 150000,
	SmMd: 350000,
	MdLg: 850000,
	LgXl: 2100000
} as const;


