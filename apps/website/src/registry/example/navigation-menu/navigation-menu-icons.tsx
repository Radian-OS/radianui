import {
	Book,
	Building2,
	Calculator,
	CircleHelp,
	Component,
	LayoutDashboard,
	LifeBuoy,
	Table,
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
type NavEntry =
	| { label: string; href: string }
	| { label: string; items: NavItem[] }

const NAV_CONFIG: NavEntry[] = [
	{ label: "Features", href: "#" },
	{
		label: "Products",
		items: [
			{ label: "Workspace", href: "#", icon: LayoutDashboard },
			{ label: "Data Tables", href: "#", icon: Table },
			{ label: "Components", href: "#", icon: Component },
		],
	},
	{
		label: "Pricing",
		items: [
			{ label: "Plans & Pricing", href: "#", icon: LayoutDashboard },
			{ label: "Enterprise", href: "#", icon: Building2 },
			{ label: "ROI Calculator", href: "#", icon: Calculator },
		],
	},
	{
		label: "Resources",
		items: [
			{ label: "Help Center", href: "#", icon: LifeBuoy },
			{ label: "FAQs", href: "#", icon: CircleHelp },
			{ label: "Documentation", href: "#", icon: Book },
		],
	},
]

export default function NavigationMenuIcons() {
	return (
		<div className="flex items-center justify-center">
			<NavigationMenu>
				<NavigationMenuList>
					{NAV_CONFIG.map((entry) =>
						"href" in entry ? (
							<NavigationMenuItem key={entry.label}>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
									asChild>
									<Link href={entry.href}>{entry.label}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						) : (
							<NavigationMenuItem key={entry.label}>
								<NavigationMenuTrigger>{entry.label}</NavigationMenuTrigger>
								<NavigationMenuContent className="min-w-50 p-2">
									<ul className="flex w-full flex-col gap-1.5 px-1.5 py-1">
										{entry.items.map(({ label, href, icon: Icon }) => (
											<li key={label} className="w-full">
												<NavigationMenuLink asChild>
													<Link
														href={href}
														className="flex flex-row items-center gap-2">
														<Icon className="text-fg-tertiary size-5" />
														{label}
													</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						)
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}
