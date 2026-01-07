/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseNetworkManager, type BaseRecord } from '$lib/api/networkManager.svelte';
import type { SupabaseClient } from '@supabase/supabase-js';


/**
 * @template DatabaseObj - The shape of the row in Database
 * @template AppObj - The shape of the object in Application
 */
export class DatabaseMap<DatabaseObj extends BaseRecord, AppObj> {
	private networkManager: SupabaseNetworkManager<DatabaseObj>;
	private sessionID = crypto.randomUUID();
	private sessionFeildName?: keyof DatabaseObj;
	private onAppObjInserted: (newRecord: AppObj) => void;
	private onAppObjUpdated: (newRecord: AppObj) => void;
	private onAppObjDeleted: (id: DatabaseObj['id']) => void;
	private convertDatabaseObjToAppObj: (databaseObj: DatabaseObj) => AppObj;
	private convertAppObjToDatabaseObj: (appObj: AppObj) => Partial<DatabaseObj>;

	constructor(
		supabase: SupabaseClient,
		tableName: string,
		onAppObjInserted: (newRecord: AppObj) => void,
		onAppObjUpdated: (newRecord: AppObj) => void,
		onAppObjDeleted: (id: DatabaseObj['id']) => void,
		convertDatabaseObjToAppObj: (databaseObj: DatabaseObj) => AppObj,
		convertAppObjToDatabaseObj: (appObj: AppObj) => Partial<DatabaseObj>,
		sessionFeildName?: keyof DatabaseObj
	) {
		this.onAppObjInserted = onAppObjInserted;
		this.onAppObjUpdated = onAppObjUpdated;
		this.onAppObjDeleted = onAppObjDeleted;
		this.convertAppObjToDatabaseObj = convertAppObjToDatabaseObj;
		this.convertDatabaseObjToAppObj = convertDatabaseObjToAppObj;
		this.sessionFeildName = sessionFeildName;

		this.networkManager = new SupabaseNetworkManager<DatabaseObj>(
			supabase,
			tableName,
			this.onDatabaseObjInserted,
			this.onDatabaseObjUpdated,
			this.onDatabaseObjDeleted
		);
		this.networkManager.subscribe();
	}

    public destroy(){
        this.networkManager.destroy()
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
		if (!dbObject.id) {
			console.error(`Database object ${dbObject.name} must have an id `, dbObject);
			return;
		}
		if (this.sessionFeildName && dbObject[this.sessionFeildName]) {
			dbObject[this.sessionFeildName] = this.sessionID as any;
		}
		this.networkManager.update(dbObject.id, dbObject);
	}

	public deleteObject(id: DatabaseObj['id']) {
		this.networkManager.delete(id);
	}

	private onDatabaseObjInserted = (databaseObj: DatabaseObj) => {
		const pileObject = this.convertDatabaseObjToAppObj(databaseObj);
		if (!pileObject) return;
		this.onAppObjInserted(pileObject);
	}
	private onDatabaseObjUpdated = (databaseObj: DatabaseObj) => {
		const pileObject = this.convertDatabaseObjToAppObj(databaseObj);
		if (!pileObject) return;
		this.onAppObjUpdated(pileObject);
	}
	private onDatabaseObjDeleted = (databaseObj: Partial<DatabaseObj>) => {
		if (!databaseObj.id) return;
		this.onAppObjDeleted(databaseObj.id);
	}
}
