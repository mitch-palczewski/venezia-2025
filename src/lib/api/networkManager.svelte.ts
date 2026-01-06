/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from '@supabase/supabase-js';
import { SvelteDate } from 'svelte/reactivity';

interface BaseRecord {
    id: string;
    [key: string]: any; 
}

export class SupabaseNetworkManager<T extends BaseRecord> {
	public testInventory = $state<T[]>([]);
	private supabase: SupabaseClient;
	private channel: any = null;
	private tableName: string;
	private onInsertAction: (newRecord: T) => void = this.defaultOnInsertObject;
	private onUpdateAction: (newRecord: T) => void = this.defaultOnUpdateObject;
	private onDeleteAction: (oldRecord: Partial<T>) => void = this.defaultOnDeleteObject;

	constructor(
		supabase: SupabaseClient,
		tableName: string,
		onInsertAction?: (newRecord: T) => void,
		onUpdateAction?: (newRecord: T) => void,
		onDeleteAction?: (oldRecord: Partial<T>) => void
	) {
		this.supabase = supabase;
		this.tableName = tableName;
		if (onInsertAction) {
			this.onInsertAction = onInsertAction;
		}
		if (onUpdateAction) {
			this.onUpdateAction = onUpdateAction;
		}
		if (onDeleteAction) {
			this.onDeleteAction = onDeleteAction;
		}
	}

	public subscribe() {
		this.channel = this.supabase
			.channel(`${this.tableName}-changes`)
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: this.tableName
				},
				(payload) => this.handleRealtimeEvent(payload)
			)
			.subscribe();
	}

	public destroy() {
		if (this.channel) {
			this.supabase.removeChannel(this.channel);
            this.channel = null;
		}
	}

	private handleRealtimeEvent(payload: any) {
		const { eventType, new: newRecord, old: oldRecord } = payload;
		switch (eventType) {
			case 'INSERT':
				this.onInsertAction(newRecord as T);
				break;

			case 'UPDATE': {
				this.onUpdateAction(newRecord as T);
				break;
			}

			case 'DELETE':
				this.onDeleteAction(oldRecord as Partial<T>);
				break;
		}
	}

	public async insert(obj: Omit<T, 'id'> | Partial<T>) {
		const { error } = await this.supabase.from(this.tableName).insert(obj);
		if (error) console.error('Error adding object:', error);
	}

	public async update(id: T['id'], changes: Partial<T>) {
		const payload = { ...changes, updated_at: new SvelteDate().toISOString() };
		const { error } = await this.supabase.from(this.tableName).update(payload).eq('id', id);
		if (error) console.error('Error updating object:', error);
	}

	public async delete(id: T['id']) {
		console.log('Deleting id: ', id);
		const { error } = await this.supabase.from(this.tableName).delete().eq('id', id);
		if (error) console.error('Error deleting object:', error);
	}

	private defaultOnInsertObject(newRecord: T) {
		this.testInventory.unshift(newRecord);
		console.warn(
			`Attemping to handle INSERT of new Record. Set NetworkManager onInsertObject(newRecord:any) => void`,
			newRecord
		);
	}
	private defaultOnUpdateObject(newRecord: T) {
		const index = this.testInventory.findIndex((item) => item.id === newRecord.id);
		if (index !== -1) {
			this.testInventory[index] = newRecord;
		}
		console.warn(
			`Attemping to handle UPDATE of Record. Set NetworkManager onUpdateObject(newRecord:any) => void`,
			newRecord
		);
	}
	private defaultOnDeleteObject(oldRecord: Partial<T>) {
		this.testInventory = this.testInventory.filter((item) => item.id !== oldRecord.id);
		console.warn(
			`Attemping to handle Delete of Record. Set NetworkManager onDeleteObject(newRecord:any) => void`,
			oldRecord
		);
	}
}
