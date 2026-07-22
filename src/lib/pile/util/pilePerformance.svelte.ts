import type { DeviceContext, PerformanceTier } from "$lib/dom/core";


export class PilePerformance {
    #performance: PerformanceTier = $state(2)
    public readonly deviceContext: DeviceContext;
    public readonly originalPerformanceTier: PerformanceTier; 
    public lights: PerformanceTier = $state(2);
    public cameraFar: PerformanceTier = $state(2);
    public clickPercision: PerformanceTier = $state(2)

    constructor(deviceContext: DeviceContext){
        this.deviceContext = deviceContext  
        this.originalPerformanceTier = deviceContext.performance.performanceTier
        this.lights = this.originalPerformanceTier
        this.cameraFar = this.originalPerformanceTier
        this.clickPercision = this.originalPerformanceTier
    }

    get performance(){
        return this.#performance
    }
    set performance(value){
        this.#performance = value
        this.lights = value
        this.cameraFar = value
        this.clickPercision = value
    }

}