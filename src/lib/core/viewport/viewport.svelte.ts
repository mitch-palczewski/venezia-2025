import { areaTierBreaks, COMMON_RATIOS, shortestEdgeTierBreaks, widthTierBreaks, type CommonRatioText, type Orientation, type Tier, type TierBreakpoints } from "./viewport.types";


export class Viewport {
	#width = $state(0);
	#height = $state(0);
    #ticking = false;
	public area: number = $derived(this.#width * this.#height);
	public shortestEdge: number = $derived(Math.min(this.#width, this.#height));
	public orientation: Orientation = $derived(getOrientation(this.#width, this.#height));
	public areaTier: Tier = $derived(getTierFromBreakpoints(this.area, areaTierBreaks));
	public shortestEdgeTier: Tier = $derived(getTierFromBreakpoints(this.shortestEdge, shortestEdgeTierBreaks));
	public widthTier: Tier = $derived(getTierFromBreakpoints(this.#width, widthTierBreaks));
    public rawRatio: number = $derived(getRawRatio(this.#width, this.#height))
    public closestCommonRatio: CommonRatioText = $derived(getClosestCommonRatio(this.#width, this.#height))


	constructor() {
		if (typeof window !== 'undefined') {
			this.handleResize();
			window.addEventListener('resize', this.handleResize);
		}
	}

    private syncDimensions() {
        this.#width = window.innerWidth;
        this.#height = window.innerHeight;
    }

    private handleResize = () => {
        if (!this.#ticking) {
            this.#ticking = true;
            requestAnimationFrame(() => {
                this.syncDimensions();
                this.#ticking = false;
            });
        }
    };

	get width() {
		return this.#width;
	}
	get height() {
		return this.#height;
	}

	destroy() {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', this.handleResize);
		}
	}
}

function getTierFromBreakpoints(value: number, breakpoints: TierBreakpoints) {
	if (value <= breakpoints.XsSm) return 0; //Extra Small
	if (value <= breakpoints.SmMd) return 1; //Small
	if (value <= breakpoints.MdLg) return 2; //Medium
	if (value <= breakpoints.LgXl) return 3; //Large
	if (value > breakpoints.LgXl) return 4; //ExtraLarge
	return 2;
}

function getOrientation(width: number, height: number):Orientation {
	if (height > width) return 'tall';
	if (height < width) return 'wide';
	return 'square';
}

function getRawRatio(width: number, height: number):number {
    if (height === 0) return 1;
	return width / height;
}

function getClosestCommonRatio(width:number, height:number):CommonRatioText{
    const currentRatio = getRawRatio(width, height);
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
