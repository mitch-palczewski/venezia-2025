/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseNetworkManager, type BaseRecord } from '$lib/api/networkManager.svelte';
import type { UUID } from 'crypto';



/**
 * @template DatabaseObj - The shape of the row in Database
 * @template AppObj - The shape of the object in Application
 * @template K - The name of the primary key (defaults to 'id')
 */
export class DatabaseMap<DatabaseObj extends BaseRecord<K>, AppObj, K extends string = 'id'> {
	public onAppObjInserted?: (newRecord: AppObj) => void;
	public onAppObjUpdated?: (newRecord: AppObj) => void;
	public onAppObjDeleted?: (id: DatabaseObj[K]) => void;
	public convertDatabaseObjToAppObj: (databaseObj: DatabaseObj) => AppObj;
	public convertAppObjToDatabaseObj: (appObj: AppObj) => Partial<DatabaseObj>;
	public sessionID: UUID
	public sessionFeildName?: keyof DatabaseObj;
	private networkManager: SupabaseNetworkManager<DatabaseObj, K>;
	
	constructor(
		networkManager: SupabaseNetworkManager<DatabaseObj, K>,
		convertDatabaseObjToAppObj: (databaseObj: DatabaseObj) => AppObj,
		convertAppObjToDatabaseObj: (appObj: AppObj) => Partial<DatabaseObj>,
		sessionFeildName?: keyof DatabaseObj,
		sessionID?: UUID,
		onAppObjInserted?: (newRecord: AppObj) => void,
		onAppObjUpdated?: (newRecord: AppObj) => void,
		onAppObjDeleted?: (id: DatabaseObj[K]) => void,
	) {
		this.onAppObjInserted = onAppObjInserted;
		this.onAppObjUpdated = onAppObjUpdated;
		this.onAppObjDeleted = onAppObjDeleted;
		this.convertAppObjToDatabaseObj = convertAppObjToDatabaseObj;
		this.convertDatabaseObjToAppObj = convertDatabaseObjToAppObj;
		this.sessionID = sessionID ?? crypto.randomUUID();
		this.sessionFeildName = sessionFeildName;

		this.networkManager = networkManager;
		this.networkManager.onInsertAction = this.onDatabaseObjInserted
		this.networkManager.onUpdateAction = this.onDatabaseObjUpdated
		this.networkManager.onDeleteAction = this.onDatabaseObjDeleted
		this.networkManager.subscribe();
	}

	public addObject(appObj: AppObj) {
		const dbObject = this.convertAppObjToDatabaseObj(appObj);
		if (!dbObject) return;
		if (this.sessionFeildName && dbObject[this.sessionFeildName]) {
			dbObject[this.sessionFeildName] = this.sessionID as any;
		}
		this.networkManager.insert(dbObject);
	}

	public updateObject(appObj: AppObj) {
		const dbObject = this.convertAppObjToDatabaseObj(appObj);
		if (!dbObject) return;
		const pk = this.networkManager.primaryKeyFeildName
		const idValue = dbObject[pk]
		if (!idValue) {
			console.error(`Database object ${dbObject.name} must have a primary key: ${pk} `, dbObject);
			return;
		}
		if (this.sessionFeildName && dbObject[this.sessionFeildName]) {
			dbObject[this.sessionFeildName] = this.sessionID as any;
		}
		this.networkManager.update(idValue, dbObject);
	}

	public deleteObject(id: DatabaseObj[K]) {
		this.networkManager.delete(id);
	}

	private onDatabaseObjInserted = (databaseObj: DatabaseObj) => {
		const pileObject = this.convertDatabaseObjToAppObj(databaseObj);
		if (!pileObject) return;
		this.onAppObjInserted?.(pileObject);
	}
	private onDatabaseObjUpdated = (databaseObj: DatabaseObj) => {
		const pileObject = this.convertDatabaseObjToAppObj(databaseObj);
		if (!pileObject) return;
		this.onAppObjUpdated?.(pileObject);
	}
	private onDatabaseObjDeleted = (databaseObj: Partial<DatabaseObj>) => {
		const pk = this.networkManager.primaryKeyFeildName
		const idValue = databaseObj[pk]
		if (!idValue) return;
		this.onAppObjDeleted?.(idValue);
	}
}
