// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'DeepStack',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cylixlee' }],
			customCss: ["./src/styles/custom.css"],
			pagination: false,
		}),
	],
});
