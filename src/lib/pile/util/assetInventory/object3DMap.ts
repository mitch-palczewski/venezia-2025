import { BaseInventory, BaseMap } from "./abstractAssetMap";

interface Object3DMapOptions {
	name: string,
	displayName?: string,
	category?: string,
	path: string
	baseScale?: number;
    useMeshBounds?: boolean;
}
export class Object3DMap extends BaseMap {
    readonly category: string;
    readonly baseScale: number;
    readonly objectType = "3D";
    readonly useMeshBounds: boolean

    constructor({ name, displayName, category = "misc", path, baseScale = 1, useMeshBounds = true}: Object3DMapOptions) {
        super(name, path, displayName); 
        this.category = category;
        this.baseScale = baseScale;
        this.useMeshBounds = useMeshBounds
    }
}

export class Object3DMapInventory extends BaseInventory<Object3DMap> {
    public validate(): void {
        this.validateDuplicates();
        this.items.forEach(item => {
            if (!item.path.toLowerCase().endsWith('.glb')) {
                throw new Error(`Invalid Extension: 3D Model "${item.name}" must be .glb`);
            }
        });
        console.log(`✅ Object3D Validated: ${this.items.length} models.`);
    }
}