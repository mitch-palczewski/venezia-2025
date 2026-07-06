import {  type CompassAnchor } from '../util/anchor';

export interface BaseFrameConfig {
    x: number;
    y: number;
    zIndex?: number;
    anchor?: CompassAnchor;
}

type SizingX = 
    | { projectedWidth: number; pixelWidth?: never }
    | { pixelWidth: number; projectedWidth?: never }
    | { projectedWidth?: never; pixelWidth?: never };

type SizingY = 
    | { projectedHeight: number; pixelHeight?: never }
    | { pixelHeight: number; projectedHeight?: never }
    | { projectedHeight?: never; pixelHeight?: never };

export type ProjectedElementFrameConfig = BaseFrameConfig & SizingX & SizingY;