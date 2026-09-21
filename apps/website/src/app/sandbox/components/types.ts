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
	"blog-1": Record<string, string>
	"blog-02": Record<string, string>
	zentra: Record<string, string>
	"contact-2": Record<string, string>
	"contact-06": Record<string, string>
	"contact-01": Record<string, string>
	"cta-10": Record<string, string>
	"cta-08": Record<string, string>
	"cta-07": Record<string, string>
	"faq-4": Record<string, string>
	"faq-5": Record<string, string>
	"faq-03": Record<string, string>
	"form-1": Record<string, string>
	"checkout-form": Record<string, string>
	"long-form": Record<string, string>
}

export type PreviewKey =
	| "long-form"
	| "checkout-form"
	| "form-1"
	| "faq-03"
	| "faq-5"
	| "faq-4"
	| "cta-07"
	| "cta-08"
	| "cta-10"
	| "contact-01"
	| "contact-06"
	| "contact-2"
	| "zentra"
	| "blog-02"
	| "blog-1"
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
	| "blog-section"
	| "contact-section"
	| "cta-section"
	| "faq-section"
	| "form-section"
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
		id: "long-form",
		label: "long-form",
		category: "form-section",
		filesKey: "long-form",
		path: "src/app/sandbox/long-form",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://www.shadcn.io/view/examples/form/long-form-with-many-fields",
		previewRoute: "/sandbox/long-form",
	},
	{
		id: "checkout-form",
		label: "checkout-form",
		category: "form-section",
		filesKey: "checkout-form",
		path: "src/app/sandbox/checkout-form",
		defaultFile: "page.tsx",
		referenceUrl: "https://www.shadcn.io/view/examples/form/checkout-form",
		previewRoute: "/sandbox/checkout-form",
	},
	{
		id: "form-1",
		label: "form-1",
		category: "form-section",
		filesKey: "form-1",
		path: "src/app/sandbox/form-1",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/form-1",
		previewRoute: "/sandbox/form-1",
	},
	{
		id: "faq-03",
		label: "faq-03",
		category: "faq-section",
		filesKey: "faq-03",
		path: "src/app/sandbox/faq-03",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/faq-03",
		previewRoute: "/sandbox/faq-03",
	},
	{
		id: "faq-5",
		label: "faq-5",
		category: "faq-section",
		filesKey: "faq-5",
		path: "src/app/sandbox/faq-5",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/faq-5",
		previewRoute: "/sandbox/faq-5",
	},
	{
		id: "faq-4",
		label: "faq-4",
		category: "faq-section",
		filesKey: "faq-4",
		path: "src/app/sandbox/faq-4",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/faq-4",
		previewRoute: "/sandbox/faq-4",
	},
	{
		id: "cta-07",
		label: "cta-07",
		category: "cta-section",
		filesKey: "cta-07",
		path: "src/app/sandbox/cta-07",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/cta-07",
		previewRoute: "/sandbox/cta-07",
	},
	{
		id: "cta-08",
		label: "cta-08",
		category: "cta-section",
		filesKey: "cta-08",
		path: "src/app/sandbox/cta-08",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/cta-08",
		previewRoute: "/sandbox/cta-08",
	},
	{
		id: "cta-10",
		label: "cta-10",
		category: "cta-section",
		filesKey: "cta-10",
		path: "src/app/sandbox/cta-10",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/cta-10",
		previewRoute: "/sandbox/cta-10",
	},
	{
		id: "contact-01",
		label: "contact-01",
		category: "contact-section",
		filesKey: "contact-01",
		path: "src/app/sandbox/contact-01",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/contact-01",
		previewRoute: "/sandbox/contact-01",
	},
	{
		id: "contact-06",
		label: "contact-06",
		category: "contact-section",
		filesKey: "contact-06",
		path: "src/app/sandbox/contact-06",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/contact-06",
		previewRoute: "/sandbox/contact-06",
	},
	{
		id: "contact-2",
		label: "contact-2",
		category: "contact-section",
		filesKey: "contact-2",
		path: "src/app/sandbox/contact-2",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/contact-2",
		previewRoute: "/sandbox/contact-2",
	},
	{
		id: "zentra",
		label: "zentra",
		category: "blog-section",
		filesKey: "zentra",
		path: "src/app/sandbox/zentra",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://dribbble.com/shots/27284935-Finance-Blog-Landing-Page-Web-Design-Articles-Newsletter",
		previewRoute: "/sandbox/zentra",
	},
	{
		id: "blog-02",
		label: "blog-02",
		category: "blog-section",
		filesKey: "blog-02",
		path: "src/app/sandbox/blog-02",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/blog-02",
		previewRoute: "/sandbox/blog-02",
	},
	{
		id: "blog-1",
		label: "blog-1",
		category: "blog-section",
		filesKey: "blog-1",
		path: "src/app/sandbox/blog-1",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/blog-1",
		previewRoute: "/sandbox/blog-1",
	},
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
		category: "other-sections",
		filesKey: "linear",
		path: "src/app/sandbox/linear",
		defaultFile: "page.tsx",
		referenceUrl: "https://linear.app",
		previewRoute: "/sandbox/linear",
	},
	{
		id: "omrix",
		label: "omrix",
		category: "hero-section",
		filesKey: "omrix",
		path: "src/app/sandbox/omrix",
		defaultFile: "page.tsx",
		referenceUrl: "https://omrix.framer.ai/",
		previewRoute: "/sandbox/omrix",
	},
	{
		id: "crisply",
		label: "crisply",
		category: "other-sections",
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
		category: "faq-section",
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
