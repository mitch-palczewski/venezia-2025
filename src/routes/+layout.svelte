<script lang="ts">
    import { setViewportContext, Viewport } from '$lib/core';
	import SEO from '$lib/core/seo/SEO.svelte';
    import '../app.css';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

    // Global layout & aspect-ratio engine
    const vp = new Viewport();
    setViewportContext(vp);

    $effect(() => {
        return () => vp.destroy();
    });

    injectSpeedInsights();
    injectAnalytics();

    let { children } = $props();
</script>

<SEO />

<section class="sr-only">
    <h1>PilePilePile: 3D Digital Public Space</h1>
    <p>
        Pile Pile Pile is shared public space in a web-based 3D environment which needs your
        participation. Move, rotate, and scale objects to build community architecture in a persistent
        sandbox. Or just explore. It is space that is meant to be changed, piled on, dug out; an
        ever-evolving sculpture.
    </p>
    <a href="/3d/pile"><h2>Enter PilePilePile</h2></a>
</section>

<div data-ratio={vp.ratioSlug} class="min-h-screen min-w-screen">
    {@render children?.()}
</div>