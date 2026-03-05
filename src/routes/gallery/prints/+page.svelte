<script lang="ts">
	import PageHeader from "$lib/components/general/PageHeader.svelte";

    const prints = [
        '/images/prints/1.jpg',
        '/images/prints/2.jpg',
        '/images/prints/3.jpg',
        '/images/prints/4.jpg',
        '/images/prints/5.jpg',
        '/images/prints/6.jpg',
        '/images/prints/7.jpg',
        '/images/prints/8.jpg',
        '/images/prints/9.jpg'
    ]
</script>


<PageHeader/>
<div>
    {#each prints as print}
        <div>
            <img src={print} alt="Pile Print">
        </div>
    {/each}
</div>