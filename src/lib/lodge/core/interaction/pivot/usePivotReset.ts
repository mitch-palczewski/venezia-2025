import { Object3D, Quaternion, Vector3 } from 'three';
import { useKeyCycle } from '../key-listeners/useKeyCycle.svelte';

const X_AXIS = new Vector3(1, 0, 0);
const Y_AXIS = new Vector3(0, 1, 0);
const Z_AXIS = new Vector3(0, 0, 1);

const STEP_QUATERNIONS = [
  new Quaternion().setFromAxisAngle(X_AXIS, 0),                 // 0° X
  new Quaternion().setFromAxisAngle(X_AXIS, Math.PI / 2),        // 90° X
  new Quaternion().setFromAxisAngle(X_AXIS, Math.PI),            // 180° X
  new Quaternion().setFromAxisAngle(X_AXIS, (3 * Math.PI) / 2),  // 270° X
  new Quaternion().setFromAxisAngle(Y_AXIS, 0),                 // 0° Y
  new Quaternion().setFromAxisAngle(Y_AXIS, Math.PI / 2),        // 90° Y
  new Quaternion().setFromAxisAngle(Y_AXIS, Math.PI),            // 180° Y
  new Quaternion().setFromAxisAngle(Y_AXIS, (3 * Math.PI) / 2),  // 270° Y
  new Quaternion().setFromAxisAngle(Z_AXIS, 0),                 // 0° Z
  new Quaternion().setFromAxisAngle(Z_AXIS, Math.PI / 2),        // 90° Z
  new Quaternion().setFromAxisAngle(Z_AXIS, Math.PI),            // 180° Z
  new Quaternion().setFromAxisAngle(Z_AXIS, (3 * Math.PI) / 2)   // 270° Z
];

interface ResetOptions {
  cycleForwardKey?: string;
  cycleBackwardKey?: string | null;
  pivotName?: string;
}

export function usePivotReset(
  getTarget: () => Object3D | undefined | null,
  options: ResetOptions = {}
) {
  const {
    cycleForwardKey = 'KeyR',
    cycleBackwardKey = 'KeyE',
    pivotName = 'pivot'
  } = options;

  const applyQuaternion = (quat: Quaternion) => {
    const target = getTarget();
    if (!target) return;

    const pivot = target.getObjectByName(pivotName) ?? target;
    pivot.quaternion.copy(quat);
  };

  const getStepQuaternion = useKeyCycle(
    STEP_QUATERNIONS,
    cycleForwardKey,
    cycleBackwardKey,
    0,
    (newQuat) => applyQuaternion(newQuat)
  );

  return {
    reset: () => {
      getStepQuaternion.setIndex(0);
      applyQuaternion(STEP_QUATERNIONS[0]);
    },
    getStepIndex: getStepQuaternion.getIndex
  };
}