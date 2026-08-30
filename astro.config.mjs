// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'DeepStack',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cylixlee' }],
			sidebar: [
				{ label: "欢迎", slug: "welcome" },
				{ label: "WSL2", items: [{ autogenerate: { directory: "wsl2" } }] },
				{ label: "Windows Terminal", items: [{ autogenerate: { directory: "windows-terminal" } }] },
				{ label: "Git", items: [{ autogenerate: { directory: "git" } }] },
			],
			customCss: ["./src/styles/custom.css"],
			pagination: false,
		}),
	],
});
