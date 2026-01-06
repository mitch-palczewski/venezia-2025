/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY } from '$env/static/public';
import type { PilePayloadObject } from '$lib/pile';
import { SvelteDate } from 'svelte/reactivity';
import type { PileApp } from '$lib/pile/util/pileApp.svelte';

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const PILE_TABLE_NAME = 'pile_objects';

export const supabase = createClient(supabaseUrl, supabaseKey);

export class PileNetworkManager {
	public store = $state<PilePayloadObject[]>([]);
	private supabase: SupabaseClient;
	private channel: any = null;
	private pileApp: PileApp | null = null;

	constructor(supabase: SupabaseClient, initalData: PilePayloadObject[] = [], pileApp?: PileApp) {
		this.supabase = supabase;
		this.store = initalData;
		if (pileApp) {
			this.pileApp = pileApp;
		}
	}

	public init() {
		this.channel = this.supabase
			.channel('schema-db-changes')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: PILE_TABLE_NAME
				},
				(payload) => this.handleRealtimeEvent(payload)
			)
			.subscribe();
	}

	public destroy() {
		if (this.channel) {
			this.supabase.removeChannel(this.channel);
		}
	}

	private handleRealtimeEvent(payload: any) {
		const { eventType, new: newRecord, old: oldRecord } = payload;
		switch (eventType) {
			case 'INSERT':
				if (!this.pileApp) {
					this.store.unshift(newRecord as PilePayloadObject);
					break;
				}
				this.pileApp.addSupabaseObject(newRecord);
				break;

			case 'UPDATE': {
				const index = this.store.findIndex((item) => item.id === newRecord.id);
				if (index !== -1) {
					this.store[index] = newRecord as PilePayloadObject;
				}
				break;
			}

			case 'DELETE':
				this.store = this.store.filter((item) => item.id !== oldRecord.id);
				break;
		}
	}

	public async addObject(obj: Partial<PilePayloadObject>) {
		const { error } = await this.supabase.from(PILE_TABLE_NAME).insert(obj);

		if (error) console.error('Error adding object:', error);
	}

	public async updateObject(id: string, changes: Partial<PilePayloadObject>) {
		const payload = { ...changes, updated_at: new SvelteDate().toISOString() };
		const { error } = await this.supabase.from(PILE_TABLE_NAME).update(payload).eq('id', id);
		if (error) console.error('Error updating object:', error);
	}

	public async deleteObject(id: string) {
		console.log('Deleting id: ', id);
		const { error } = await this.supabase.from(PILE_TABLE_NAME).delete().eq('id', id);

		if (error) {
			console.error('Error deleting object:', error);
		}
	}
}
