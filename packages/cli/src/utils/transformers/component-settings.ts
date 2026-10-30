import { z } from "zod"
import type { TransformContext } from "./types"

export type ComponentSettingsDefinition = {
	key: keyof NonNullable<TransformContext["componentSettings"]>
	label: string
	fileNames: readonly string[]
	defaultsVariable: string
	defaultsSchema: z.ZodType<Record<string, unknown>>
}

// Component definitions describe the data. Source editing stays in the shared transformer.
// Only source defaults belong here; padding/radius are already exported as theme tokens.
export const componentSettingsDefinitions: readonly ComponentSettingsDefinition[] =
	[
		{
			key: "button",
			label: "Button",
			fileNames: ["button.tsx", "button.jsx"],
			defaultsVariable: "buttonThemeDefaults",
			defaultsSchema: z.object({
				defaultSize: z.enum(["xs", "sm", "md", "lg", "xl", "2xl"]).optional(),
				defaultVariant: z
					.enum([
						"strong",
						"soft",
						"outline",
						"ghost",
						"link",
						"glossy",
						"glossy-inverted",
						"smooth",
						"smooth-inverted",
					])
					.optional(),
			}),
		},
	]
