import {
	AppWindowMac,
	Box,
	ClipboardCheck,
	CodeXml,
	FileText,
	LetterText,
	PaintBucket,
	ScrollText,
	SquareTerminal,
	SunMoon,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
	FigmaIcon,
	NextJsIcon,
	ResourcesIcon,
	ViteIcon,
} from "@/components/custom/icon"

export type NavigationItem = {
	title: string
	description?: string
	url: string
	icon?: LucideIcon
	thumbnail?: string
	thumbnailDark?: string
	alt?: string
	isNew?: boolean
	isUpdated?: boolean
	isComingSoon?: boolean
	disabled?: boolean
	subItems?: NavigationItem[]
	isExternal?: boolean
}

export type NavigationSection = {
	title: string
	description?: string
	items: NavigationItem[]
	searchIcon?: string
}

// Helper to generate thumbnail paths
const getThumbnail = (title: string, dark = false) =>
	`/thumbnails/${title.toLowerCase().replace(/\s+/g, "-")}${dark ? "-dark" : ""}.webp`

// ===== Fundamentals & Components Data =====
const FUNDAMENTALS_DATA = [
	{
		title: "Colors",
		description: "156 colors, 70 color tokens",
		icon: PaintBucket,
	},
	{
		title: "Typography",
		description: "17 Styles",
		icon: LetterText,
	},
	{
		title: "Iconography",
		description: "1,200 Components",
		icon: Box,
	},
	{
		title: "Theme",
		description: "8 Types",
		icon: SunMoon,
		subItems: [
			{ title: "Next.js", url: "/docs/fundamentals/theme/nextjs" },
			{ title: "Vite", url: "/docs/fundamentals/theme/vite" },
		],
	},
]

export const COMPONENTS_DATA = [
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
	"Context Menu",
	"Currency Input",
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
	"Menubar",
	"Navigation Menu",
	"Pagination",
	"Phone Number Input",
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
	"Stepper",
	"Switch",
	"Table",
	"Tabs",
	"Text Area",
	"Toggle",
	"Toggle Group",
	"Tooltip",
]

const NEW_COMPONENTS = new Set([
	"Changelog",
	"Context Menu",
	"Menubar",
	"Navigation Menu",
	"Sidebar",
	"Stepper",
	"Toggle",
	"Toggle Group",
])

// Map Components array to NavigationItem
const generateComponentsItems = COMPONENTS_DATA.map((title) => ({
	title,
	url: `/docs/components/${title.toLowerCase().replace(/\s+/g, "-")}`,
	thumbnail: getThumbnail(title),
	thumbnailDark: getThumbnail(title, true),
	alt: `${title} UI component illustration`,
	isNew: NEW_COMPONENTS.has(title),
}))

// ===== Getting Started & Installation Sections =====

const GETTING_STARTED_ITEMS: NavigationItem[] = [
	{
		title: "Introduction",
		url: "/docs/getting-started/introduction",
		icon: ClipboardCheck,
	},
	{
		title: "Installation",
		url: "/docs/getting-started/installation",
		icon: AppWindowMac,
	},
	{
		title: "CLI",
		url: "/docs/getting-started/cli",
		icon: SquareTerminal,
	},
	{
		title: "Figma",
		url: "/docs/getting-started/figma",
		icon: FigmaIcon,
	},
	{
		title: "Changelog",
		url: "/docs/getting-started/changelog",
		icon: ScrollText,
	},
	{
		title: "Resources",
		url: "/docs/getting-started/resources",
		icon: ResourcesIcon,
		isNew: true,
	},
	{
		title: "llms.txt",
		url: "/llms.txt",
		icon: FileText,
		isNew: true,
	},
]

const INSTALLATION_ITEMS: NavigationItem[] = [
	{
		title: "Nextjs",
		url: "/docs/installation/next",
		icon: NextJsIcon,
	},
	{
		title: "Vite",
		url: "/docs/installation/vite",
		icon: ViteIcon,
	},
	{
		title: "Manual",
		url: "/docs/installation/manual",
		icon: CodeXml,
	},
]

// ===== Blocks Section =====
const BLOCKS_DATA = [
	{ title: "Sign In", category: "authentication" },
	{ title: "Sign Up", category: "authentication" },
	{ title: "Verification", category: "authentication" },
	{ title: "Password Reset", category: "authentication" },
	{ title: "Reset Email Sent", category: "authentication" },
	{ title: "New Password", category: "authentication" },
	{ title: "Sidebar", category: "webapp" },
	{ title: "Onboarding", category: "webapp" },
]
const BLOCKS_ITEMS: NavigationItem[] = BLOCKS_DATA.map(
	({ title, category }) => ({
		title,
		url: `${process.env.NEXT_PUBLIC_BLOCKS_URL!}/blocks/${category}/${title.toLowerCase().replace(/\s+/g, "-")}`,
		isExternal: true,
	})
)

// ===== Animations Section =====
const ANIMATIONS_ITEMS: NavigationItem[] = [
	"Fade",
	"Infinite Scroll",
	"Pointer",
].map((title) => ({
	title,
	url: "#",
	isComingSoon: true,
	disabled: true,
}))

// ===== Fundamentals Items Mapping =====
const FUNDAMENTALS_ITEMS: NavigationItem[] = FUNDAMENTALS_DATA.map((item) => ({
	title: item.title,
	description: item.description,
	url: `/docs/fundamentals/${item.title.toLowerCase().replace(/\s+/g, "-")}`,
	icon: item.icon,
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
	{
		title: "Getting Started",
		searchIcon: "/search-icons/search-installation.svg",
		items: GETTING_STARTED_ITEMS,
	},
	{
		title: "Installation",
		searchIcon: "/search-icons/search-installation.svg",
		items: INSTALLATION_ITEMS,
	},
	{
		title: "Fundamentals",
		searchIcon: "/search-icons/search-fundamentals.svg",
		description:
			"Universal settings for building a strong foundation for a digital product",
		items: FUNDAMENTALS_ITEMS,
	},
	{
		title: "Components",
		searchIcon: "/search-icons/search-components.svg",
		items: generateComponentsItems.sort((a, b) =>
			a.title.localeCompare(b.title)
		),
	},
	{
		title: "Blocks",
		searchIcon: "/search-icons/search-ui-blocks.svg",
		items: BLOCKS_ITEMS,
	},
	{
		title: "Animations",
		searchIcon: "/search-icons/search-components.svg",
		items: ANIMATIONS_ITEMS.sort((a, b) => a.title.localeCompare(b.title)),
	},
]
