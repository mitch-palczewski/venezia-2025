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
    return data;
}

export function generateTerrainGeometry(width = 7500, height = 7500, height_data:Uint8Array | null = null){
  if(!height_data){
    height_data = generateTerrainHeight()
  }
  const geometry = new THREE.PlaneGeometry(width, height);
  geometry.rotateX(-Math.PI/2);
  const vertices = geometry.attributes.position.array;
  for (let i=0, j=0, len = vertices.length; i < len; i++, j += 3){
    vertices[j+1] = height_data[i] * 10;
  }
  return geometry
}