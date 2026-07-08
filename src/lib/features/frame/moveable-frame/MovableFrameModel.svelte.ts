export interface MovableFrameConfig {
    /** The horizontal coordinate position in your coordinate space. */
    x: number;
    
    /** The vertical coordinate position in your coordinate space. */
    y: number;
    
    /** * The stacking order layer of the frame. 
     * @default 1 
     */
    zIndex?: number;
    
    /** * The explicit starting layout width in pixels. 
     * @default 240 
     */
    width?: number | undefined;
    
    /** * The explicit starting layout height in pixels. 
     * @default 160 
     */
    height?: number|undefined;
    
    /** * Controls whether the user can interactively drag and reposition the frame. 
     * @default true 
     */
    draggable?: boolean;       
    
    /** * Controls whether interactive scale and resize handles are visible around the bounds. 
     * @default true 
     */
    showTransformGizmo?: boolean;
}

export class MovableFrameModel {
    public x = $state(0);
    public y = $state(0);
    public zIndex = $state(1);
    public width = $state<number | undefined> (undefined);
    public height = $state<number | undefined> (undefined);
    public draggable = $state(true);
    public showTransformGizmo = $state(true)

    /**
     * Initializes a new instance of an interactively movable bounding frame node.
     * * @param config The structural initialization layout configurations.
     */
    constructor(config: MovableFrameConfig) {
        this.x = config.x;
        this.y = config.y;
        this.zIndex = config.zIndex ?? 1;
        this.draggable = config.draggable ?? true
        this.showTransformGizmo = config.showTransformGizmo ?? true
        this.width = config.width 
        this.height = config.height 
    }
    
    /**
     * Imperatively snaps the frame to a specific geometric coordinate location.
     * * @param x New target horizontal position.
     * @param y New target vertical position.
     */
    public moveTo(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}