/* eslint-disable @typescript-eslint/no-explicit-any */
import { useThrelte } from '@threlte/core';
import { Vector3, Plane, Raycaster, Vector2, Quaternion, type Object3D, type Camera } from 'three';

export interface CameraPlaneDragOptions {
  onPickUp?: (object?: Object3D) => void;
  onDrop?: (object?: Object3D) => void;
  scrollSpeed?: number;
  rotationSpeed?: number;
  minDistance?: number; 
}

export function useCameraPlaneDrag({
  onPickUp,
  onDrop,
  scrollSpeed = .5,
  rotationSpeed = 0.01,
  minDistance = 0.5
}: CameraPlaneDragOptions = {}) {
  const { camera, renderer } = useThrelte();

  let activeObject: Object3D | null = null;
  let interactionMode: 'translate' | 'rotate' | null = null;

  const math = {
    plane: new Plane(),
    raycaster: new Raycaster(),
    planeNormal: new Vector3(),
    camDir: new Vector3(),
    camPos: new Vector3(),
    initialIntersection: new Vector3(),
    intersection: new Vector3(),
    offset: new Vector3(),
    mouse: new Vector2(),
    
    // Rotation helpers
    previousMouse2D: new Vector2(),
    quatY: new Quaternion(),
    quatX: new Quaternion(),
    worldUp: new Vector3(0, 1, 0),
    worldRight: new Vector3(1, 0, 0)
  };

  const getCurrentCamera = (): Camera | null => {
    return (camera as any)?.current ?? camera;
  };

  const getCanvas = (e: MouseEvent | WheelEvent): HTMLElement | null => {
    const r = renderer as any;
    return r?.domElement ?? r?.current?.domElement ?? (e.target as HTMLElement);
  };

  const updateMouseCoordinates = (e: MouseEvent | WheelEvent) => {
    const canvas = getCanvas(e);
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    math.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    math.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const preventContextMenu = (e: MouseEvent) => e.preventDefault();


  const initializeDragPlane = (currentCamera: Camera, object: Object3D) => {
    const worldPos = new Vector3();
    object.getWorldPosition(worldPos);

    currentCamera.getWorldDirection(math.planeNormal).negate();
    math.plane.setFromNormalAndCoplanarPoint(math.planeNormal, worldPos);

    math.raycaster.setFromCamera(math.mouse, currentCamera);

    if (math.raycaster.ray.intersectPlane(math.plane, math.initialIntersection)) {
      math.offset.copy(math.initialIntersection).sub(worldPos);
    } else {
      math.offset.set(0, 0, 0);
    }
  };

  const moveObjectToMouse = (currentCamera: Camera) => {
    if (!activeObject) return;

    math.raycaster.setFromCamera(math.mouse, currentCamera);

    if (math.raycaster.ray.intersectPlane(math.plane, math.intersection)) {
      const targetWorldPos = math.intersection.clone().sub(math.offset);

      if (activeObject.parent) {
        activeObject.parent.worldToLocal(targetWorldPos);
      }

      activeObject.position.copy(targetWorldPos);
    }
  };


  const rotateObject = (deltaX: number, deltaY: number) => {
    if (!activeObject) return;

    math.quatY.setFromAxisAngle(math.worldUp, deltaX * rotationSpeed);
    math.quatX.setFromAxisAngle(math.worldRight, deltaY * rotationSpeed);

    activeObject.quaternion.premultiply(math.quatY);
    activeObject.quaternion.premultiply(math.quatX);
  };

  const attachWindowListeners = () => {
    window.addEventListener('contextmenu', preventContextMenu);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('wheel', onWheel, { passive: false });
  };

  const detachWindowListeners = () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('wheel', onWheel);
    
    setTimeout(() => {
      window.removeEventListener('contextmenu', preventContextMenu);
    }, 10);
  };

  const onPointerDown = (event: any, object: Object3D) => {
    const nativeEv = event.nativeEvent || event;
    
    if (nativeEv.button !== 0 && nativeEv.button !== 2) return;

    event.stopPropagation();
    const currentCamera = getCurrentCamera();

    if (!currentCamera || !object) return;

    activeObject = object;
    interactionMode = nativeEv.button === 0 ? 'translate' : 'rotate';

    if (interactionMode === 'translate') {
      updateMouseCoordinates(nativeEv);
      initializeDragPlane(currentCamera, object);
    } else if (interactionMode === 'rotate'){
      math.previousMouse2D.set(nativeEv.clientX, nativeEv.clientY);
    }

    attachWindowListeners();
    onPickUp?.(activeObject);
  };

  const onPointerMove = (e: PointerEvent) => {
    const currentCamera = getCurrentCamera();
    if (!activeObject || !currentCamera || !interactionMode) return;

    if (interactionMode === 'translate') {
      updateMouseCoordinates(e);
      moveObjectToMouse(currentCamera);
    } 
    else if (interactionMode === 'rotate') {
      const deltaX = e.clientX - math.previousMouse2D.x;
      const deltaY = e.clientY - math.previousMouse2D.y;

      rotateObject(deltaX, deltaY);
      math.previousMouse2D.set(e.clientX, e.clientY);
    }
  };

  const onPointerUp = (e?: PointerEvent) => {
    if (!activeObject) return;

    onDrop?.(activeObject);
    activeObject = null;
    interactionMode = null;

    detachWindowListeners();
  };

  const onWheel = (e: WheelEvent) => {
    const currentCamera = getCurrentCamera();
    if (!activeObject || !currentCamera || interactionMode !== 'translate') return;

    e.preventDefault();

    currentCamera.getWorldDirection(math.camDir);
    currentCamera.getWorldPosition(math.camPos);

    const currentDistance = math.plane.distanceToPoint(math.camPos);

    const wheelSign = Math.sign(e.deltaY);

    let distanceShift = -wheelSign * Math.max(currentDistance * 0.15, 0.05) * scrollSpeed;

    if (currentDistance + distanceShift < minDistance) {
      distanceShift = minDistance - currentDistance;
    }

    if (Math.abs(distanceShift) > 0.0001) {
      math.camDir.multiplyScalar(distanceShift);
      math.plane.translate(math.camDir);
      moveObjectToMouse(currentCamera);
    }
  };

  return { onPointerDown };
}