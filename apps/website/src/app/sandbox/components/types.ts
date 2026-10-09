export type FilesData = Record<string, Record<string, string>>
export type PreviewKey =
	| "hero-01"
	| "signin-12"
	| "signin-13"
	| "portfolio-01"
	| "portfolio-02"
	| "table-01"
	| "table-02"
	| "table-03"
	| "table-04"
	| "portfolio-03"
	| "portfolio-04"
	| "tour-01"
	| "tour-02"
	| "portfolio-05"
	| "signin-14"
	| "signin-15"
	| "signin-16"
	| "blog-01"
	| "blog-04"
	| "setting-01"
	| "setting-02"
	| "setting-03"
	| "hero-03"
	| "hero-08"
	| "hero-05"
	| "hero-02"
	| "hero-06"
	| "form-01"
	| "form-02"
	| "form-03"
	| "faq-01"
	| "faq-02"
	| "faq-03"
	| "cta-02"
	| "cta-03"
	| "cta-04"
	| "cta-01"
	| "pricing-01"
	| "contact-01"
	| "contact-02"
	| "contact-03"
	| "blog-03"
	| "blog-02"
	| "blog-05"
	| "full-page-01"
	| "other-01"
	| "hero-04"
	| "other-02"
	| "full-page-02"
	| "hero-07"
	| "other-03"
	| "faq-04"
	| "hero-10"
	| "pricing-02"
	| "testimonial-02"
	| "hero-09"
	| "full-page-03"
	| "full-page-04"
	| "testimonial-01"
	| "signup-12"
	| "signup-13"
	| "signup-14"
	| "signup-15"

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
	| "testimonial-section"
	| "form-section"
	| "setting-section"
	| "welcome-screen-section"
	| "guided-tour-section"
	| "portfolio-section"
	| "table-section"
	| "sign-in-section"
	| "signup-section"
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
		id: "hero-01",
		label: "hero-01",
		category: "hero-section",
		filesKey: "hero-01",
		path: "src/app/sandbox/hero-01",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/hero-37",
		previewRoute: "/sandbox/hero-01",
	},
	{
		id: "hero-02",
		label: "hero-02",
		category: "hero-section",
		filesKey: "hero-02",
		path: "src/app/sandbox/hero-02",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/hero-16",
		previewRoute: "/sandbox/hero-02",
	},
	{
		id: "hero-03",
		label: "hero-03",
		category: "hero-section",
		filesKey: "hero-03",
		path: "src/app/sandbox/hero-03",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/hero-25",
		previewRoute: "/sandbox/hero-03",
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
		id: "hero-05",
		label: "hero-05",
		category: "hero-section",
		filesKey: "hero-05",
		path: "src/app/sandbox/hero-05",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/hero-12",
		previewRoute: "/sandbox/hero-05",
	},
	{
		id: "hero-06",
		label: "hero-06",
		category: "hero-section",
		filesKey: "hero-06",
		path: "src/app/sandbox/hero-06",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/hero-9",
		previewRoute: "/sandbox/hero-06",
	},
	{
		id: "hero-07",
		label: "hero-07",
		category: "hero-section",
		filesKey: "hero-07",
		path: "src/app/sandbox/hero-07",
		defaultFile: "page.tsx",
		referenceUrl: "https://omrix.framer.ai/",
		previewRoute: "/sandbox/hero-07",
	},
	{
		id: "hero-08",
		label: "hero-08",
		category: "hero-section",
		filesKey: "hero-08",
		path: "src/app/sandbox/hero-08",
		defaultFile: "page.tsx",
		referenceUrl: "https://ruixen.com/templates/folio",
		previewRoute: "/sandbox/hero-08",
	},
	{
		id: "hero-09",
		label: "hero-09",
		category: "hero-section",
		filesKey: "hero-09",
		path: "src/app/sandbox/hero-09",
		defaultFile: "hero-section.tsx",
		referenceUrl: "https://shadcnspace.com/preview/hero-21",
		previewRoute: "/sandbox/hero-09",
	},
	{
		id: "hero-10",
		label: "hero-10",
		category: "hero-section",
		filesKey: "hero-10",
		path: "src/app/sandbox/hero-10",
		defaultFile: "beam-header-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/beam-header-01",
		previewRoute: "/sandbox/hero-10",
	},
	{
		id: "signin-12",
		label: "signin-12",
		category: "sign-in-section",
		filesKey: "signin-12",
		path: "src/app/sandbox/signin-12",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/login-04",
		previewRoute: "/sandbox/signin-12",
	},
	{
		id: "signin-13",
		label: "signin-13",
		category: "sign-in-section",
		filesKey: "signin-13",
		path: "src/app/sandbox/signin-13",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/login-07",
		previewRoute: "/sandbox/signin-13",
	},
	{
		id: "signin-14",
		label: "signin-14",
		category: "sign-in-section",
		filesKey: "signin-14",
		path: "src/app/sandbox/signin-14",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://shadcnstudio.com/preview/blocks/base/marketing-ui/login-page/login-page-01",
		previewRoute: "/sandbox/signin-14",
	},
	{
		id: "signin-15",
		label: "signin-15",
		category: "sign-in-section",
		filesKey: "signin-15",
		path: "src/app/sandbox/signin-15",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://shadcnstudio.com/preview/blocks/base/marketing-ui/login-page/login-page-04",
		previewRoute: "/sandbox/signin-15",
	},
	{
		id: "signin-16",
		label: "signin-16",
		category: "sign-in-section",
		filesKey: "signin-16",
		path: "src/app/sandbox/signin-16",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://shadcnstudio.com/preview/blocks/base/marketing-ui/login-page/login-page-03",
		previewRoute: "/sandbox/signin-16",
	},
	{
		id: "signup-14",
		label: "signup-14",
		category: "signup-section",
		filesKey: "signup-14",
		path: "src/app/sandbox/signup-14",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://shadcnstudio.com/preview/blocks/base/marketing-ui/login-page/login-page-03",
		previewRoute: "/sandbox/signup-14",
	},
	{
		id: "signup-15",
		label: "signup-15",
		category: "signup-section",
		filesKey: "signup-15",
		path: "src/app/sandbox/signup-15",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://shadcnstudio.com/preview/blocks/base/marketing-ui/login-page/login-page-04",
		previewRoute: "/sandbox/signup-15",
	},
	{
		id: "cta-01",
		label: "cta-01",
		category: "cta-section",
		filesKey: "cta-01",
		path: "src/app/sandbox/cta-01",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/cta-09",
		previewRoute: "/sandbox/cta-01",
	},
	{
		id: "cta-02",
		label: "cta-02",
		category: "cta-section",
		filesKey: "cta-02",
		path: "src/app/sandbox/cta-02",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/cta-07",
		previewRoute: "/sandbox/cta-02",
	},
	{
		id: "cta-03",
		label: "cta-03",
		category: "cta-section",
		filesKey: "cta-03",
		path: "src/app/sandbox/cta-03",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/cta-08",
		previewRoute: "/sandbox/cta-03",
	},
	{
		id: "cta-04",
		label: "cta-04",
		category: "cta-section",
		filesKey: "cta-04",
		path: "src/app/sandbox/cta-04",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/cta-10",
		previewRoute: "/sandbox/cta-04",
	},
	{
		id: "pricing-01",
		label: "pricing-01",
		category: "pricing-section",
		filesKey: "pricing-01",
		path: "src/app/sandbox/pricing-01",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/pricing-05",
		previewRoute: "/sandbox/pricing-01",
	},
	{
		id: "pricing-02",
		label: "pricing-02",
		category: "pricing-section",
		filesKey: "pricing-02",
		path: "src/app/sandbox/pricing-02",
		defaultFile: "jambo-pricing-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/jambo-pricing-01",
		previewRoute: "/sandbox/pricing-02",
	},
	{
		id: "testimonial-01",
		label: "testimonial-01",
		category: "testimonial-section",
		filesKey: "testimonial-01",
		path: "src/app/sandbox/testimonial-01",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/testimonial-02",
		previewRoute: "/sandbox/testimonial-01",
	},
	{
		id: "testimonial-02",
		label: "testimonial-02",
		category: "testimonial-section",
		filesKey: "testimonial-02",
		path: "src/app/sandbox/testimonial-02",
		defaultFile: "testimonial-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/klarheit-testimonial-02",
		previewRoute: "/sandbox/testimonial-02",
	},
	{
		id: "portfolio-01",
		label: "portfolio-01",
		category: "portfolio-section",
		filesKey: "portfolio-01",
		path: "src/app/sandbox/portfolio-01",
		defaultFile: "page.tsx",
		referenceUrl: "https://williamssam.netlify.app/",
		previewRoute: "/sandbox/portfolio-01",
	},
	{
		id: "portfolio-02",
		label: "portfolio-02",
		category: "portfolio-section",
		filesKey: "portfolio-02",
		path: "src/app/sandbox/portfolio-02",
		defaultFile: "page.tsx",
		referenceUrl: "https://victoreke.com/",
		previewRoute: "/sandbox/portfolio-02",
	},
	{
		id: "portfolio-03",
		label: "portfolio-03",
		category: "portfolio-section",
		filesKey: "portfolio-03",
		path: "src/app/sandbox/portfolio-03",
		defaultFile: "page.tsx",
		referenceUrl: "https://www.taniarascia.com/",
		previewRoute: "/sandbox/portfolio-03",
	},
	{
		id: "portfolio-04",
		label: "portfolio-04",
		category: "portfolio-section",
		filesKey: "portfolio-04",
		path: "src/app/sandbox/portfolio-04",
		defaultFile: "page.tsx",
		referenceUrl: "https://kishorkumarkhadka.com.np/",
		previewRoute: "/sandbox/portfolio-04",
	},
	{
		id: "portfolio-05",
		label: "portfolio-05",
		category: "portfolio-section",
		filesKey: "portfolio-05",
		path: "src/app/sandbox/portfolio-05",
		defaultFile: "page.tsx",
		referenceUrl: "https://codewithsadee.github.io/vcard-personal-portfolio/",
		previewRoute: "/sandbox/portfolio-05",
	},
	{
		id: "table-01",
		label: "table-01",
		category: "table-section",
		filesKey: "table-01",
		path: "src/app/sandbox/table-01",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://preline.co/templates/dashboards/admin-dashboard/index.html",
		previewRoute: "/sandbox/table-01",
	},
	{
		id: "table-02",
		label: "table-02",
		category: "table-section",
		filesKey: "table-02",
		path: "src/app/sandbox/table-02",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://preline.co/templates/dashboards/admin-dashboard/index.html?page=users.html",
		previewRoute: "/sandbox/table-02",
	},
	{
		id: "table-03",
		label: "table-03",
		category: "table-section",
		filesKey: "table-03",
		path: "src/app/sandbox/table-03",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/data-grid-columns-5",
		previewRoute: "/sandbox/table-03",
	},
	{
		id: "table-04",
		label: "table-04",
		category: "table-section",
		filesKey: "table-04",
		path: "src/app/sandbox/table-04",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/data-grid-columns-2",
		previewRoute: "/sandbox/table-04",
	},
	{
		id: "tour-01",
		label: "tour-01",
		category: "guided-tour-section",
		filesKey: "tour-01",
		path: "src/app/sandbox/tour-01",
		defaultFile: "page.tsx",
		referenceUrl: "https://www.shadcn.io/view/onboarding/tour",
		previewRoute: "/sandbox/tour-01",
	},
	{
		id: "tour-02",
		label: "tour-02",
		category: "guided-tour-section",
		filesKey: "tour-02",
		path: "src/app/sandbox/tour-02",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://www.shadcn-ui-blocks.com/preview/marketing-pro/product-tours/onboarding-checklist",
		previewRoute: "/sandbox/tour-02",
	},
	{
		id: "blog-01",
		label: "blog-01",
		category: "blog-section",
		filesKey: "blog-01",
		path: "src/app/sandbox/blog-01",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/blog-6",
		previewRoute: "/sandbox/blog-01",
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
		id: "blog-03",
		label: "blog-03",
		category: "blog-section",
		filesKey: "blog-03",
		path: "src/app/sandbox/blog-03",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://dribbble.com/shots/27284935-Finance-Blog-Landing-Page-Web-Design-Articles-Newsletter",
		previewRoute: "/sandbox/blog-03",
	},
	{
		id: "blog-04",
		label: "blog-04",
		category: "blog-section",
		filesKey: "blog-04",
		path: "src/app/sandbox/blog-04",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/blog-5",
		previewRoute: "/sandbox/blog-04",
	},
	{
		id: "blog-05",
		label: "blog-05",
		category: "blog-section",
		filesKey: "blog-05",
		path: "src/app/sandbox/blog-05",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/blog-1",
		previewRoute: "/sandbox/blog-05",
	},
	{
		id: "setting-01",
		label: "setting-01",
		category: "setting-section",
		filesKey: "setting-01",
		path: "src/app/sandbox/setting-01",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://dribbble.com/shots/22456569-Integrations-settings-page-Untitled-UI",
		previewRoute: "/sandbox/setting-01",
	},
	{
		id: "setting-02",
		label: "setting-02",
		category: "setting-section",
		filesKey: "setting-02",
		path: "src/app/sandbox/setting-02",
		defaultFile: "page.tsx",
		referenceUrl: "https://chatgpt.com/#settings",
		previewRoute: "/sandbox/setting-02",
	},
	{
		id: "setting-03",
		label: "setting-03",
		category: "setting-section",
		filesKey: "setting-03",
		path: "src/app/sandbox/setting-03",
		defaultFile: "page.tsx",
		referenceUrl: "https://marketing-template.alignui.com/orders",
		previewRoute: "/sandbox/setting-03",
	},
	{
		id: "form-01",
		label: "form-01",
		category: "form-section",
		filesKey: "form-01",
		path: "src/app/sandbox/form-01",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://www.shadcn.io/view/examples/form/long-form-with-many-fields",
		previewRoute: "/sandbox/form-01",
	},
	{
		id: "form-02",
		label: "form-02",
		category: "form-section",
		filesKey: "form-02",
		path: "src/app/sandbox/form-02",
		defaultFile: "page.tsx",
		referenceUrl: "https://www.shadcn.io/view/examples/form/checkout-form",
		previewRoute: "/sandbox/form-02",
	},
	{
		id: "form-03",
		label: "form-03",
		category: "form-section",
		filesKey: "form-03",
		path: "src/app/sandbox/form-03",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/form-1",
		previewRoute: "/sandbox/form-03",
	},
	{
		id: "faq-01",
		label: "faq-01",
		category: "faq-section",
		filesKey: "faq-01",
		path: "src/app/sandbox/faq-01",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/faq-03",
		previewRoute: "/sandbox/faq-01",
	},
	{
		id: "faq-02",
		label: "faq-02",
		category: "faq-section",
		filesKey: "faq-02",
		path: "src/app/sandbox/faq-02",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/faq-5",
		previewRoute: "/sandbox/faq-02",
	},
	{
		id: "faq-03",
		label: "faq-03",
		category: "faq-section",
		filesKey: "faq-03",
		path: "src/app/sandbox/faq-03",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/faq-4",
		previewRoute: "/sandbox/faq-03",
	},
	{
		id: "faq-04",
		label: "faq-04",
		category: "faq-section",
		filesKey: "faq-04",
		path: "src/app/sandbox/faq-04",
		defaultFile: "faq-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/klarheit-faq-02",
		previewRoute: "/sandbox/faq-04",
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
		id: "contact-02",
		label: "contact-02",
		category: "contact-section",
		filesKey: "contact-02",
		path: "src/app/sandbox/contact-02",
		defaultFile: "page.tsx",
		referenceUrl: "https://shadcnspace.com/preview/contact-06",
		previewRoute: "/sandbox/contact-02",
	},
	{
		id: "contact-03",
		label: "contact-03",
		category: "contact-section",
		filesKey: "contact-03",
		path: "src/app/sandbox/contact-03",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/contact-2",
		previewRoute: "/sandbox/contact-03",
	},
	{
		id: "full-page-01",
		label: "full-page-01",
		category: "full-page",
		filesKey: "full-page-01",
		path: "src/app/sandbox/full-page-01",
		defaultFile: "page.tsx",
		referenceUrl: "https://www.intercom.com",
		previewRoute: "/sandbox/full-page-01",
	},
	{
		id: "full-page-02",
		label: "full-page-02",
		category: "full-page",
		filesKey: "full-page-02",
		path: "src/app/sandbox/full-page-02",
		defaultFile: "page.tsx",
		referenceUrl: "https://agentlab.framer.ai/",
		previewRoute: "/sandbox/full-page-02",
	},
	{
		id: "full-page-03",
		label: "full-page-03",
		category: "full-page",
		filesKey: "full-page-03",
		path: "src/app/sandbox/full-page-03",
		defaultFile: "page.tsx",
		referenceUrl: "https://aiwork.framer.website/",
		previewRoute: "/sandbox/full-page-03",
	},
	{
		id: "full-page-04",
		label: "full-page-04",
		category: "full-page",
		filesKey: "full-page-04",
		path: "src/app/sandbox/full-page-04",
		defaultFile: "page.tsx",
		referenceUrl: "https://verseo.framer.website/",
		previewRoute: "/sandbox/full-page-04",
	},
	{
		id: "other-01",
		label: "other-01",
		category: "other-sections",
		filesKey: "other-01",
		path: "src/app/sandbox/other-01",
		defaultFile: "page.tsx",
		referenceUrl: "https://linear.app",
		previewRoute: "/sandbox/other-01",
	},
	{
		id: "other-02",
		label: "other-02",
		category: "other-sections",
		filesKey: "other-02",
		path: "src/app/sandbox/other-02",
		defaultFile: "page.tsx",
		referenceUrl:
			"https://dribbble.com/shots/25800159-Cripsly-Account-Settings-CRM-Dashboard",
		previewRoute: "/sandbox/other-02",
	},
	{
		id: "other-03",
		label: "other-03",
		category: "other-sections",
		filesKey: "other-03",
		path: "src/app/sandbox/other-03",
		defaultFile: "logo-section.tsx",
		referenceUrl: "https://www.flowbase.co/preview/jambo-logo-01",
		previewRoute: "/sandbox/other-03",
	},
	{
		id: "signup-12",
		label: "signup-12",
		category: "signup-section",
		filesKey: "signup-12",
		path: "src/app/sandbox/signup-12",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/auth-1",
		previewRoute: "/sandbox/signup-12",
	},
	{
		id: "signup-13",
		label: "signup-13",
		category: "signup-section",
		filesKey: "signup-13",
		path: "src/app/sandbox/signup-13",
		defaultFile: "page.tsx",
		referenceUrl: "https://reui.io/preview/base/auth-5",
		previewRoute: "/sandbox/signup-13",
	},
]
