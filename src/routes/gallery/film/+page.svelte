<script lang="ts">
	import PageHeader from "$lib/dom/components/layouts/PageHeader.svelte";

</script>

<div class="min-h-screen w-full bg-dark-green">
    <div class="sticky top-0 z-10 bg-dark-green px-2 pt-4 pb-4">
        <PageHeader appendTitle={'Film'} />
    </div>
    <div class="mx-auto max-w-4xl p-2 sm:p-4">
        <div class="h-[80vh] w-full bg-black p-1 sm:p-4">
            <iframe
                class="h-full w-full"
                src="https://www.youtube.com/embed/4N1fsPaxdyg?si=lGfyfc7HnqyR96DM&rel=0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
        </div>
    </div>
</div>