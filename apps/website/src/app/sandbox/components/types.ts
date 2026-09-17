export interface FilesData {
	omrix: Record<string, string>
	motion: Record<string, string>
	"beam-header": Record<string, string>
	"jambo-pricing": Record<string, string>
	"klarheit-faq": Record<string, string>
	"klarheit-testimonial": Record<string, string>
	"hero-21": Record<string, string>
	aiwork: Record<string, string>
	verseo: Record<string, string>
	agentlab: Record<string, string>
	crisply: Record<string, string>
	"hero-04": Record<string, string>
	linear: Record<string, string>
	intercom: Record<string, string>
}

export type PreviewKey =
	| "intercom"
	| "linear"
	| "hero-04"
	| "crisply"
	| "agentlab"
	| "omrix"
	| "motion"
	| "faq"
	| "beam-header"
	| "jambo-pricing"
	| "testimonials"
	| "hero-21"
	| "aiwork"
	| "verseo"

export type ViewMode = "preview" | "inspect" | "code"
export type DeviceSize = "desktop" | "tablet" | "mobile"

export interface SourceLocation {
	file: string
	lineNumber: number
}

export interface SandboxComment {
	id: string
	componentId: string
	elementTag: string
	elementSelector: string
	elementContent?: string
	positionX: number
	positionY: number
	authorName: string
	content: string
	createdAt: string
	resolved: boolean
	file?: string
	lineNumber?: number
}

export type SandboxCategory =
	| "full-page"
	| "hero-section"
	| "pricing-section"
	| "other-sections"

export interface SandboxComponentConfig {
	id: PreviewKey
	label: string
	category: SandboxCategory
	filesKey: keyof FilesData
	path: string
	defaultFile: string
	referenceUrl: string
	previewRoute: string
}

export const sandboxComponents: SandboxComponentConfig[] = [
	{
		id: "intercom",
		label: "intercom",
		category: "full-page",
		filesKey: "intercom",
		path: "src/app/sandbox/intercom",
		defaultFile: "page.tsx",
		referenceUrl: "https://www.intercom.com",
		previewRoute: "/sandbox/intercom",
	},
	{
		id: "linear",
		label: "linear",
		category: "full-page",
		filesKey: "linear",
		path: "src/app/sandbox/linear",
		defaultFile: "page.tsx",
		referenceUrl: "https://linear.app",
		previewRoute: "/sandbox/linear",
	},
	{
		id: "omrix",
		label: "omrix",
		category: "full-page",
		filesKey: "omrix",
		path: "src/app/sandbox/omrix",
		defaultFile: "page.tsx",
		referenceUrl: "https://omrix.framer.ai/",
		previewRoute: "/sandbox/omrix",
	},
	{
		id: "crisply",
		label: "crisply",
		category: "full-page",
		filesKey: "crisply",
		path: "src/app/sandbox/crisply",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://dribbble.com/shots/25800159-Cripsly-Account-Settings-CRM-Dashboard",
		previewRoute: "/sandbox/crisply",
	},
	{
		id: "agentlab",
		label: "agentlab",
		category: "full-page",
		filesKey: "agentlab",
		path: "src/app/sandbox/agentlab",
		defaultFile: "page.tsx",
		referenceUrl: "https://agentlab.framer.ai/",
		previewRoute: "/sandbox/agentlab",
	},
	{
		id: "aiwork",
		label: "aiwork",
		category: "full-page",
		filesKey: "aiwork",
		path: "src/app/sandbox/aiwork",
		defaultFile: "page.tsx",
		referenceUrl: "https://aiwork.framer.website/",
		previewRoute: "/sandbox/aiwork",
	},
	{
		id: "verseo",
		label: "verseo",
		category: "full-page",
		filesKey: "verseo",
		path: "src/app/sandbox/verseo",
		defaultFile: "page.tsx",
		referenceUrl: "https://verseo.framer.website/",
		previewRoute: "/sandbox/verseo",
	},
	{
		id: "hero-04",
		label: "hero-04",
		category: "hero-section",
		filesKey: "hero-04",
		path: "src/app/sandbox/hero-04",
		defaultFile: "page.tsx",
		referenceUrl: "https://pro.alignui.com/block-preview/default/hero-04",
		previewRoute: "/sandbox/hero-04",
	},
	{
		id: "hero-21",
		label: "hero-21",
		category: "hero-section",
		filesKey: "hero-21",
		path: "src/app/sandbox/hero-21",
		defaultFile: "hero-section.tsx",
		referenceUrl: "https://shadcnspace.com/preview/hero-21",
		previewRoute: "/sandbox/hero-21",
	},
	{
		id: "beam-header",
		label: "beam-header",
		category: "hero-section",
		filesKey: "beam-header",
		path: "src/app/sandbox/beam-header",
		defaultFile: "beam-header-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/beam-header-01",
		previewRoute: "/sandbox/beam-header",
	},
	{
		id: "jambo-pricing",
		label: "jambo-pricing",
		category: "pricing-section",
		filesKey: "jambo-pricing",
		path: "src/app/sandbox/jambo-pricing",
		defaultFile: "jambo-pricing-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/jambo-pricing-01",
		previewRoute: "/sandbox/jambo-pricing",
	},
	{
		id: "faq",
		label: "klarheit-faq",
		category: "other-sections",
		filesKey: "klarheit-faq",
		path: "src/app/sandbox/klarheit-faq",
		defaultFile: "faq-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/klarheit-faq-02",
		previewRoute: "/sandbox/klarheit-faq",
	},
	{
		id: "testimonials",
		label: "klarheit-testimonial",
		category: "other-sections",
		filesKey: "klarheit-testimonial",
		path: "src/app/sandbox/klarheit-testimonial",
		defaultFile: "testimonial-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/klarheit-testimonial-02",
		previewRoute: "/sandbox/klarheit-testimonial",
	},
	{
		id: "motion",
		label: "motion",
		category: "other-sections",
		filesKey: "motion",
		path: "src/app/sandbox/motion",
		defaultFile: "logo-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/jambo-logo-01",
		previewRoute: "/sandbox/motion",
	},
]
