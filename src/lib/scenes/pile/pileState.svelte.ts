import type { Group, Object3DEventMap } from "three";



export const pileState: {
    selectedObject: unknown,
    pileObjectRefs: Array<Group<Object3DEventMap>>
} =$state({
    selectedObject: null,
    pileObjectRefs: []
});

export function pushObjectRef(ref:Group<Object3DEventMap>){
    if ( !ref ){ return}
    if ( !ref.name || typeof ref.name != "string" || ref.name == ''){console.log("Ref Does not have a name"); return}
    pileState.pileObjectRefs.push(ref)
}