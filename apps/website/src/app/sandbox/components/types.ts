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
}

export type PreviewKey =
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

export interface SandboxComment {
	id: string
	componentId: string
	elementTag: string
	elementSelector: string
	positionX: number
	positionY: number
	authorName: string
	content: string
	createdAt: string
	resolved: boolean
}

export interface SandboxComponentConfig {
	id: PreviewKey
	label: string
	filesKey: keyof FilesData
	path: string
	defaultFile: string
	referenceUrl: string
	previewRoute: string
}

export const sandboxComponents: SandboxComponentConfig[] = [
	{
		id: "agentlab",
		label: "agentlab",
		filesKey: "agentlab",
		path: "src/app/sandbox/agentlab",
		defaultFile: "page.tsx",
		referenceUrl: "https://agentlab.framer.ai/",
		previewRoute: "/sandbox/agentlab",
	},
	{
		id: "omrix",
		label: "omrix",
		filesKey: "omrix",
		path: "src/app/sandbox/omrix",
		defaultFile: "page.tsx",
		referenceUrl: "https://omrix.framer.ai/",
		previewRoute: "/sandbox/omrix",
	},
	{
		id: "aiwork",
		label: "aiwork",
		filesKey: "aiwork",
		path: "src/app/sandbox/aiwork",
		defaultFile: "page.tsx",
		referenceUrl: "https://aiwork.framer.website/",
		previewRoute: "/sandbox/aiwork",
	},
	{
		id: "verseo",
		label: "verseo",
		filesKey: "verseo",
		path: "src/app/sandbox/verseo",
		defaultFile: "page.tsx",
		referenceUrl: "https://verseo.framer.website/",
		previewRoute: "/sandbox/verseo",
	},
	{
		id: "hero-21",
		label: "hero-21",
		filesKey: "hero-21",
		path: "src/app/sandbox/hero-21",
		defaultFile: "hero-section.tsx",
		referenceUrl: "https://shadcnspace.com/preview/hero-21",
		previewRoute: "/sandbox/hero-21",
	},
	{
		id: "motion",
		label: "motion",
		filesKey: "motion",
		path: "src/app/sandbox/motion",
		defaultFile: "logo-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/jambo-logo-01",
		previewRoute: "/sandbox/motion",
	},
	{
		id: "faq",
		label: "klarheit-faq",
		filesKey: "klarheit-faq",
		path: "src/app/sandbox/klarheit-faq",
		defaultFile: "faq-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/klarheit-faq-02",
		previewRoute: "/sandbox/klarheit-faq",
	},
	{
		id: "testimonials",
		label: "klarheit-testimonial",
		filesKey: "klarheit-testimonial",
		path: "src/app/sandbox/klarheit-testimonial",
		defaultFile: "testimonial-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/klarheit-testimonial-02",
		previewRoute: "/sandbox/klarheit-testimonial",
	},
	{
		id: "beam-header",
		label: "beam-header",
		filesKey: "beam-header",
		path: "src/app/sandbox/beam-header",
		defaultFile: "beam-header-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/beam-header-01",
		previewRoute: "/sandbox/beam-header",
	},
	{
		id: "jambo-pricing",
		label: "jambo-pricing",
		filesKey: "jambo-pricing",
		path: "src/app/sandbox/jambo-pricing",
		defaultFile: "jambo-pricing-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/jambo-pricing-01",
		previewRoute: "/sandbox/jambo-pricing",
	},
]
