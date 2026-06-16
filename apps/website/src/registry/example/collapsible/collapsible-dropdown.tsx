"use client"

import { useState } from "react"
import {
	BellDot,
	Building2,
	ChevronDown,
	ChevronRight,
	CreditCard,
	GraduationCap,
	LayoutDashboard,
	Settings2,
	Users,
} from "lucide-react"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/ui/collapsible"

const NAV_ITEMS = [
	{
		id: "dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
		children: null,
	},
	{
		id: "workspace",
		label: "Workspace",
		icon: Building2,
		children: [
			{ id: "users", label: "Users", icon: Users },
			{ id: "roles", label: "Roles", icon: GraduationCap },
		],
	},
	{ id: "payments", label: "Payments", icon: CreditCard, children: null },
	{ id: "preferences", label: "Preferences", icon: Settings2, children: null },
	{ id: "alerts", label: "Alerts", icon: BellDot, children: null },
]

function NavItem({ item }: { item: (typeof NAV_ITEMS)[number] }) {
	const [open, setOpen] = useState(false)
	const Icon = item.icon

	if (!item.children) {
		return (
			<div className="hover:bg-fill2 group flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors">
				<Icon className="text-fg-secondary size-5 shrink-0" />
				<span className="text-fg flex-1 text-sm">{item.label}</span>
			</div>
		)
	}

	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<CollapsibleTrigger asChild>
				<div className="hover:bg-fill2 flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors">
					<Icon className="text-fg-secondary size-5 shrink-0" />
					<span className="text-fg flex-1 text-sm">{item.label}</span>
					{open ? (
						<ChevronDown className="text-fg-tertiary size-5 shrink-0" />
					) : (
						<ChevronRight className="text-fg-tertiary size-5 shrink-0" />
					)}
				</div>
			</CollapsibleTrigger>

			<CollapsibleContent>
				<div className="mt-0.5 flex flex-col">
					{item.children.map((child) => {
						const ChildIcon = child.icon
						return (
							<div
								key={child.id}
								className="hover:bg-fill2 flex cursor-pointer items-center gap-3 rounded-lg py-2.5 pl-11 pr-3 transition-colors">
								<ChildIcon className="text-fg-secondary size-5 shrink-0" />
								<span className="text-fg text-sm">{child.label}</span>
							</div>
						)
					})}
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}

export default function CollapsibleDropdown() {
	return (
		<div className="border-soft bg-elevation-level1 w-80 rounded-lg border p-1.5">
			{NAV_ITEMS.map((item) => (
				<NavItem key={item.id} item={item} />
			))}
		</div>
	)
}
