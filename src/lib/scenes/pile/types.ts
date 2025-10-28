export type Vec3 = {'x':number, 'y':number, 'z':number}
export type ObjectTransform = {
    position: Vec3,
    rotation: Vec3,
    scale: Vec3
}
export type ObjectPositions = Record<string, ObjectTransform>
export type PilePositionData = {
  'pile_position_data': ObjectPositions;
};
