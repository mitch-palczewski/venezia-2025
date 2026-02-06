

import Papa from 'papaparse';

import { Object2DMap } from "./object2DMap"
import { Object3DMap } from "./object3DMap"


export const test2D: Object2DMap[] = [
	new Object2DMap({
		name: 't1',
		displayName: 'Test Svg',
		category: 'test',
		path: '/images/pile/t1.svg',
		fileType: 'svg'
	}),
	new Object2DMap({
		name: 'Rest',
		displayName: 'Sheild Man',
		category: 'test',
		path: '/images/pile/Rest.PNG',
		fileType: 'png'
	}),
]



export const undertowModels:Object3DMap[] = [
	new Object3DMap({
		name: 'Arch_01',
		displayName: 'Arch',
		path: '/models/undertow/Arch_01.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Bull_01',
		displayName: 'Bull 1',
		path: '/models/undertow/Bull_01.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Bull_02',
		displayName: 'Bull 2',
		path: '/models/undertow/Bull_02.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'BurntBoy_01',
		displayName: 'Burnt Boy',
		path: '/models/undertow/BurntBoy_01.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Cavallo_01',
		displayName: 'Cavallo',
		path: '/models/undertow/Cavallo_01.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Crocodile_01',
		displayName: 'Crocodile',
		path: '/models/undertow/Crocodile_01.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Gargoyle_01',
		displayName: 'Gargoyle 1',
		path: '/models/undertow/Gargoyle_01.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Gargoyle_02',
		displayName: 'Gargoyle 2',
		path: '/models/undertow/Gargoyle_02.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Gargoyle_04',
		displayName: 'Gargoyle 4',
		path: '/models/undertow/Gargoyle_04.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Gargoyle_05',
		displayName: 'Gargoyle 5',
		path: '/models/undertow/Gargoyle_05.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Leone_01',
		displayName: 'Leone',
		path: '/models/undertow/Leone_01.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Misc_01',
		displayName: 'Pizzas Alive!',
		path: '/models/undertow/Misc_01.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Misc_02',
		displayName: 'Jaw Line',
		path: '/models/undertow/Misc_02.glb',
		category: 'undertow',
		baseScale: 10,
	}),
	new Object3DMap({
		name: 'Misc_05',
		displayName: 'Head Smoking',
		path: '/models/undertow/Misc_05.glb',
		category: 'undertow'
	}),
	new Object3DMap({
		name: 'Zardoz_01',
		displayName: 'Zardoz',
		path: '/models/undertow/Zardoz_01.glb',
		category: 'undertow'
	}),
]
export const variousModels: Object3DMap[] = [
	new Object3DMap({
		name: 'Archway_Multiple_01',
		displayName: 'Archways',
		path: '/models/various/Archway_Multiple_01.glb'
	}),
	new Object3DMap({
		name: 'BT_02',
		displayName: 'Head 1',
		path: '/models/various/BT_02.glb'
	}),
	

]
export const potFace: Object3DMap[]=[
	new Object3DMap({
		name: 'Misc_05_fingers',
		displayName: 'Pot Face Fingers',
		path: '/models/pot_face/Misc_05_fingers.glb'
	}),
	new Object3DMap({
		name: 'Misc_05_big_eye',
		displayName: 'Pot Face Big Eye',
		path: '/models/pot_face/Misc_05_big_eye.glb'
	}),
	new Object3DMap({
		name: 'Misc_05_pot',
		displayName: 'Pot For Face',
		path: '/models/pot_face/Misc_05_pot.glb'
	}),
]
export const architectureModels: Object3DMap[]=[
	new Object3DMap({
		name: 'Optimize_02',
		displayName: 'Spire 01',
		path: '/models/architecture/Optimize_02.glb'
	}),
]

export const variousMP: Object3DMap[]=[
	new Object3DMap({
		name: 'Courtyard_01',
		displayName: 'Courtyard',
		path: '/models/various-mp/Courtyard_01.gltf',
		useMeshBounds: true
	}),
	new Object3DMap({
		name: 'shape_01',
		displayName: 'shape 01',
		path: '/models/various-mp/shape3D_01.gltf'
	}),
	new Object3DMap({
		name: 'Ibix_01',
		displayName: 'Ibix',
		path: '/models/various-mp/Ibix_01_LOD1.glb'
	}),
]



export const allModels:Object3DMap[]= await initializeModels()
console.log(allModels)


export async function initializeModels(): Promise<Object3DMap[]> {
    // Step 1: Get files from glob
    const allFiles = import.meta.glob('$lib/assets/3D/**/*.*', {
        eager: true,
        query: '?url',
        import: 'default'
    });

    // Step 2 & 3: Iterate and Group
    const groupedAssets = groupFilesByFolder(allFiles);

    // Step 4, 5 & 6: Open CSVs and create the Object3DMap array
    const modelPromises = Object.entries(groupedAssets).map(async ([folderName, assets]) => {
        
        // Default to folder name if CSV is missing
        let displayName = folderName; 
        
        if (assets.csv) {
            displayName = await getDisplayNameFromCSV(assets.csv) || folderName;
        }
		

        return new Object3DMap({
            name: folderName,
            displayName: displayName,
            path: assets.glb || "" // The path to the 3D file
        });
    });

    // Wait for all fetches to finish and return the final array
    return await Promise.all(modelPromises);
}


type AssetGroup = { glb?: string; csv?: string; png?: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function groupFilesByFolder(allFiles: Record<string, any>) {
    const groups: Record<string, AssetGroup> = {};

    for (const path in allFiles) {
        const url = allFiles[path] as string;
        const parts = path.split('/');
        const folderName = parts[parts.length - 2];

        if (!groups[folderName]) groups[folderName] = {};

        if (path.endsWith('.glb') || path.endsWith('.gltf')) groups[folderName].glb = url;
        if (path.endsWith('.csv')) groups[folderName].csv = url;
        if (path.endsWith('.png')) groups[folderName].png = url;
    }
    return groups;
}

interface MetadataRow {
    Header: string;
	Value: string;
	Notes: string;
    // Add other columns here if needed, e.g., description: string;
}

async function getDisplayNameFromCSV(url: string): Promise<string | null> {
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parsed = Papa.parse<MetadataRow>(text, { 
            header: true, 
            skipEmptyLines: true 
        });
        
		let displayName = null
        // Return the display_name column from the first row
		parsed.data.forEach((row) => {
			if (row.Header === "name_display"){
				displayName = row.Value
			}
		})
			
		
        return displayName;
    } catch (err) {
        console.error("CSV Parse Error:", err);
        return "Error Loading Name";
    }
}