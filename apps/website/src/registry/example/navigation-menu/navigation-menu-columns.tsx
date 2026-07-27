"use client"

import {
	ArrowLeftRight,
	BadgeHelp,
	BookOpen,
	Box,
	Building2,
	Calculator,
	CalendarCheck,
	CircleCheck,
	CodeXml,
	Compass,
	Component,
	CreditCard,
	Handshake,
	LayoutGrid,
	Lightbulb,
	LinkIcon,
	MessageCircle,
	Monitor,
	Palette,
	Plug,
	Share2,
	ShieldCheck,
	Table,
	Terminal,
	Webhook,
	Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"

type NavItem = { label: string; href: string; icon: LucideIcon }
type NavColumn = { title: string; items: NavItem[] }
type NavEntry =
	| { label: string; href: string }
	| { label: string; columns: NavColumn[] }

const NAV_CONFIG: NavEntry[] = [
	{ label: "Features", href: "#" },
	{
		label: "Products",
		columns: [
			{
				title: "Learn & Explore",
				items: [
					{ label: "Workspace", href: "#", icon: LayoutGrid },
					{ label: "Data Tables", href: "#", icon: Table },
					{ label: "UI Kit", href: "#", icon: Component },
				],
			},
			{
				title: "Partnerships",
				items: [
					{ label: "API", href: "#", icon: CodeXml },
					{ label: "Webhooks", href: "#", icon: Webhook },
					{ label: "Integrations", href: "#", icon: Plug },
				],
			},
			{
				title: "Community",
				items: [
					{ label: "Themes", href: "#", icon: Palette },
					{ label: "Plugins", href: "#", icon: Box },
					{ label: "CLI", href: "#", icon: Terminal },
				],
			},
		],
	},
	{
		label: "Pricing",
		columns: [
			{
				title: "Plans",
				items: [
					{ label: "Pricing", href: "#", icon: LayoutGrid },
					{ label: "Enterprise", href: "#", icon: Building2 },
					{ label: "Billing", href: "#", icon: CreditCard },
				],
			},
			{
				title: "Tools",
				items: [
					{ label: "Compare", href: "#", icon: ArrowLeftRight },
					{ label: "ROI", href: "#", icon: Calculator },
					{ label: "Add-ons", href: "#", icon: Zap },
				],
			},
			{
				title: "Support",
				items: [
					{ label: "FAQ", href: "#", icon: BadgeHelp },
					{ label: "Security", href: "#", icon: ShieldCheck },
					{ label: "Docs", href: "#", icon: BookOpen },
				],
			},
		],
	},
	{
		label: "Resources",
		columns: [
			{
				title: "Learn & Explore",
				items: [
					{ label: "Product Guides", href: "#", icon: Compass },
					{ label: "Best Practices", href: "#", icon: CircleCheck },
					{ label: "Workshops", href: "#", icon: Monitor },
				],
			},
			{
				title: "Partnerships",
				items: [
					{ label: "Become a Partner", href: "#", icon: Handshake },
					{ label: "Integration Partner", href: "#", icon: LinkIcon },
					{ label: "Referral Program", href: "#", icon: Share2 },
				],
			},
			{
				title: "Community",
				items: [
					{ label: "Forums", href: "#", icon: MessageCircle },
					{ label: "Meetups", href: "#", icon: CalendarCheck },
					{ label: "Feature Requests", href: "#", icon: Lightbulb },
				],
			},
		],
	},
]

export default function NavigationMenuColumns() {
	return (
		<div className="flex w-full items-center justify-center">
			<NavigationMenu className="w-full max-w-none">
				<NavigationMenuList>
					{NAV_CONFIG.map((entry) =>
						"href" in entry ? (
							<NavigationMenuItem key={entry.label} className="hidden md:flex">
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
									asChild>
									<Link href={entry.href}>{entry.label}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						) : (
							<NavigationMenuItem key={entry.label}>
								<NavigationMenuTrigger>{entry.label}</NavigationMenuTrigger>
								<NavigationMenuContent className="w-[min(640px,calc(100vw-2rem))] px-1.5 py-0 md:w-[640px]">
									<div className="divide-border grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
										{entry.columns.map((column) => (
											<div
												key={column.title}
												className="flex flex-col gap-1.5 px-2 py-3">
												<div className="text-primary-text p-2 text-xs font-semibold uppercase">
													{column.title}
												</div>
												<ul className="flex flex-col gap-1.5">
													{column.items.map(({ label, href, icon: Icon }) => (
														<li key={label}>
															<NavigationMenuLink asChild>
																<Link
																	href={href}
																	className="flex flex-row items-center gap-2.5">
																	<Icon className="text-fg-tertiary size-5" />
																	{label}
																</Link>
															</NavigationMenuLink>
														</li>
													))}
												</ul>
											</div>
										))}
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
						)
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}
