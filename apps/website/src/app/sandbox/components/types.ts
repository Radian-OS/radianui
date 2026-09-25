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
	"hero-9": Record<string, string>
	"hero-12": Record<string, string>
	folio: Record<string, string>
	"hero-25": Record<string, string>
	orders: Record<string, string>
	"chatgpt-settings": Record<string, string>
	"integrations-settings": Record<string, string>
	"blog-5": Record<string, string>
	"blog-6": Record<string, string>
	"login-page-03": Record<string, string>
	"login-page-04": Record<string, string>
	"login-page-01": Record<string, string>
	"vcard-portfolio": Record<string, string>
	"product-tour": Record<string, string>
	"onboarding-checklist": Record<string, string>
	"kishor-portfolio": Record<string, string>
	"tania-rascia": Record<string, string>
	"data-grid-columns-2": Record<string, string>
	"data-grid-columns-5": Record<string, string>
	"users-table": Record<string, string>
	"projects-table": Record<string, string>
	"victor-eke": Record<string, string>
	"williams-samuel": Record<string, string>
}

export type PreviewKey =
	| "williams-samuel"
	| "victor-eke"
	| "projects-table"
	| "users-table"
	| "data-grid-columns-5"
	| "data-grid-columns-2"
	| "tania-rascia"
	| "kishor-portfolio"
	| "product-tour"
	| "onboarding-checklist"
	| "vcard-portfolio"
	| "login-page-01"
	| "login-page-04"
	| "login-page-03"
	| "blog-6"
	| "blog-5"
	| "integrations-settings"
	| "chatgpt-settings"
	| "orders"
	| "hero-25"
	| "folio"
	| "hero-12"
	| "hero-9"
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

export type CommentStatus = "pending" | "resolved"
export type CommentStatusFilter = "all" | "pending" | "resolved"

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
	status?: CommentStatus
	file?: string
	lineNumber?: number
}

export function isCommentResolved(comment: SandboxComment): boolean {
	return (
		comment.resolved === true ||
		(comment.resolved as unknown as string) === "resolved" ||
		comment.status === "resolved"
	)
}

