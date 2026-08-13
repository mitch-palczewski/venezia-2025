import type { Object3D } from 'three';

export function getInteractiveEntity(
  hitObject: Object3D | null,
  targets: Object3D[]
): Object3D | null {
  if (!hitObject || targets.length === 0) return null;

  let current: Object3D | null = hitObject;

  while (current) {
    // If current is one of the direct children in interactiveGroup.children
    if (targets.includes(current)) {
      return current; // Returns the TestCube Group
    }
    current = current.parent;
  }

  return null;
}