import type { CurrentWritable } from '@threlte/core';
import type { WebGLRenderer, Scene, Camera } from 'three';


/**
 * Captures the current state of a Threlte/Three.js scene and returns a Blob.
 */
export async function captureThrelteScene(
    renderer: WebGLRenderer,
    scene: Scene,
    camera: CurrentWritable<Camera>,
    imageType: 'image/jpeg' |'image/png' | 'image/webp' = 'image/png',
    quality: number = 1
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        renderer.render(scene, camera.current)
        const canvas = renderer.domElement
        canvas.toBlob((blob) => {
            if(blob) {
                resolve(blob);
            }else{
                reject(new Error("Failed to capture canvas"))
            }
        }, imageType, quality)
    })
}