export function getCommentStatus(comment: SandboxComment): CommentStatus {
	return isCommentResolved(comment) ? "resolved" : "pending"
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
	| "setting-section"
	| "welcome-screen-section"
	| "guided-tour-section"
	| "portfolio-section"
	| "table-section"
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
		id: "williams-samuel",
		label: "williams-samuel",
		category: "portfolio-section",
		filesKey: "williams-samuel",
		path: "src/app/sandbox/williams-samuel",
		defaultFile: "page.tsx",
		referenceUrl: "https://williamssam.netlify.app/",
		previewRoute: "/sandbox/williams-samuel",
	},
	{
		id: "victor-eke",
		label: "victor-eke",
		category: "portfolio-section",
		filesKey: "victor-eke",
		path: "src/app/sandbox/victor-eke",
		defaultFile: "page.tsx",
		referenceUrl: "https://victoreke.com/",
		previewRoute: "/sandbox/victor-eke",
	},
	{
		id: "projects-table",
		label: "projects-table",
		category: "table-section",
		filesKey: "projects-table",
		path: "src/app/sandbox/projects-table",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://preline.co/templates/dashboards/admin-dashboard/index.html",
		previewRoute: "/sandbox/projects-table",
	},
	{
		id: "users-table",
		label: "users-table",
		category: "table-section",
		filesKey: "users-table",
		path: "src/app/sandbox/users-table",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://preline.co/templates/dashboards/admin-dashboard/index.html?page=users.html",
		previewRoute: "/sandbox/users-table",
	},
	{
		id: "data-grid-columns-5",
		label: "data-grid-columns-5",
		category: "table-section",
		filesKey: "data-grid-columns-5",
		path: "src/app/sandbox/data-grid-columns-5",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/data-grid-columns-5",
		previewRoute: "/sandbox/data-grid-columns-5",
	},
	{
		id: "data-grid-columns-2",
		label: "data-grid-columns-2",
		category: "table-section",
		filesKey: "data-grid-columns-2",
		path: "src/app/sandbox/data-grid-columns-2",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/data-grid-columns-2",
		previewRoute: "/sandbox/data-grid-columns-2",
	},
	{
		id: "tania-rascia",
		label: "tania-rascia",
		category: "portfolio-section",
		filesKey: "tania-rascia",
		path: "src/app/sandbox/tania-rascia",
		defaultFile: "page.tsx",
		referenceUrl: "https://www.taniarascia.com/",
		previewRoute: "/sandbox/tania-rascia",
	},
	{
		id: "kishor-portfolio",
		label: "kishor-portfolio",
		category: "portfolio-section",
		filesKey: "kishor-portfolio",
		path: "src/app/sandbox/kishor-portfolio",
		defaultFile: "page.tsx",
		referenceUrl: "https://kishorkumarkhadka.com.np/",
		previewRoute: "/sandbox/kishor-portfolio",
	},
	{
		id: "product-tour",
		label: "product-tour",
		category: "guided-tour-section",
		filesKey: "product-tour",
		path: "src/app/sandbox/product-tour",
		defaultFile: "page.tsx",
		referenceUrl: "https://www.shadcn.io/view/onboarding/tour",
		previewRoute: "/sandbox/product-tour",
	},
	{
		id: "onboarding-checklist",
		label: "onboarding-checklist",
		category: "guided-tour-section",
		filesKey: "onboarding-checklist",
		path: "src/app/sandbox/onboarding-checklist",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://www.shadcn-ui-blocks.com/preview/marketing-pro/product-tours/onboarding-checklist",
		previewRoute: "/sandbox/onboarding-checklist",
	},
	{
		id: "vcard-portfolio",
		label: "vcard-portfolio",
		category: "portfolio-section",
		filesKey: "vcard-portfolio",
		path: "src/app/sandbox/vcard-portfolio",
		defaultFile: "page.tsx",
		referenceUrl: "https://codewithsadee.github.io/vcard-personal-portfolio/",
		previewRoute: "/sandbox/vcard-portfolio",
	},
	{
		id: "login-page-01",
		label: "login-page-01",
		category: "welcome-screen-section",
		filesKey: "login-page-01",
		path: "src/app/sandbox/login-page-01",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://shadcnstudio.com/preview/blocks/base/marketing-ui/login-page/login-page-01",
		previewRoute: "/sandbox/login-page-01",
	},
	{
		id: "login-page-04",
		label: "login-page-04",
		category: "welcome-screen-section",
		filesKey: "login-page-04",
		path: "src/app/sandbox/login-page-04",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://shadcnstudio.com/preview/blocks/base/marketing-ui/login-page/login-page-04",
		previewRoute: "/sandbox/login-page-04",
	},
	{
		id: "login-page-03",
		label: "login-page-03",
		category: "welcome-screen-section",
		filesKey: "login-page-03",
		path: "src/app/sandbox/login-page-03",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://shadcnstudio.com/preview/blocks/base/marketing-ui/login-page/login-page-03",
		previewRoute: "/sandbox/login-page-03",
	},
	{
		id: "blog-6",
		label: "blog-6",
		category: "blog-section",
		filesKey: "blog-6",
		path: "src/app/sandbox/blog-6",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/blog-6",
		previewRoute: "/sandbox/blog-6",
	},
	{
		id: "blog-5",
		label: "blog-5",
		category: "blog-section",
		filesKey: "blog-5",
		path: "src/app/sandbox/blog-5",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/blog-5",
		previewRoute: "/sandbox/blog-5",
	},
	{
		id: "integrations-settings",
		label: "integrations-settings",
		category: "setting-section",
		filesKey: "integrations-settings",
		path: "src/app/sandbox/integrations-settings",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://dribbble.com/shots/22456569-Integrations-settings-page-Untitled-UI",
		previewRoute: "/sandbox/integrations-settings",
	},
	{
		id: "chatgpt-settings",
		label: "chatgpt-settings",
		category: "setting-section",
		filesKey: "chatgpt-settings",
		path: "src/app/sandbox/chatgpt-settings",
		defaultFile: "page.tsx",
		referenceUrl: "https://chatgpt.com/#settings",
		previewRoute: "/sandbox/chatgpt-settings",
	},
	{
		id: "orders",
		label: "orders",
		category: "setting-section",
		filesKey: "orders",
		path: "src/app/sandbox/orders",
		defaultFile: "page.tsx",
		referenceUrl: "https://marketing-template.alignui.com/orders",
		previewRoute: "/sandbox/orders",
	},
	{
		id: "hero-25",
		label: "hero-25",
		category: "hero-section",
		filesKey: "hero-25",
		path: "src/app/sandbox/hero-25",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/hero-25",
		previewRoute: "/sandbox/hero-25",
	},
	{
		id: "folio",
		label: "folio",
		category: "hero-section",
		filesKey: "folio",
		path: "src/app/sandbox/folio",
		defaultFile: "page.tsx",
		referenceUrl: "https://ruixen.com/templates/folio",
		previewRoute: "/sandbox/folio",
	},
	{
		id: "hero-12",
		label: "hero-12",
		category: "hero-section",
		filesKey: "hero-12",
		path: "src/app/sandbox/hero-12",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/hero-12",
		previewRoute: "/sandbox/hero-12",
	},
	{
		id: "hero-9",
		label: "hero-9",
		category: "hero-section",
		filesKey: "hero-9",
		path: "src/app/sandbox/hero-9",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/hero-9",
		previewRoute: "/sandbox/hero-9",
	},
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
