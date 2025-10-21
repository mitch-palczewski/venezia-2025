import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
//import { threlteStudio } from '@threlte/studio/vite';

export default defineConfig({
	plugins: [ sveltekit(), tailwindcss()],
	ssr: {
		noExternal: ['camera-controls']
	}
	
});
