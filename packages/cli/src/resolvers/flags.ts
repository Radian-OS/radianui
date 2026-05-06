import { type PartialInitConfig } from "@/config/initSchema"
import { type Color, type Font } from "@/utils/registry"

/**
 * Extracts a partial config from CLI flags/options.
 */
export function resolveFlags(opts: {
	cwd: string
	next?: boolean
	vite?: boolean
	useSrc?: boolean
	color?: string
	font?: string
	presetCode?: string
	projectName?: string
}): PartialInitConfig {
	let framework: PartialInitConfig["framework"]
	if (opts.next) framework = "next-app"
	else if (opts.vite) framework = "vite"

	return {
		cwd: opts.cwd,
		projectName: opts.projectName,
		framework,
		useSrcDir: opts.useSrc,
		brandColor: opts.color as Color | undefined,
		font: opts.font as Font | undefined,
	}
}
