import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, readFileSync } from 'node:fs'
import { defineConfig } from 'wxt'

const chromeProfile = '.wxt/chrome-data'
mkdirSync(chromeProfile, { recursive: true })

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

// See https://wxt.dev/api/config.html
export default defineConfig({
	srcDir: 'src',
	modules: ['@wxt-dev/module-react'],
	webExt: {
		chromiumProfile: chromeProfile,
		keepProfileChanges: true,
		chromiumArgs: ['--hide-crash-restore-bubble'],
	},
	vite: () => ({
		plugins: [tailwindcss()],
		define: {
			__VERSION__: JSON.stringify(pkg.version),
		},
		optimizeDeps: {
			force: true,
		},
		build: {
			minify: false,
			chunkSizeWarningLimit: 2000,
			cssCodeSplit: true,
			rollupOptions: {
				onwarn: function (message, handler) {
					if (message.code === 'EVAL') return
					handler(message)
				},
			},
		},
	}),
	zip: {
		artifactTemplate: 'codebasics-admin-copilot-{{version}}-{{browser}}.zip',
	},
	manifest: {
		default_locale: 'en',
		name: '__MSG_extName__',
		description: '__MSG_extDescription__',
		permissions: ['tabs', 'tabGroups', 'sidePanel', 'storage'],
		host_permissions: ['*://*.codebasics.io/*', 'http://localhost:8000/*'],
		icons: {
			64: 'assets/page-agent-64.png',
		},
		action: {
			default_title: '__MSG_extActionTitle__',
		},
		side_panel: {
			default_path: 'sidepanel/index.html',
		},
	},
})
