export type SideBarItem = {
	link: string
	name: string
}

export type SideBarSection = {
	title: string
	items: SideBarItem[]
}

export const sideBarItems: SideBarSection[] = [
	{
		title: "Getting Started",
		items: [
			{ link: "/documentation/introduction", name: "Introduction" },
			{ link: "/documentation/installation", name: "Installation" },
			{ link: "/documentation/cli", name: "CLI" },
			{ link: "/documentation/figma", name: "Figma" },
			{ link: "/documentation/changelog", name: "Changelog" },
		],
	},
	{
		title: "Installation",
		items: [
			{ link: "/documentation/installation/next", name: "Nextjs" },
			{ link: "/documentation/installation/vite", name: "Vite" },
			{ link: "/documentation/installation/laravel", name: "Laravel" },
			{ link: "/documentation/installation/manual", name: "Manual" },
		],
	},
	{
		title: "Fundamentals",
		items: [
			{ link: "/documentation/colors", name: "Colors" },
			{ link: "/documentation/default-theme", name: "Default Theme" },
			{ link: "/documentation/typography", name: "Typography" },
			{ link: "/documentation/iconography", name: "Iconography" },
		],
	},
	{
		title: "Primitives",
		items: [
			{ link: "/documentation/components/alert", name: "Alert" },
			{ link: "/documentation/components/accordion", name: "Accordion" },
			{ link: "/documentation/components/avatar", name: "Avatar" },
			{ link: "/documentation/components/badge", name: "Badge" },
			{ link: "/documentation/components/banner", name: "Banner" },
			{ link: "/documentation/components/breadcrumb", name: "Breadcrumb" },
			{ link: "/documentation/components/buttons", name: "Button" },
			// { link: "/documentation/components/button-group", name: "Buttongroup" },
			{ link: "/documentation/components/calendar", name: "Calendar" },
			{ link: "/documentation/components/code-area", name: "Code Area" },
			{ link: "/documentation/components/currency-amount", name: "Currency Amount" },
			{ link: "/documentation/components/checkbox", name: "Check Box" },
			{ link: "/documentation/components/date-picker", name: "Date Picker" },
			{ link: "/documentation/components/divider", name: "Divider" },
			{ link: "/documentation/components/dropdown", name: "Dropdown" },
			{ link: "/documentation/components/drawer", name: "Drawer" },
			{ link: "/documentation/components/inputs", name: "Input" },
			{ link: "/documentation/components/input-otp", name: "Input OTP" },
			{ link: "/documentation/components/file-upload", name: "File Upload" },
			{ link: "/documentation/components/forms", name: "Form" },
			{ link: "/documentation/components/hover-card", name: "Hover Card" },
			{ link: "/documentation/components/modal", name: "Modal" },
			{ link: "/documentation/components/pagination", name: "Pagination" },
			{ link: "/documentation/components/password", name: "Password" },
			{ link: "/documentation/components/popover", name: "Popover" },
			{ link: "/documentation/components/progress-bar", name: "Progress Bar" },
			{ link: "/documentation/components/radio-group", name: "Radio Group" },
			{ link: "/documentation/components/resizable", name: "Resizable" },
			{ link: "/documentation/components/search", name: "Search" },
			{ link: "/documentation/components/skeleton", name: "Skeleton" },
			{ link: "/documentation/components/slider", name: "Slider" },
			{ link: "/documentation/components/sonner", name: "Sonner" },
			{ link: "/documentation/components/switch", name: "Switch" },
			{ link: "/documentation/components/table", name: "Table" },
			{ link: "/documentation/components/tabs", name: "Tabs" },
			{ link: "/documentation/components/text-area", name: "Text Area" },
			{ link: "/documentation/components/tooltip", name: "Tooltip" },
		].sort((a, b) => a.name.localeCompare(b.name)),
	},
	{
		title: "Website Components",
		items: [
			{ link: "/documentation/navigation-bar", name: "Navigation Bar" },
			{ link: "/documentation/hero-section", name: "Hero Section" },
			{ link: "/documentation/trusted-companies", name: "Trusted Companies" },
			{ link: "/documentation/product-features", name: "Product Features" },
			{ link: "/documentation/user-testimonials", name: "User Testimonials" },
			{
				link: "/documentation/frequently-asked-questions",
				name: "Frequently Asked Questions",
			},
			{ link: "/documentation/pricing-section", name: "Pricing Section" },
			{ link: "/documentation/call-to-action", name: "Call to Action" },
			{ link: "/documentation/footer", name: "Footer" },
		],
	},
	{
		title: "Application Components",
		items: [
			{
				link: "/documentation/user-authentication",
				name: "User Authentication",
			},
			{
				link: "/documentation/left-navigation-bar",
				name: "Left Navigation Bar",
			},
			{ link: "/documentation/top-navigation-bar", name: "Top Navigation Bar" },
			{
				link: "/documentation/application-settings",
				name: "Application Settings",
			},
		],
	},
]
