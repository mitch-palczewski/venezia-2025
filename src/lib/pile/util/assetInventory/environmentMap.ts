import { BaseInventory, BaseMap } from './abstractAssetMap';

type EnvironmentFileType = 'jpg' | 'hdr' | 'png';

interface EnvironmentMapOptions {
	name: string;
	displayName?: string;
	path: string;
	fileType: EnvironmentFileType;
}

export class EnvironmentMap extends BaseMap {
	readonly fileType: EnvironmentFileType;

	constructor({ name, displayName, path, fileType }: EnvironmentMapOptions) {
		super(name, path, displayName);
		this.fileType = fileType;
	}
}

export class EnvironmentMapInventory extends BaseInventory<EnvironmentMap> {
    public validate(): void {
        this.validateDuplicates();
        this.items.forEach(item => {
            if (!item.path.toLowerCase().endsWith('.jpg') || !item.path.toLowerCase().endsWith('.png')) {
                throw new Error(`WARNING: Unexpected environment suffix for ${item.name}: ${item.path}`);
            }
        });
        console.log(`✅ Object3D Validated: ${this.items.length} models.`);
    }
}


export const testEnvironments: EnvironmentMap[] = [
	new EnvironmentMap({
		name: 'world',
		displayName: 'Marseille',
		path: '/images/environment/world.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'trees',
		displayName: 'Trees',
		path: '/images/environment/trees.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'yellow',
		displayName: 'Yellow',
		path: '/images/environment/yellow.png',
		fileType: 'png'
	})
];
