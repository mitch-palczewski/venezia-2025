// NEW FOR SUPABASE 


/**
 * NetworkManager 
 * 
 *  -instance 
 * - supabase: SupabaseClient 
 * - channel: RealtimeChannel
 * - subscriber: Map<string, (data:any) => void>
 * 
 * + init()
 * + getInstance(): NetworkManager
 * 
 * + async fetchAllObjects(): data:any
 * 
 * //listens to changes in DB
 * + subscribeToChanges(onUpdate: (payload:any) => void): SupabaseClient  
 * 
 * //Updates a specific object
 * + async updateObject(id:string, updates: Partial<any>):
 * 
 */