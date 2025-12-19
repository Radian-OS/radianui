export type NavigationItem = {
	title: string
	description?: string
	url: string
	thumbnail?: string
	thumbnailDark?: string
	alt?: string
	isNew?: boolean
	isUpdated?: boolean
	isComingSoon?: boolean
	subItems?: NavigationItem[]
}

export type NavigationSection = {
	title: string
	description?: string
	items: NavigationItem[]
	searchIcon?: string
}

// Helper to generate thumbnail paths
const getThumbnail = (title: string, dark = false) => `/thumbnails/${title.toLowerCase().replace(/\s+/g, "-")}${dark ? "-dark" : ""}.webp`

// ===== Fundamentals & Components Data =====
const FUNDAMENTALS_DATA = [
	{
		title: "Colors",
		description: "156 colors, 70 color tokens",
	},
	{
		title: "Typography",
		description: "17 Styles",
	},
	{
		title: "Iconography",
		description: "1,200 Components",
	},
	{
		title: "Theme",
		description: "8 Types",
		subItems: [
			{ title: "Next.js", url: "/docs/fundamentals/theme/nextjs" },
			{ title: "Vite", url: "/docs/fundamentals/theme/vite" },
		],
	},
]

const COMPONENTS_DATA = [
	"Alert",
	"Alert Dialog",
	"Accordion",
	"Aspect Ratio",
	"Avatar",
	"Badge",
	"Banner",
	"Breadcrumb",
	"Button",
	"Calendar",
	"Card",
	"Carousel",
	"Code Area",
	"Collapsible",
	"Combobox",
	"Command",
	"Currency Input",
	"Chart",
	"Checkbox",
	"Date Picker",
	"Dialog",
	"Divider",
	"Dropdown",
	"Drawer",
	"Empty",
	"Input",
	"OTP Field",
	"File Upload",
	"Form",
	"Hover Card",
	"Label",
	"Pagination",
	"Phone Number",
	"Popover",
	"Progress",
	"Radio Group",
	"Resizable",
	"Scroll Area",
	"Select",
	"Sidebar",
	"Skeleton",
	"Slider",
	"Sonner",
	"Spinner",
	"Switch",
	"Table",
	"Tabs",
	"Text Area",
	"Tooltip",
]

// Map Components array to NavigationItem
const generateComponentsItems = COMPONENTS_DATA.map((title) => ({
	title,
	url: `/docs/components/${title.toLowerCase().replace(/\s+/g, "-")}`,
	thumbnail: getThumbnail(title),
	thumbnailDark: getThumbnail(title, true),
	alt: `${title} UI component illustration`,
}))

// ===== Getting Started & Installation Sections =====
const GETTING_STARTED_ITEMS: NavigationItem[] = [
	{ title: "Introduction", url: "/docs/getting-started/introduction" },
	{ title: "Installation", url: "/docs/getting-started/installation" },
	{ title: "CLI", url: "/docs/getting-started/cli" },
	{ title: "Figma", url: "/docs/getting-started/figma" },
	{ title: "Changelog", url: "/docs/getting-started/changelog" },
]

const INSTALLATION_ITEMS: NavigationItem[] = [
	{ title: "Nextjs", url: "/docs/installation/next" },
	{ title: "Vite", url: "/docs/installation/vite" },
	{ title: "Manual", url: "/docs/installation/manual" },
]

// ===== Blocks Section =====
const BLOCKS_DATA = [
	{ title: "Sign In", category: "authentication" },
	{ title: "Sign Up", category: "authentication" },
	{ title: "Verification", category: "authentication" },
	{ title: "Forgot Password", category: "authentication" },
	{ title: "Reset Password", category: "authentication" },
	{ title: "Hero Section", category: "website" },
]
const BLOCKS_ITEMS: NavigationItem[] = BLOCKS_DATA.map(({ title, category }) => ({
	title,
	url: `${process.env.NEXT_PUBLIC_BLOCKS_URL!}/blocks/${category}/${title.toLowerCase().replace(/\s+/g, "-")}`,
}))

// ===== Animations Section =====
const ANIMATIONS_ITEMS: NavigationItem[] = ["Fade", "Infinite Scroll", "Pointer"].map((title) => ({
	title,
	url: "#",
	isComingSoon: true,
}))

// ===== Fundamentals Items Mapping =====
const FUNDAMENTALS_ITEMS: NavigationItem[] = FUNDAMENTALS_DATA.map((item) => ({
	title: item.title,
	description: item.description,
	url: `/docs/fundamentals/${item.title.toLowerCase().replace(/\s+/g, "-")}`,
	thumbnail: getThumbnail(item.title),
	thumbnailDark: getThumbnail(item.title, true),
	alt: `${item.title} illustration`,
	subItems: item.subItems?.map((sub) => ({
		...sub,
		url: sub.url,
	})),
}))

// ===== Final Navigation =====
export const navigationItems: NavigationSection[] = [
	{ title: "Getting Started", searchIcon: "/search-icons/search-installation.svg", items: GETTING_STARTED_ITEMS },
	{ title: "Installation", searchIcon: "/search-icons/search-installation.svg", items: INSTALLATION_ITEMS },
	{
		title: "Fundamentals",
		searchIcon: "/search-icons/search-fundamentals.svg",
		description: "Universal settings for building a strong foundation for a digital product",
		items: FUNDAMENTALS_ITEMS,
	},
	{
		title: "Components",
		searchIcon: "/search-icons/search-components.svg",
		items: generateComponentsItems.sort((a, b) => a.title.localeCompare(b.title)),
	},
	{ title: "Blocks", searchIcon: "/search-icons/search-components.svg", items: BLOCKS_ITEMS },
	{ title: "Animations", searchIcon: "/search-icons/search-components.svg", items: ANIMATIONS_ITEMS.sort((a, b) => a.title.localeCompare(b.title)) },
]
