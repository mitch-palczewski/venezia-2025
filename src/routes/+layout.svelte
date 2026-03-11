<script lang="ts">
	import '../app.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	injectAnalytics();

	let { children } = $props();

	const SEO = {
		title: 'PilePilePile | 3D Digital Public Space',
		description:
			'Shared public space in a web-based 3D environment which needs your participation. Move, rotate, and scale objects to build community architecture in a persistent sandbox.',
		url: 'https://www.pilepilepile.com/',
		ogImage: 'https://www.pilepilepile.com/media/SEO_cover.jpg'
	};
</script>

<svelte:head>
	<title>{SEO.title}</title>
	<meta name="description" content={SEO.description} />
	<link rel="canonical" href={SEO.url} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={SEO.url} />
	<meta property="og:title" content={SEO.title} />
	<meta property="og:site_name" content="PilePilePile" />
	<meta property="og:description" content={SEO.description} />
	<meta property="og:image" content={SEO.ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta
		property="og:image:alt"
		content="A screenshot of the PilePilePile 3D interactive art environment."
	/>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SEO.title} />
	<meta name="twitter:description" content={SEO.description} />
	<meta name="twitter:image" content={SEO.ogImage} />
	<meta name="twitter:image:alt" content="Public Space in a 3D digital environment" />

	<script type="application/ld+json">
    {@html JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        "name": "Pile Pile Pile",
        "description": SEO.description,
        "creator": [
            { "@type": "Person", "name": "Mitch Palczewski" },
            { "@type": "Person", "name": "Eben Kling" },
            { "@type": "Person", "name": "Aude Jomini" }
        ],
        "artform": "Interactive 3D Installation",
        "medium": "Digital/Real-time Software"
    })}
	</script>
</svelte:head>

<section class="sr-only">
	<h1>Pile-Pile-Pile: 3D Digital Public Space</h1>
	<h2>PilePilePile</h2>
	<h2>Pile Pile Pile</h2>
	<h2>Pile-3D</h2>
	<p>
		Pile Pile Pile is shared public space in a web-based 3D environment which needs your
		participation. Move, rotate, and scale objects to build community architecture in a persistent
		sandbox. Or just explore. It is space that is meant to be changed, piled on, dug out; an
		ever-evolving sculpture.
	</p>
	<a href="/3d/pile"><h2>Enter PilePilePile</h2></a>
	<a href="https://audehelene.itch.io/city-pile" target="_blank">City Pilemaker</a>
	<a href="https://audehelene.itch.io/pilemaker" target="_blank">Pilemaker (Original)</a>

	<h2>Authors</h2>
	<ul>
		<li>Mitch Palczewski</li>
		<li>Eben Kling</li>
		<li>Aude Jomini</li>
	</ul>

	<p>Organization</p>
	<ul>
		<li>FEEDFEEDNHV</li>
	</ul>

	<p>Tags</p>
	<ul>
		<li>Pile Maker</li>
		<li>Digital Public Space and Collaborative Art</li>
		<li>Interactive 3D Geometry and Real-time Synchronization</li>
		<li>Curated Digital Sculptures and Asset Manipulation</li>
	</ul>
</section>

{@render children?.()}
