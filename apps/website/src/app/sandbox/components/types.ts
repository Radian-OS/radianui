export interface FilesData {
	motion: Record<string, string>
	"beam-header": Record<string, string>
	"jambo-pricing": Record<string, string>
	"klarheit-faq": Record<string, string>
	"klarheit-testimonial": Record<string, string>
	"hero-21": Record<string, string>
}

export type PreviewKey =
	| "motion"
	| "faq"
	| "beam-header"
	| "jambo-pricing"
	| "testimonials"
	| "hero-21"

export type ViewMode = "preview" | "inspect" | "code"
export type DeviceSize = "desktop" | "tablet" | "mobile"

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
