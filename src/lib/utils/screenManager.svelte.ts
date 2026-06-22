
export const SmMdScreenSizeBreak = 768
export const MdLgScreenSizeBreak = 1024

export class ScreenManager {
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

    get width() {return this.#width}
    get height() {return this.#height}
    get isSmallScreen() { return Math.min(this.#width, this.#height) < SmMdScreenSizeBreak; }          
    get isMediumScreen() { return Math.min(this.#width, this.#height) >= SmMdScreenSizeBreak && this.#width < MdLgScreenSizeBreak; } 
    get isLargeScreen() { return Math.min(this.#width, this.#height) >= MdLgScreenSizeBreak; }

    destroy() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.updateDimensions);
        }
    }
}