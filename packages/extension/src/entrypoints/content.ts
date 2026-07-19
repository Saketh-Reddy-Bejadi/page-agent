import { initPageController } from '@/agent/RemotePageController.content'

export default defineContentScript({
	matches: ['*://*.codebasics.io/*', 'http://localhost:8000/*'],
	runAt: 'document_end',

	main() {
		console.debug(`[Content] Loaded on ${window.location.href}`)
		initPageController()
	},
})
