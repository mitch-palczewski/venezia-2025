import type { Transform3D } from '../types';

type ModelCategory = 'undertow' | 'various' | 'misc'

interface ModelMapOptions {
	name: string,
	displayName?: string,
	category?: ModelCategory,
	path: string
	baseScale?: number;
}
class ModelMap {
	readonly name: string;
	readonly displayName: string;
	readonly category: ModelCategory;
	readonly path: string;
	readonly baseScale: number;
	
	constructor({name, displayName, category = "misc", path, baseScale = 1}: ModelMapOptions){
		this.name = name
		this.displayName = displayName ?? name;
		this.category = category;
		this.path = path
		this.baseScale = baseScale
	}
}

export class ModelInventory {
	private items: ModelMap[] = [];

	constructor (models?: ModelMap[]){
		if (models){
			this.add(models)
		}
	}

	public validate(): void {
        const names = new Set<string>();
        const displayNames = new Set<string>();
        const paths = new Set<string>();

       	this.items.forEach((model, index) => {
            if (!model.path.toLowerCase().endsWith('.glb')) {
                throw new Error(`Invalid Extension: Model "${model.name}" at index ${index} must be a .glb file.`);
            }
            if (names.has(model.name)) {
                throw new Error(`Duplicate Name: "${model.name}"`);
            }
            if (displayNames.has(model.displayName)) {
                throw new Error(`Duplicate Display Name: "${model.displayName}"`);
            }
            if (paths.has(model.path)) {
                throw new Error(`Duplicate Path: "${model.path}"`);
            }

            names.add(model.name);
            displayNames.add(model.displayName);
            paths.add(model.path);
        });

        console.log(`✅ Inventory Validated: ${this.items.length} models loaded.`);
    }

	public exists(name: string): boolean {
        return this.items.some(m => m.name === name);
    }

    public get(name: string): ModelMap | undefined {
        return this.items.find(m => m.name === name);
    }

	public add(models: ModelMap[]): void{
		this.items = [...this.items, ...models];
	}

	public getAll(): ModelMap[] {
        return [...this.items];
    }
}

/*
  new ModelMap({
		name: 'Misc_05_fingers',
		displayName: 'Pot Face Fingers',
		path: '/models/various/Misc_05_fingers.glb'
	}),
 */


export const undertowModels:ModelMap[] = [
	new ModelMap({
		name: 'Arch_01',
		displayName: 'Arch',
		path: '/models/undertow/Arch_01.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Bull_01',
		displayName: 'Bull 1',
		path: '/models/undertow/Bull_01.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Bull_02',
		displayName: 'Bull 2',
		path: '/models/undertow/Bull_02.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'BurntBoy_01',
		displayName: 'Burnt Boy',
		path: '/models/undertow/BurntBoy_01.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Cavallo_01',
		displayName: 'Cavallo',
		path: '/models/undertow/Cavallo_01.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Crocodile_01',
		displayName: 'Crocodile',
		path: '/models/undertow/Crocodile_01.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Gargoyle_01',
		displayName: 'Gargoyle 1',
		path: '/models/undertow/Gargoyle_01.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Gargoyle_02',
		displayName: 'Gargoyle 2',
		path: '/models/undertow/Gargoyle_02.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Gargoyle_04',
		displayName: 'Gargoyle 4',
		path: '/models/undertow/Gargoyle_04.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Gargoyle_05',
		displayName: 'Gargoyle 5',
		path: '/models/undertow/Gargoyle_05.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Leone_01',
		displayName: 'Leone',
		path: '/models/undertow/Leone_01.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Misc_01',
		displayName: 'Pizzas Alive!',
		path: '/models/undertow/Misc_01.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Misc_02',
		displayName: 'Jaw Line',
		path: '/models/undertow/Misc_02.glb',
		category: 'undertow',
		baseScale: 10
	}),
	new ModelMap({
		name: 'Misc_05',
		displayName: 'Head Smoking',
		path: '/models/undertow/Misc_05.glb',
		category: 'undertow'
	}),
	new ModelMap({
		name: 'Zardoz_01',
		displayName: 'Zardoz',
		path: '/models/undertow/Zardoz_01.glb',
		category: 'undertow'
	}),
]
export const variousModels: ModelMap[] = [
	new ModelMap({
		name: 'Archway_Multiple_01',
		displayName: 'Archways',
		path: '/models/various/Archway_Multiple_01.glb'
	}),
	new ModelMap({
		name: 'BT_02',
		displayName: 'Head 1',
		path: '/models/various/BT_02.glb'
	}),
	

]
export const potFace: ModelMap[]=[
	new ModelMap({
		name: 'Misc_05_fingers',
		displayName: 'Pot Face Fingers',
		path: '/models/pot_face/Misc_05_fingers.glb'
	}),
	new ModelMap({
		name: 'Misc_05_big_eye',
		displayName: 'Pot Face Big Eye',
		path: '/models/pot_face/Misc_05_big_eye.glb'
	}),
	new ModelMap({
		name: 'Misc_05_pot',
		displayName: 'Pot For Face',
		path: '/models/pot_face/Misc_05_pot.glb'
	}),
]
export const architectureModels: ModelMap[]=[
	new ModelMap({
		name: 'Optimize_02',
		displayName: 'Spire 01',
		path: '/models/architecture/Optimize_02.glb'
	}),
]






//TODO move this to another file. something like classes for each transform 
export const BASE_TRANSFORM: Transform3D = {
	translate: { x: 0, y: 0, z: 0 },
	rotation: { x: 0, y: 0, z: 0, w: 0 },
	scale: { x: 1, y: 1, z: 1 }
};
