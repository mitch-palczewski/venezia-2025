/*
Maintains Model -> Path
 */

import type { Transform3D } from '../types';


interface ModelMapOptions {
	name: string,
	displayName?: string,
	category?: string,
	path: string
}
export class ModelMap {
	readonly name: string;
	readonly displayName: string;
	readonly category: string| null = null;
	readonly path: string;
	
	constructor({name, displayName, category: category, path}: ModelMapOptions){
		this.name = name
		this.displayName = displayName ?? name;
		this.category = category ?? null;
		this.path = path
	}
}


export class ModelInventory {
	private items: ModelMap[];

	constructor (models: ModelMap[]){
		this.items = models
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

}


const UndertowModelInventory:ModelMap[] = [
	new ModelMap({
		name: 'Arch_01',
		displayName: 'Arch',
		path: '/models/undertow/Arch_01.glb'
	}),
	new ModelMap({
		name: 'Bull_01',
		displayName: 'Bull 1',
		path: '/models/undertow/Bull_01.glb'
	}),
	new ModelMap({
		name: 'Bull_02',
		displayName: 'Bull 2',
		path: '/models/undertow/Bull_02.glb'
	}),
	new ModelMap({
		name: 'BurntBoy_01',
		displayName: 'Burnt Boy',
		path: '/models/undertow/BurntBoy_01.glb'
	}),
	new ModelMap({
		name: 'Cavallo_01',
		displayName: 'Cavallo',
		path: '/models/undertow/Cavallo_01.glb'
	}),
	new ModelMap({
		name: 'Crocodile_01',
		displayName: 'Crocodile',
		path: '/models/undertow/Crocodile_01.glb'
	}),
	new ModelMap({
		name: 'Gargoyle_01',
		displayName: 'Gargoyle 1',
		path: '/models/undertow/Gargoyle_01.glb'
	}),
	new ModelMap({
		name: 'Gargoyle_02',
		displayName: 'Gargoyle 2',
		path: '/models/undertow/Gargoyle_02.glb'
	}),
	new ModelMap({
		name: 'Gargoyle_04',
		displayName: 'Gargoyle 4',
		path: '/models/undertow/Gargoyle_04.glb'
	}),
	new ModelMap({
		name: 'Gargoyle_05',
		displayName: 'Gargoyle 5',
		path: '/models/undertow/Gargoyle_05.glb'
	}),
	new ModelMap({
		name: 'Leone_01',
		displayName: '',
		path: '/models/undertow/Leone_01.glb'
	}),
	new ModelMap({
		name: 'Misc_01',
		displayName: '',
		path: '/models/undertow/Misc_01.glb'
	}),
	new ModelMap({
		name: 'Misc_02',
		displayName: '',
		path: '/models/undertow/Misc_02.glb'
	}),
	new ModelMap({
		name: 'Misc_05',
		displayName: '',
		path: '/models/undertow/Misc_05.glb'
	}),
	new ModelMap({
		name: 'Zardoz_01',
		displayName: '',
		path: '/models/undertow/Zardoz_01.glb'
	}),
]
export const modelInventory:ModelInventory = new ModelInventory(UndertowModelInventory)


/**
 * Validates a ModelMap inventory for path correctness and uniqueness.
 * Throws an error if validation fails to prevent silent failures in the 3D scene.
 */
export function validateModelInventory(inventory: ModelMap[]){
	const names = new Set<string>();
	const displayNames = new Set<string>(); 
	const paths = new Set<string>();

	inventory.forEach((model, index) => {
		// Checks for .glb extension 
		if (!model.path.toLowerCase().endsWith('.glb')) {
			throw new Error(
				`Invalid Extension: Model "${model.name}" at index ${index} must be a .glb file. Path: ${model.path}`
			)
		}

		// Checks for unique Name
		if (names.has(model.name)) {
            throw new Error(`Duplicate Name: The name "${model.name}" is used more than once in the inventory.`);
        }
        names.add(model.name);
		
		// Checks for unique displayName
		if (displayNames.has(model.displayName)) {
            throw new Error(`Duplicate Name: The name "${model.displayName}" is used more than once in the inventory.`);
        }
        displayNames.add(model.displayName);

		// Checks for unqiue Paths
		if (paths.has(model.path)) {
            throw new Error(`Duplicate Path: The path "${model.path}" is assigned to multiple models.`);
        }
        paths.add(model.path);
	});
	console.log(`✅ Inventory Validated: ${inventory.length} models are ready to load.`);
}
/**
 * Finds a model by name. Returns the ModelMap object or undefined if not found.
 */
export function getModelByName(nameToSearch: string): ModelMap | undefined {
    return UndertowModelInventory.find(model => model.name === nameToSearch);
}




export type ModelName = UndertowModel | Various;

export type UndertowModel =
	| 'Arch_01'
	| 'Bull_01'
	| 'Bull_02'
	| 'BurntBoy_01'
	| 'Cavallo_01'
	| 'Crocodile_01'
	| 'Gargoyle_01'
	| 'Gargoyle_02'
	| 'Gargoyle_03'
	| 'Gargoyle_04'
	| 'Gargoyle_05'
	| 'Leone_01'
	| 'Misc_01'
	| 'Misc_02'
	| 'Misc_05'
	| 'Zardoz_01';

export type Various = 
	| 'Archway_Multiple_01'
	| 'BT_02';

export const MODEL_PATHS: Record<string, string> = {
	//Undertow
	Arch_01: '/models/undertow/Arch_01.glb',
	Bull_01: '/models/undertow/Bull_01.glb',
	Bull_02: '/models/undertow/Bull_02.glb',
	BurntBoy_01: '/models/undertow/BurntBoy_01.glb',
	Cavallo_01: '/models/undertow/Cavallo_01.glb',
	Crocodile_01: '/models/undertow/Crocodile_01.glb',
	Gargoyle_01: '/models/undertow/Gargoyle_01.glb',
	Gargoyle_02: '/models/undertow/Gargoyle_02.glb',
	Gargoyle_04: '/models/undertow/Gargoyle_04.glb',
	Gargoyle_05: '/models/undertow/Gargoyle_05.glb',
	Leone_01: '/models/undertow/Leone_01.glb',
	Misc_01: '/models/undertow/Misc_01.glb',
	Misc_02: '/models/undertow/Misc_02.glb',
	Misc_05: '/models/undertow/Misc_05.glb',
	Zardoz_01: '/models/undertow/Zardoz_01.glb',
	//Various
	Archway_Multiple_01: '/models/various/Archway_Multiple_01.glb',
	BT_02: '/models/various/BT_02.glb'
	
};
export const BASE_TRANSFORM: Transform3D = {
	translate: { x: 0, y: 0, z: 0 },
	rotation: { x: 0, y: 0, z: 0, w: 0 },
	scale: { x: 1, y: 1, z: 1 }
};

/**
 * Gets the model path associated to the model name
 * @param modelName like Zardoz_01
 * @returns .glb path like /models/undertow/Zardoz_01.glb
 */
export function getModelPath(modelName: string): string {
	if (modelName.endsWith(".glb")){
		console.log("WARNING: file model name should not end with '.glb'")
	}
	const path = MODEL_PATHS[modelName];
	if (!path) {
		const err = new Error(
			`Model not found path not found: ${modelName}. Check make sure models name and path is properly added to models.ts`
		);
		err.name = 'ModelNotFoundError';
		throw err;
	}
	return path;
}




