/**
 * LMS domain knowledge for the Codebasics admin panel.
 * Wiki pages are bundled at build time; the page matching a tab's URL is
 * injected into the prompt via the core `getPageInstructions` hook.
 */
import adminRoutes from './wiki/admin_routes.md?raw'
import bootcamps from './wiki/bootcamps.md?raw'
import courseContent from './wiki/course_content.md?raw'
import courses from './wiki/courses.md?raw'
import index from './wiki/index.md?raw'
import offlinePayments from './wiki/offline_payments.md?raw'
import orders from './wiki/orders.md?raw'
import permissions from './wiki/permissions.md?raw'
import users from './wiki/users.md?raw'

const PAGES = [
	index,
	adminRoutes,
	courses,
	courseContent,
	bootcamps,
	offlinePayments,
	orders,
	users,
	permissions,
]

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// 'route:' frontmatter → prefix regex; {id} placeholders match one segment
export const routeToRegex = (route: string): RegExp =>
	new RegExp(
		'^' +
			route
				.split(/\{[^}]*\}/)
				.map(escapeRe)
				.join('[^/]+')
	)

const routed = PAGES.map((text) => ({ text, route: /^route:\s*(\S+)/m.exec(text)?.[1] }))
	.filter((p): p is { text: string; route: string } => !!p.route && p.route !== '/admin')
	.map((p) => ({ ...p, re: routeToRegex(p.route) }))

export const LMS_SYSTEM_INSTRUCTION = [
	'You are the Codebasics Admin Copilot, an AI agent operating the Codebasics LMS admin panel on behalf of an internal operator.',
	'Only act inside the admin panel. Never perform destructive actions (delete, refund, reject, impersonate) unless the task explicitly asks for them; use ask_user if unsure.',
	'Beware: many destructive actions are plain links fired via data-confirm-href — treat them as destructive even though they look like navigation.',
	'Authoritative route map of the panel:',
	adminRoutes,
].join('\n\n')

/** Wiki pages whose `route:` frontmatter matches the URL's path, joined for the prompt. */
export function getLmsPageInstructions(url: string): string | undefined {
	let path: string
	try {
		path = new URL(url).pathname
	} catch {
		return undefined
	}
	const hits = routed.filter((p) => p.re.test(path))
	return hits.length ? hits.map((p) => p.text).join('\n\n---\n\n') : undefined
}
