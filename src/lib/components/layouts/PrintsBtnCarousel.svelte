<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  const carouselImages = [
    { src: '/images/prints/1_LOD2.avif', alt: 'City Pile Print 1' },
    { src: '/images/prints/2_LOD2.avif', alt: 'City Pile Print 2' },
    { src: '/images/prints/3_LOD2.avif', alt: 'City Pile Print 3' },
    { src: '/images/prints/4_LOD2.avif', alt: 'City Pile Print 3' },
    { src: '/images/prints/5_LOD2.avif', alt: 'City Pile Print 3' },
    { src: '/images/prints/6_LOD2.avif', alt: 'City Pile Print 3' },
    { src: '/images/prints/7_LOD2.avif', alt: 'City Pile Print 3' },
    { src: '/images/prints/8_LOD2.avif', alt: 'City Pile Print 3' },
    { src: '/images/prints/9_LOD2.avif', alt: 'City Pile Print 3' }
  ];

  let currentIndex = $state(0);

  onMount(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % carouselImages.length;
    }, 3000); 

    return () => clearInterval(interval);
  });
</script>

<a
  href="/gallery/prints"
  aria-label="City Pile"
  target="_blank"
  class="group relative flex min-h-0 w-full flex-1 overflow-hidden"
>
  {#key currentIndex}
    <img
      in:fade={{ duration: 1000 }}
      out:fade={{ duration: 1000}}
      src={carouselImages[currentIndex].src}
      alt={carouselImages[currentIndex].alt}
      class="absolute h-full w-full object-cover"
    />
  {/key}

  <div class="absolute inset-0 z-10 flex items-start justify-start p-6">
    <p
      class="bg-teal px-1 text-2xl font-extrabold text-light-green transition-colors duration-300 group-hover:bg-light-yellow group-hover:text-dark-gray"
    >
      Prints
    </p>
  </div>
</a>