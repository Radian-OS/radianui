import { next } from "./next"
import { vite } from "./vite"

export { createTemplate, resolveTemplate } from "./create-template"
export type { TemplateInitOptions, TemplateOptions } from "./create-template"

export const templates = {
	next,
	vite,
}

// Resolve a template key from a detected framework name.
export function getTemplateForFramework(frameworkName?: string) {
	if (!frameworkName) {
		return undefined
	}

	for (const [key, template] of Object.entries(templates)) {
		if (template.frameworks.includes(frameworkName)) {
			return key
		}
	}

	return undefined
}
