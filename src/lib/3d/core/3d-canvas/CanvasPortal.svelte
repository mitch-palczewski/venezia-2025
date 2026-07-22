<script lang="ts">
	
	import { onDestroy, type Snippet } from 'svelte';
	import { addCanvasPortalSnippet, removeCanvasPortalSnippet } from './CanvasPortalTarget.svelte';

	let { children }: { children: Snippet } = $props();

	addCanvasPortalSnippet(children);
	
	onDestroy(() => {
		removeCanvasPortalSnippet(children);
	});
</script>
