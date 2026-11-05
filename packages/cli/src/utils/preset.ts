import { type Preset } from "@/registry/schema"
import { PRESET_API_URL } from "./registry"

export function normalizePreset(raw: unknown): Preset {
	const data = (raw as Record<string, unknown>)?.preset ?? (raw as Record<string, unknown>)?.data ?? raw
	const record = (data ?? {}) as Record<string, any>

	// Find the configuration object containing cssVars/css
	const conf = record?.config?.cssVars
		? record.config
		: record?.projectConfig?.cssVars
			? record.projectConfig
			: record?.cssVars
				? record
				: record?.config ?? {}

	// Find the inner template/style config
	const innerConfig = conf?.config?.template
		? conf.config
		: conf?.template
			? conf
			: record?.config?.template
				? record.config
				: {
						iconLibrary: "lucide",
						template: "next",
						useSrcDir: true,
						style: "default",
					}

	return {
		id: record?.id,
		name: record?.name ?? conf?.name,
		config: {
			name: conf?.name ?? record?.name,
			cssVars: conf?.cssVars ?? { light: {}, dark: {}, theme: {} },
			css: conf?.css ?? {},
			dependencies: conf?.dependencies ?? record?.dependencies ?? [],
			registryDependencies:
				conf?.registryDependencies ?? record?.registryDependencies ?? [],
			config: {
				iconLibrary: innerConfig.iconLibrary ?? "lucide",
				template: innerConfig.template ?? "next",
				useSrcDir: innerConfig.useSrcDir ?? true,
				style: innerConfig.style ?? "default",
			},
		},
	}
}

export async function fetchPreset(presetCode: string): Promise<Preset> {
	const res = await fetch(
		`${PRESET_API_URL}?id=${encodeURIComponent(presetCode)}`
	)
	if (!res.ok) {
		throw new Error(
			`Failed to fetch preset "${presetCode}": ${res.status} ${res.statusText}`
		)
	}
	const data = await res.json()
	return normalizePreset(data)
}
