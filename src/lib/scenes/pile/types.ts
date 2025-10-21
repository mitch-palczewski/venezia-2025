export type Vec3 = [number, number, number]
export type ObjectTransform = {
    position: Vec3,
    rotation: Vec3,
    scale: Vec3
}
export type ObjectPositions = Record<string, ObjectTransform>