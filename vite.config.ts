import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), visualizer()],
	server: {
		hmr: true,
		proxy: {
      		"/quote_server": {
        		target: 'https://www.brainyquote.com',
        		changeOrigin: true,
        		secure: false,
        		rewrite: (path) => path.replace(/^\/quote_server/, ''),
      		},
    	},
	},
});
