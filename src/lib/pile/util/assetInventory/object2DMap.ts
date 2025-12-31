import { BaseInventory, BaseMap } from './abstractAssetMap';

type Object2DFileType = 'svg' | 'png';

interface Object2DMapOptions {
	name: string;
	displayName?: string;
	category?: string;
	path: string;
	baseScale?: number;
	fileType: Object2DFileType;
}

export class Object2DMap extends BaseMap {
	readonly category: string;
	readonly baseScale: number;
	readonly fileType: Object2DFileType;
	readonly objectType = '2D';

	constructor({
		name,
		displayName,
		category = 'misc',
		path,
		baseScale = 1,
		fileType
	}: Object2DMapOptions) {
		super(name, path, displayName);
		this.category = category;
		this.baseScale = baseScale;
		this.fileType = fileType;
	}
}

export class Object2DMapInventory extends BaseInventory<Object2DMap> {
	public validate(): void {
		this.validateDuplicates();
		this.items.forEach((item) => {
			const path = item.path.toLowerCase();
			if (!path.endsWith('.png') && !path.endsWith('.svg')) {
				console.warn(`WARNING: Unexpected 2D suffix for ${item.name}: ${item.path}`);
			}
		});
		console.log(`✅ Object2D Validated: ${this.items.length} models.`);
	}
}
