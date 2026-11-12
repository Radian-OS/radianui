export async function register() {}

export async function onRequestError(
	err: unknown,
	request: {
		path: string
		method: string
		headers: Record<string, string | string[] | undefined>
	},
	context: {
		routerKind: "Pages Router" | "App Router"
		routePath: string
		routeType: "render" | "route" | "action" | "proxy"
		renderSource?:
			| "react-server-components"
			| "react-server-components-payload"
			| "server-rendering"
		revalidateReason?: "on-demand" | "stale"
	}
) {
	const digest = (err as { digest?: string })?.digest
	const errorObj = err instanceof Error ? err : new Error(String(err))

	console.error(
		`\n[Next.js Server Error] [${context.routeType.toUpperCase()}] ${request.method} ${request.path}`,
		`\n  Digest: ${digest ?? "N/A"}`,
		`\n  Route:  ${context.routePath}`,
		`\n  Error:  ${errorObj.message}`,
		errorObj.stack ? `\n  Stack:  ${errorObj.stack}` : ""
	)
}
