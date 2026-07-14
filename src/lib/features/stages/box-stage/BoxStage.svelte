<!-- BoxView.svelte -->
<script lang="ts">
    import Wall from './Wall.svelte';

    let resolution = 300;
    let depth = 3;

    // We have 3 slices (0 = Front-most, 1 = Middle, 2 = Back-most)
    let sliceDepth = $derived(resolution / 3);
</script>

  
        <Wall side="left" {resolution} />
        <Wall side="right" {resolution} />
        <Wall side="top" {resolution} />
        <Wall side="back" {resolution} />

        <Wall side="bottom" {resolution} />

hello world