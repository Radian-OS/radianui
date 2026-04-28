import http from "http"
import type { AddressInfo } from "net"

export type StubComponent = {
	name: string
	type: "ui" | "components" | "page" | "hooks" | "animated" | "block"
	dependencies?: string[]
	registryDependencies?: string[]
	files: Array<{
		name: string
		dir?: string
		content: string
		targetDir?: string
		type: "ui" | "components" | "page" | "hooks" | "animated" | "block"
	}>
	assetsDirectory?: string
}

export type StubRegistry = {
	components?: StubComponent[]
	blocks?: StubComponent[]
	themes?: Record<string, unknown>
	fonts?: Record<string, unknown>
	presets?: Record<string, unknown>
	globalCss?: string
}

export type RegistryServerHandle = {
	url: string
	port: number
	close: () => Promise<void>
	requests: Array<{ method: string; url: string }>
}

const json = (res: http.ServerResponse, status: number, body: unknown) => {
	res.statusCode = status
	res.setHeader("content-type", "application/json")
	res.end(JSON.stringify(body))
}

export const startRegistryServer = async (
	registry: StubRegistry = {}
): Promise<RegistryServerHandle> => {
	const requests: RegistryServerHandle["requests"] = []

	const server = http.createServer((req, res) => {
		const url = new URL(req.url ?? "/", "http://127.0.0.1")
		requests.push({ method: req.method ?? "GET", url: req.url ?? "/" })

		if (url.pathname === "/r/styles/default.json") {
			return json(res, 200, registry.components ?? [])
		}
		if (url.pathname === "/r/styles/sera.json") {
			return json(res, 200, registry.components ?? [])
		}
		if (url.pathname === "/api/components") {
			return json(res, 200, registry.components ?? [])
		}
		if (url.pathname === "/api/blocks") {
			return json(res, 200, registry.blocks ?? [])
		}
		if (url.pathname === "/api/assets") {
			res.statusCode = 404
			res.end()
			return
		}
		if (url.pathname === "/api/config") {
			const id = url.searchParams.get("id") ?? ""
			const preset = registry.presets?.[id]
			if (!preset) {
				res.statusCode = 404
				res.end()
				return
			}
			return json(res, 200, preset)
		}

		const themeMatch = url.pathname.match(/^\/r\/themes\/(.+)\.json$/)
		if (themeMatch) {
			const theme = registry.themes?.[themeMatch[1]]
			if (!theme) {
				res.statusCode = 404
				res.end()
				return
			}
			return json(res, 200, theme)
		}

		const fontMatch = url.pathname.match(/^\/r\/fonts\/(.+)\.json$/)
		if (fontMatch) {
			const font = registry.fonts?.[fontMatch[1]]
			if (!font) {
				res.statusCode = 404
				res.end()
				return
			}
			return json(res, 200, font)
		}

		if (url.pathname === "/css/globals.css") {
			if (registry.globalCss === undefined) {
				res.statusCode = 404
				res.end()
				return
			}
			res.statusCode = 200
			res.setHeader("content-type", "text/css")
			res.end(registry.globalCss)
			return
		}

		res.statusCode = 404
		res.end()
	})

	await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve))
	const port = (server.address() as AddressInfo).port

	return {
		url: `http://127.0.0.1:${port}`,
		port,
		requests,
		close: () =>
			new Promise<void>((resolve, reject) =>
				server.close((err) => (err ? reject(err) : resolve()))
			),
	}
}
