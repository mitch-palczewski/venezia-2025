import { ImprovedNoise } from "three/examples/jsm/Addons.js";
import * as THREE from 'three'

function makeDeterministicRandom(seedStart = 1) {
  let seed = seedStart;
  return () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}

export function generateTerrainHeight(width = 256, height = 256, octaves = 4){
    let seed = Math.PI/4;
    window.Math.random = function () {
        const x = Math.sin( seed++ ) * 10000;
        return x - Math.floor( x );
    };

    const size = width * height;
    const data = new Uint8Array( size );
    const perlin = new ImprovedNoise();
    const rnd = makeDeterministicRandom(Math.PI/4);
    const z = rnd()* 100;
 
    let quality = 1;

    for ( let o=0;  o < octaves; o++){
        for( let i=0; i<size; i++){
            const x = i % width, y = ~ ~ ( i / width ); 
            data[i] += Math.abs( perlin.noise( x/quality, y/quality, z ) * quality * 1.75);
        }
        quality *= 5;
    }
    return {data, width, height};
}

export function generateTerrainGeometry(
  worldWidth = 7500, 
  worldHeight = 7500, 
  heightScale = 10,
  flatten = false,
  height_payload:{ data: Uint8Array; width: number; height: number } | null = null
){
  if(!height_payload){
    try{
      height_payload = generateTerrainHeight()
    }catch(e){
      console.log(e)
      console.log("Error: Could not generate terrain heights")
      return null;
    } 
  }
  const { data: height_data, width: wSeg, height: hSeg } = height_payload;
  const widthSegments = wSeg-1
  const heightSegments = hSeg-1

  const geometry = new THREE.PlaneGeometry(worldWidth, worldHeight, widthSegments, heightSegments);
  geometry.rotateX(-Math.PI/2);
  const vertices = geometry.attributes.position.array as Float32Array;
  const vertexCount = vertices.length / 3
  const expectedCount = wSeg*hSeg
  if (vertexCount !== expectedCount) {
    console.warn(
      "Vertex count mismatch",
      { vertexCount, expectedCount, widthSegments, heightSegments }
    );
    return null;
  }
  for (let i=0, j=0, len = vertexCount; i < len; i++, j += 3){
    const h = height_data[i]
    vertices[j+1] = flatten ? 0 : h * heightScale;
  }

  geometry.attributes.position.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();
  return geometry
}