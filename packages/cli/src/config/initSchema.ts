import { z } from "zod"
import { type Preset } from "@/registry/schema"
import { type FrameworkName } from "@/utils/frameworks"
import { type Color, type Font } from "@/utils/registry"

/**
 * Partial config produced by each resolver.
 * Every field is optional — the merge step combines them,
 * and promptForMissing fills whatever is still undefined.
 */
export type PartialInitConfig = {
	projectName?: string
	cwd: string
	framework?: FrameworkName
	useSrcDir?: boolean
	brandColor?: Color
	font?: Font
	preset?: Preset
	isExistingProject?: boolean
	hasComponentsJson?: boolean
}

/**
 * Fully-resolved config the executor receives.
 * By the time this reaches the executor, every field is set.
 */
export const initConfigSchema = z.object({
	projectName: z.string().optional(),
	cwd: z.string(),
	framework: z.enum(["next-app", "vite", "manual"]),
	useSrcDir: z.boolean(),
	brandColor: z.string(),
	font: z.string(),
	preset: z.custom<Preset>().optional(),
	isExistingProject: z.boolean(),
	hasComponentsJson: z.boolean(),
})

export type InitConfig = z.infer<typeof initConfigSchema>
