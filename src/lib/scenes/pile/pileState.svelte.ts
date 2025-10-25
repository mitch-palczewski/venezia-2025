import type { TransformControls } from "@threlte/extras"


export const pileState: {
    selectedObject: unknown,
    tranformControls: TransformControls | undefined,
    isEditing: boolean
} =$state({
    selectedObject: null,
    tranformControls: undefined,
    isEditing: false
});