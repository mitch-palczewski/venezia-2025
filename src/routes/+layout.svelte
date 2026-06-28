<script lang="ts">
	import SEO from '$lib/core/seo/SEO.svelte';
	import { initViewportContext } from '$lib/core/viewport/viewport.context.svelte';
	import '../app.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	initViewportContext();
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

{@render children?.()}
