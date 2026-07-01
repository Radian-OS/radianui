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

type NavEntry =
	| { label: string; href: string }
	| { label: string; items: { label: string; href: string }[] }

const NAV_CONFIG: NavEntry[] = [
	{ label: "Features", href: "#" },
	{
		label: "Products",
		items: [
			{ label: "Workspace", href: "#" },
			{ label: "Data Tables", href: "#" },
			{ label: "Components", href: "#" },
		],
	},
	{
		label: "Pricing",
		items: [
			{ label: "Plans & Pricing", href: "#" },
			{ label: "Enterprise", href: "#" },
			{ label: "ROI Calculator", href: "#" },
		],
	},
	{
		label: "Resources",
		items: [
			{ label: "Help Center", href: "#" },
			{ label: "FAQs", href: "#" },
			{ label: "Documentation", href: "#" },
		],
	},
]

export default function NavigationMenuPreview() {
	return (
		<div className="flex items-center justify-center">
			<NavigationMenu viewport={false}>
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
										{entry.items.map(({ label, href }) => (
											<li key={label} className="w-full">
												<NavigationMenuLink asChild>
													<Link href={href}>{label}</Link>
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
