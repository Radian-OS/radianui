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
		id: "overview",
		label: "Overview",
		icon: Grid2X2,
		subMenuItems: [
			{ id: "menu-item-1", label: "Menu Item 1", href: "#collapsible-menu" },
			{ id: "menu-item-2", label: "Menu Item 2", href: "#collapsible-menu" },
			{ id: "menu-item-3", label: "Menu Item 3", href: "#collapsible-menu" },
		],
	},
	{
		id: "shared",
		label: "Shared with members",
		icon: Users,
		subMenuItems: [
			{ id: "menu-item-4", label: "Menu Item 4", href: "#collapsible-menu" },
			{ id: "menu-item-5", label: "Menu Item 5", href: "#collapsible-menu" },
			{ id: "menu-item-6", label: "Menu Item 6", href: "#collapsible-menu" },
		],
	},
]

const menuTriggerBaseClasses =
	"hover:bg-fill2 focus-visible:ring-alpha flex w-full items-center rounded-md p-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2"

function MenuItemCollapsible({ item }: { item: MenuItem }) {
	return (
		<Collapsible className="group flex flex-col gap-0.5">
			<CollapsibleTrigger className={cn("data-[state=open]:bg-fill2 group justify-between", menuTriggerBaseClasses)}>
				<span className="flex items-center gap-2">
					<item.icon className="text-fg-secondary size-5" />
					{item.label}
				</span>
				<ChevronDown className="text-fg-tertiary size-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
			</CollapsibleTrigger>
			<CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
				<ul className="text-fg-secondary space-y-0.5">
					{item.subMenuItems?.map((link) => (
						<li key={link.id}>
							<Link href={link.href} className={cn(menuTriggerBaseClasses, "px-9")}>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</CollapsibleContent>
		</Collapsible>
	)
}

function MenuItemStatic({ item }: { item: MenuItem }) {
	return (
		<Link href={item.href || "#"} className={cn(menuTriggerBaseClasses, "gap-2")}>
			<item.icon className="text-fg-secondary size-5" />
			{item.label}
		</Link>
	)
}

export default function CollapsibleMenu() {
	return (
		<div className="border-soft bg-bg shadow-xs max-w-67.5 flex w-full flex-col rounded-2xl border text-sm">
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
					{MENU_ITEMS.map((item) =>
						item.subMenuItems?.length ? <MenuItemCollapsible key={"collapsible-" + item.id} item={item} /> : <MenuItemStatic key={"static-" + item.id} item={item} />
					)}
				</nav>
			</div>
		</div>
	)
}
