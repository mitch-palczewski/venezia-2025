import { Camera, Vector3 } from "three";


const forward = new Vector3();
const side = new Vector3();

export function calculateMovement(
    camera: Camera,
    keys: {w: boolean; s: boolean; a:boolean; d:boolean; space: boolean; shift: boolean},
    speed: number,
    delta: number
): Vector3 | null {
    const direction = new Vector3(0,0,0);
    camera.getWorldDirection(forward)
    forward.y = 0;
    forward.normalize();

    side.crossVectors(camera.up, forward).normalize()

    if (keys.w) direction.add(forward)
    if (keys.s) direction.sub(forward)
    if (keys.a) direction.add(side)
    if (keys.d) direction.sub(side)

    if(keys.space) direction.y += 1;
    if(keys.shift) direction.y -= 1
    
    if(direction.lengthSq() > 0){
        return direction.normalize().multiplyScalar(speed * delta)
    }
    return null
} 