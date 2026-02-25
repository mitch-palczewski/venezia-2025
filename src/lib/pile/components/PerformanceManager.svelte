<script lang="ts">

    //Not used
    import {useTask} from '@threlte/core'
	import type { PileApp } from '../util/pileApp.svelte';
	import { onMount } from 'svelte';

    let {app}: {app:PileApp} = $props();


    const FPS_THRESHOLD = 45; 
    const SAMPLE_SIZE = 100;
    let frameTimes: number[] = []

    onMount(() => {
        const RAM = (navigator as any).deviceMemory || 8;
        const cores = navigator.hardwareConcurrency || 4;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile || RAM < 4 || cores < 4){
            app.quality = 'low'
        } else if (RAM < 8){
            app.quality = 'medium'
        } else {
            app.quality = 'high'
        }

        console.log(`Inital Quality Set: ${app.quality} (RAM: ${RAM}GB, Cores: ${cores})`)
    })

    useTask((delta) => {
        if(app.quality === 'low') return;
        if (delta > 0.1) return;
        frameTimes.push(delta);
        if(frameTimes.length > SAMPLE_SIZE) frameTimes.shift();

        if(frameTimes.length === SAMPLE_SIZE) {
            const avgDelta = frameTimes.reduce((a,b) => a+b, 0) / SAMPLE_SIZE
            const currentFps = 1/avgDelta;

            if(currentFps < FPS_THRESHOLD){
                downgrade();
                frameTimes = [];
            }
        }
    })

    function downgrade() {
        if(app.quality === 'high'){
            app.quality = 'medium';
            console.warn("Performace dip: Downgrading to Medium Quality")
        } else if (app.quality === 'medium'){
            app.quality = 'low'; 
            console.warn("Performance dip: Downgrading to Low Quality (meshBounds active)")
        }
    }
</script>