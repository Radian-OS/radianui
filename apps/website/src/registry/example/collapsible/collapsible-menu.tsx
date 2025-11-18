"use client"

import React from "react"
import type { LucideIcon } from "lucide-react"
import { ChartColumnBig, ChartNetwork, ChevronDown, CopyCheck, Grid2X2, House, Layers2, Search, Users } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage, AvatarStatus } from "@/registry/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible"
import { Divider } from "@/registry/ui/divider"
import { Input, InputWrapper } from "@/registry/ui/input"

type SubMenuItem = {
	id: string
	label: string
	href: string
}

type MenuItem = {
	id: string
	label: string
	icon: LucideIcon
	href?: string
	subMenuItems?: SubMenuItem[]
}

type MenuItemEntryProps = {
	item: MenuItem
	activeId: string | null
	onActivate: (id: string) => void
}

const MENU_ITEMS: MenuItem[] = [
	{
		id: "overview",
		label: "Overview",
		icon: House,
		href: "#collapsible-menu",
	},
	{
		id: "analytics",
		label: "Analytics",
		icon: ChartColumnBig,
		href: "#collapsible-menu",
	},
	{
		id: "products",
		label: "Products",
		icon: Layers2,
		href: "#collapsible-menu",
	},
	{
		id: "tasks",
		label: "My Tasks",
		icon: CopyCheck,
		href: "#collapsible-menu",
	},
	{
		id: "reporting",
		label: "Reporting",
		icon: ChartNetwork,
		href: "#collapsible-menu",
	},
	{
		id: "workspace",
		label: "Workspace",
		icon: Grid2X2,
		subMenuItems: [
			{ id: "roadmap", label: "Roadmap", href: "#collapsible-menu" },
			{ id: "integrations", label: "Integrations", href: "#collapsible-menu" },
			{ id: "security", label: "Security", href: "#collapsible-menu" },
		],
	},
	{
		id: "shared",
		label: "Shared with members",
		icon: Users,
		subMenuItems: [
			{ id: "handoff", label: "Design handoff", href: "#collapsible-menu" },
			{ id: "collections", label: "Collections", href: "#collapsible-menu" },
			{ id: "permissions", label: "Permissions", href: "#collapsible-menu" },
		],
	},
]

const menuTriggerBaseClasses =
	"hover:bg-fill1 focus-visible:ring-alpha group flex w-full items-center rounded-md p-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2"

const activeClasses = "data-[active=true]:bg-primary-accent data-[active=true]:text-primary-text"
const iconClasses = "text-fg-secondary size-5 group-data-[active=true]:text-primary"

function MenuItemEntry({ item, activeId, onActivate }: MenuItemEntryProps) {
	const hasChildren = Boolean(item.subMenuItems?.length)

	if (!hasChildren) {
		const isActive = activeId === item.id

		return (
			<Link href={item.href || "#"} className={cn(menuTriggerBaseClasses, activeClasses, "gap-2")} data-active={isActive ? "true" : undefined} onClick={() => onActivate(item.id)}>
				<item.icon className={iconClasses} />
				{item.label}
			</Link>
		)
	}

	const isParentActive = item.subMenuItems?.some((link) => link.id === activeId)

	return (
		<Collapsible className="group flex flex-col gap-0.5" defaultOpen={isParentActive}>
			<CollapsibleTrigger
				className={cn("data-[state=open]:bg-fill2 group justify-between", menuTriggerBaseClasses, activeClasses)}
				data-active={isParentActive ? "true" : undefined}>
				<span className="flex items-center gap-2">
					<item.icon className={iconClasses} />
					{item.label}
				</span>
				<ChevronDown className="text-fg-tertiary size-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
			</CollapsibleTrigger>
			<CollapsibleContent>
				<ul className="space-y-0.5">
					{item.subMenuItems?.map((link) => {
						const isActive = activeId === link.id

						return (
							<li key={link.id}>
								<Link
									href={link.href}
									className={cn(menuTriggerBaseClasses, activeClasses, "ps-9")}
									data-active={isActive ? "true" : undefined}
									onClick={() => onActivate(link.id)}>
									{link.label}
								</Link>
							</li>
						)
					})}
				</ul>
			</CollapsibleContent>
		</Collapsible>
	)
}

export default function CollapsibleMenu() {
	const [activeId, setActiveId] = React.useState<string | null>(null)

	return (
		<div className="border-soft bg-bg shadow-xs max-w-67.5 flex w-full flex-col rounded-xl border text-sm">
			<header className="flex items-center gap-2 px-4 py-3">
				<Avatar size="40">
					<AvatarImage src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=160&q=80" alt="Amelie Laurent" />
					<AvatarFallback>AL</AvatarFallback>
					<AvatarStatus variant="online" className="bottom-0 right-0" />
				</Avatar>
				<div className="flex flex-col">
					<span className="font-medium">Amelie Laurent</span>
					<span className="text-fg-secondary">amelie@radian.com</span>
				</div>
			</header>

			<Divider />

			<div className="flex flex-col gap-2 py-4">
				<div className="px-4">
					<InputWrapper>
						<Search className="text-fg-tertiary size-4" />
						<Input type="search" placeholder="Search" />
					</InputWrapper>
				</div>

				<nav className="flex flex-col gap-0.5 px-2">
					{MENU_ITEMS.map((item) => (
						<MenuItemEntry key={item.id} item={item} activeId={activeId} onActivate={setActiveId} />
					))}
				</nav>
			</div>
		</div>
	)
}
