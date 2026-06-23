
export const SmMdScreenSizeBreak = 768
export const MdLgScreenSizeBreak = 1024

export type CommonRatioText = '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '3:2' | '2:3' | '21:9' | '9:21' | 'Unknown';

interface RatioMap {
    text: CommonRatioText;
    value: number;
}

const COMMON_RATIOS: RatioMap[] = [
    { text: '1:1',   value: 1 },
    { text: '16:9',  value: 16 / 9 },
    { text: '9:16',  value: 9 / 16 },
    { text: '4:3',   value: 4 / 3 },
    { text: '3:4',   value: 3 / 4 },
    { text: '3:2',   value: 3 / 2 },
    { text: '2:3',   value: 2 / 3 },
    { text: '21:9',  value: 21 / 9 },
    { text: '9:21',  value: 9 / 21 }
];

export class Viewport {
    #width = $state(0)
    #height = $state(0)

    constructor () {
        if(typeof window !== 'undefined'){
            this.updateDimensions()
            window.addEventListener('resize', this.updateDimensions)
        }
    }

    private updateDimensions = () => {
        this.#width = window.innerWidth;
        this.#height = window.innerHeight;
    }

    /**
     * The reactive width of the browser viewport in pixels (`window.innerWidth`).
     */
    get width() {return this.#width}

    /**
     * The reactive height of the browser viewport in pixels (`window.innerHeight`).
     */
    get height() {return this.#height}

    /**
     * Evaluates if the device layout represents a small layout (typically smartphones).
     * Returns `true` if the smaller of the two viewport dimensions drops below the `768px` cutoff.
     */
    get isSmallScreen() { return Math.min(this.#width, this.#height) < SmMdScreenSizeBreak; }          
    
    /**
     * Evaluates if the device layout represents a medium layout (typically tablets or split desktop views).
     * Returns `true` if the smaller viewport dimension is at least `768px` and the overall width remains under `1024px`.
     */
    get isMediumScreen() { return Math.min(this.#width, this.#height) >= SmMdScreenSizeBreak && this.#width < MdLgScreenSizeBreak; } 
    
    /**
     * Evaluates if the device layout represents a large layout (typically desktop monitors or high-res landscapes).
     * Returns `true` if the smaller viewport dimension meets or exceeds the `1024px` cutoff.
     */
    get isLargeScreen() { return Math.min(this.#width, this.#height) >= MdLgScreenSizeBreak; }

    /**
     * Calculates the exact decimal aspect ratio of the viewport (`Width / Height`).
     * @returns {number} The raw float value of the aspect ratio (defaults to 1 if height is 0).
     */
    get rawRatio(): number {
        if (this.#height === 0) return 1;
        return this.#width / this.#height;
    }

    /**
     * Evaluates the current raw aspect ratio and matches it to the closest 
     * common industry format (e.g., '16:9', '21:9', '1:1') via a minimum-distance 
     * absolute delta search. Useful for layout adjustments and cinematic asset scaling.
     * @returns {CommonRatioText} The string label corresponding to the closest standard screen dimension format.
     */
    get closestCommonRatio(): CommonRatioText {
        const currentRatio = this.rawRatio;
        if (currentRatio === 0) return 'Unknown';

        let closestMatch = COMMON_RATIOS[0];
        let smallestDelta = Math.abs(currentRatio - closestMatch.value);

        for (let i = 1; i < COMMON_RATIOS.length; i++) {
            const currentDelta = Math.abs(currentRatio - COMMON_RATIOS[i].value);
            if (currentDelta < smallestDelta) {
                smallestDelta = currentDelta;
                closestMatch = COMMON_RATIOS[i];
            }
        }

        return closestMatch.text;
    }

    /**
     * Cleans up native DOM event listeners to prevent browser memory leaks.
     * Ensure this method is executed within your Svelte component teardown lifecycle (e.g., `onDestroy`).
     */
    destroy() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.updateDimensions);
        }
    }
}