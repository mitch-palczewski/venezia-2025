import type { CurrentWritable } from '@threlte/core';
import type { WebGLRenderer, Scene, Camera } from 'three';

/**
 * Synchronously forces a render frame of the specified Three.js scene and 
 * asynchronously encodes the canvas contents into a binary image Blob.
 * * @example
 * ```typescript
 * const screenshot = await captureThrelteScene(renderer, scene, camera, 'image/webp', 0.85);
 * const url = URL.createObjectURL(screenshot);
 * ```
 * * @param {WebGLRenderer} renderer - The active Three.js WebGLRenderer instance driving the canvas graphics.
 * @param {Scene} scene - The specific Three.js Scene graph hierarchy to snapshot.
 * @param {CurrentWritable<Camera>} camera - The Threlte reactive store wrapper containing the active viewing camera.
 * @param {'image/jpeg' | 'image/png' | 'image/webp'} [imageType='image/png'] - The target MIME image encoding format format layout.
 * @param {number} [quality=1] - A compression factor score between 0.0 (max compression) and 1.0 (lossless/best quality). 
 * Only applicable to lossy compression engines like `image/jpeg` or `image/webp`.
 * * @returns {Promise<Blob>} A Promise that resolves with a binary `Blob` object containing the encoded image asset data.
 * @throws {Error} Rejects with an error message if the underlying browser canvas subsystem fails to generate a valid data stream.
 * * @note Because this function manually invokes `renderer.render()` immediately prior to extracting the pixel buffer data stream, 
 * it safely circumvents the classic WebGL "blank canvas" bug without forcing you to set `preserveDrawingBuffer: true` on your renderer instance configuration.
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