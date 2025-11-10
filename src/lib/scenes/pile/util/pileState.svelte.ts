import type { Group, Object3DEventMap } from "three";
import type { TransformControlsMode } from "three/examples/jsm/Addons.js";
import type { Model, PileModels } from "../types";

export const pileState: {
    selectedObject: null | Model,
    pileObjectRefs: Array<Group<Object3DEventMap>>,
    showTransformControls: boolean,
    transformControlsMode: TransformControlsMode,
    newModels: PileModels,
    maxID: number
} =$state({
    selectedObject: null,
    pileObjectRefs: [],
    showTransformControls: false,
    transformControlsMode: "translate",
    newModels: [],
    maxID: 1000
});

export function pushObjectRef(ref:Group<Object3DEventMap>){
    if ( !ref ){ return}
    if ( !ref.name || typeof ref.name != "string" || ref.name == ''){console.log("Ref Does not have a name"); return}
    pileState.pileObjectRefs.push(ref)
}

export function isSelectedObject(name:string){
    if (pileState.selectedObject && pileState.selectedObject.name === name){     
        return true;
    }
    return false;
}