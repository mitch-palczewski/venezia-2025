<script lang="ts">
	import '../app.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	injectAnalytics();

	let { children } = $props();

	const SEO = {
		title: 'PilePilePile | 3D Digital Public Space',
		description:
			'A community driven art installation featuring 3D models curated by the authors that can be moved, rotated, and scaled by participants in a shared space.',
		url: 'https://pilepilepile.com',
		ogImage: 'https://pilepilepile.com/environment/trees.jpg'
	};
</script>

<svelte:head>
	<title>{SEO.title}</title>
	<meta name="description" content={SEO.description} />
	<link rel="canonical" href={SEO.url} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={SEO.url} />
	<meta property="og:title" content={SEO.title} />
	<meta property="og:description" content={SEO.description} />
	<meta property="og:image" content={SEO.ogImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SEO.title} />
	<meta name="twitter:description" content={SEO.description} />
	<meta name="twitter:image" content={SEO.ogImage} />

	{@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "VisualArtwork",
      "name": "PilePilePile",
      "description": "${SEO.description}",
      "creator": [
        { "@type": "Person", "name": "Mitch Palczewski" },
        { "@type": "Person", "name": "Eben Kling" },
        { "@type": "Person", "name": "Aude Jomini" }
      ],
      "artform": "Interactive 3D Installation",
      "medium": "Digital/Real-time Software"
    }
  </script>`}
</svelte:head>

<section class="sr-only">
	<h1>PilePilePile: 3D Digital Public Space</h1>

	<p>
		A community-driven art installation featuring 3D models curated by the authors. Participants can
		move, rotate, and scale digital sculptures in a shared, real-time interactive 3D environment.
	</p>

	<h2>Created by</h2>
	<ul>
		<li>Mitch Palczewski</li>
		<li>Eben Kling</li>
		<li>Aude Jomini</li>
	</ul>

	<h2>Project Themes and Features</h2>
	<ul>
		<li>Digital Public Space and Collaborative Art</li>
		<li>Interactive 3D Geometry and Real-time Synchronization</li>
		<li>Curated Digital Sculptures and Asset Manipulation</li>
	</ul>
</section>

{@render children?.()}
