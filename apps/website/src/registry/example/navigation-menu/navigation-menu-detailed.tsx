import {
	ArrowLeftRight,
	ArrowRight,
	BadgeCheck,
	BadgeDollarSign,
	BookOpen,
	ChevronsUpDown,
	CircleUserRound,
	CodeXml,
	Compass,
	Component,
	CreditCard,
	Figma,
	FileStack,
	Flag,
	History,
	LayoutDashboard,
	Megaphone,
	MousePointerClick,
	PenTool,
	Rocket,
	ShieldCheck,
	Sparkles,
	SquareMenu,
	TextCursorInput,
	UsersRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"

type MenuItem = {
	title: string
	description: string
	href: string
	icon: LucideIcon
	active?: boolean
}

type MenuSection = {
	title: string
	items: MenuItem[]
}

const PRODUCT_SECTIONS: MenuSection[] = [
	{
		title: "Components",
		items: [
			{
				title: "Button",
				description:
					"Trigger actions with flexible button variants and states.",
				href: "#",
				icon: MousePointerClick,
			},
			{
				title: "Input",
				description: "Capture user input with accessible form controls.",
				href: "#",
				icon: TextCursorInput,
				active: true,
			},
			{
				title: "Dropdown",
				description: "Capture user input with accessible form controls.",
				href: "#",
				icon: ChevronsUpDown,
			},
			{
				title: "Dialog",
				description: "Display modal content for confirmations and workflows.",
				href: "#",
				icon: SquareMenu,
			},
		],
	},
	{
		title: "Blocks",
		items: [
			{
				title: "Authentication",
				description: "Ready-to-use sign in, sign up, and recovery pages.",
				href: "#",
				icon: ShieldCheck,
			},
			{
				title: "Dashboard",
				description:
					"Complete admin layouts with charts, tables, and navigation.",
				href: "#",
				icon: LayoutDashboard,
			},
			{
				title: "Marketing",
				description: "Landing pages designed for products, startups, and SaaS.",
				href: "#",
				icon: Megaphone,
			},
			{
				title: "Pricing",
				description: "Flexible pricing sections with plans, billing, and FAQs.",
				href: "#",
				icon: BadgeDollarSign,
			},
		],
	},
	{
		title: "Resources",
		items: [
			{
				title: "Ui Avatars",
				description: "Diverse avatar collection for products and prototypes.",
				href: "#",
				icon: CircleUserRound,
			},
			{
				title: "Country Flags",
				description: "Production-ready flags for countries and regions.",
				href: "#",
				icon: Flag,
			},
			{
				title: "Brand Logos",
				description: "Popular company logos in multiple formats and styles.",
				href: "#",
				icon: BadgeCheck,
			},
			{
				title: "File Icons",
				description: "Common file type icons for documents and applications.",
				href: "#",
				icon: FileStack,
			},
		],
	},
]

const USE_CASE_SECTIONS: MenuSection[] = [
	{
		title: "By Platform",
		items: [
			{
				title: "Figma UI Kit",
				description: "Build UI faster with production-ready Figma components.",
				href: "#",
				icon: Figma,
			},
			{
				title: "React Components",
				description:
					"Copy and customize accessible React components with ease.",
				href: "#",
				icon: Component,
				active: true,
			},
			{
				title: "Tailwind CSS",
				description: "Utility-first components built with Tailwind CSS.",
				href: "#",
				icon: CodeXml,
			},
			{
				title: "Radian UI",
				description: "A complete UI library for modern web applications.",
				href: "#",
				icon: Sparkles,
			},
		],
	},
	{
		title: "By Role",
		items: [
			{
				title: "Product Designers",
				description: "Design consistent products using reusable UI patterns.",
				href: "#",
				icon: PenTool,
			},
			{
				title: "Frontend Developers",
				description:
					"Ship interfaces faster with developer-friendly components.",
				href: "#",
				icon: CodeXml,
			},
			{
				title: "Design Teams",
				description:
					"Standardize workflows across your entire design organization.",
				href: "#",
				icon: UsersRound,
			},
			{
				title: "Startups",
				description: "Launch polished products with ready-made design assets.",
				href: "#",
				icon: Rocket,
			},
		],
	},
	{
		title: "By Workflow",
		items: [
			{
				title: "Design Systems",
				description:
					"Build scalable systems with shared components and tokens.",
				href: "#",
				icon: Component,
			},
			{
				title: "Documentation",
				description: "Keep your design system organized and easy to use.",
				href: "#",
				icon: BookOpen,
			},
			{
				title: "Handoff",
				description:
					"Bridge design and development with production-ready assets.",
				href: "#",
				icon: ArrowLeftRight,
			},
		],
	},
]

const RESOURCE_SECTIONS: MenuSection[] = [
	{
		title: "Learn",
		items: [
			{
				title: "Documentation",
				description: "Learn every resource and design guideline in one place.",
				href: "#",
				icon: BookOpen,
			},
			{
				title: "Getting Started",
				description: "Set up Radian quickly with installation and first steps.",
				href: "#",
				icon: Rocket,
				active: true,
			},
			{
				title: "Design Principles",
				description: "Understand the design rules behind every component.",
				href: "#",
				icon: Compass,
			},
			{
				title: "Changelog",
				description: "Explore latest improvements, fixes, and new releases.",
				href: "#",
				icon: History,
			},
		],
	},
	{
		title: "Tools",
		items: [
			{
				title: "Avatar Generator",
				description:
					"Generate consistent avatars for interfaces and prototypes.",
				href: "#",
				icon: CircleUserRound,
			},
			{
				title: "Logo Generator",
				description: "Create simple placeholder logos for demos and mockups.",
				href: "#",
				icon: Sparkles,
			},
			{
				title: "Country Flags",
				description:
					"Browse and copy production ready flags for your projects.",
				href: "#",
				icon: Flag,
			},
			{
				title: "Credit Card",
				description: "Explore popular credit cards company assets.",
				href: "#",
				icon: CreditCard,
			},
		],
	},
]

const RESOURCE_LINKS = ["Template", "Community", "GitHub", "Roadmap"]

function MenuColumn({ section }: { section: MenuSection }) {
	return (
		<div className="flex min-w-0 flex-col gap-1.5 px-2 py-3">
			<div className="text-fg-secondary px-2 py-2 text-xs font-medium uppercase">
				{section.title}
			</div>
			<ul className="flex flex-col gap-1">
				{section.items.map(
					({ title, description, href, icon: Icon, active }) => (
						<li key={title}>
							<NavigationMenuLink
								asChild
								className={cn(
									"min-h-18 flex flex-row items-start gap-3 rounded-lg p-3",
									active && "bg-fill1-alpha"
								)}>
								<Link href={href}>
									<span className="bg-fill1 flex size-9 shrink-0 items-center justify-center rounded-lg">
										<Icon className="text-fg-secondary size-5" />
									</span>
									<span className="flex min-w-0 flex-1 flex-col gap-0.5">
										<span className="text-fg text-sm font-medium">{title}</span>
										<span className="text-fg-secondary text-[13px]">
											{description}
										</span>
									</span>
								</Link>
							</NavigationMenuLink>
						</li>
					)
				)}
			</ul>
		</div>
	)
}

function ProductPromo() {
	return (
		<div className="bg-fill1-alpha flex min-w-0 flex-col gap-3 px-4 py-5">
			<div className="border-border bg-bg h-38.25 relative overflow-hidden rounded-xl border">
				<Image
					src="/og/static-og.png"
					alt="Radian library preview"
					fill
					className="object-cover"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<span className="text-fg text-sm font-medium">
					Explore the Radian Library
				</span>
				<p className="text-fg-secondary text-[13px]">
					Discover production-ready components, blocks, and design assets built
					for modern products.
				</p>
			</div>
			<Button variant="link">
				Browse Library
				<ArrowRight />
			</Button>
		</div>
	)
}

export default function NavigationMenuDetailed() {
	return (
		<div className="flex w-full items-center justify-center">
			<NavigationMenu className="w-[calc(100vw-2rem)] max-w-none flex-none">
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Product</NavigationMenuTrigger>
						<NavigationMenuContent className="w-[calc(100vw-2rem)] overflow-hidden rounded-xl p-0 shadow-lg md:w-[1070px] md:max-w-[calc(100vw-2rem)]">
							<div className="divide-border grid grid-cols-1 divide-y md:grid-cols-[repeat(3,minmax(0,1fr))_268px] md:divide-x md:divide-y-0">
								{PRODUCT_SECTIONS.map((section) => (
									<MenuColumn key={section.title} section={section} />
								))}
								<ProductPromo />
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Use Cases</NavigationMenuTrigger>
						<NavigationMenuContent className="w-[calc(100vw-2rem)] overflow-hidden rounded-xl p-0 shadow-lg md:w-[804px] md:max-w-[calc(100vw-2rem)]">
							<div className="divide-border grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
								{USE_CASE_SECTIONS.map((section) => (
									<MenuColumn key={section.title} section={section} />
								))}
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							asChild
							className={navigationMenuTriggerStyle()}>
							<Link href="#">Pricing</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Resources</NavigationMenuTrigger>
						<NavigationMenuContent className="w-[calc(100vw-2rem)] overflow-hidden rounded-xl p-0 shadow-lg md:w-[730px] md:max-w-[calc(100vw-2rem)]">
							<div className="divide-border grid grid-cols-1 divide-y md:grid-cols-[repeat(2,minmax(0,1fr))_244px] md:divide-x md:divide-y-0">
								{RESOURCE_SECTIONS.map((section) => (
									<MenuColumn key={section.title} section={section} />
								))}
								<div className="bg-fill1-alpha flex min-w-0 flex-col gap-3 px-4 py-3">
									<div className="text-fg-secondary py-2 text-xs font-medium uppercase">
										Additional Links
									</div>
									<ul className="flex flex-col gap-1">
										{RESOURCE_LINKS.map((label) => (
											<li key={label}>
												<NavigationMenuLink
													asChild
													className="rounded-md px-0 py-1.5 text-sm font-normal hover:bg-transparent focus:bg-transparent">
													<Link href="#">{label}</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</div>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}
