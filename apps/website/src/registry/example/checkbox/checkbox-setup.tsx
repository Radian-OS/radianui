"use client"

import React from "react"
import { Bell, FolderPlus, PlugZap, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/registry/ui/checkbox"

type SetupItem = {
	id: string
	icon: React.ReactNode
	title: string
	description: string
}

const setupItems: SetupItem[] = [
	{
		id: "workspace",
		icon: <FolderPlus className="size-6" />,
		title: "Create workspace",
		description: "Set up a dedicated space for your team and projects.",
	},
	{
		id: "invite",
		icon: <UserPlus className="size-6" />,
		title: "Invite team members",
		description: "Add teammates so they can collaborate and contribute.",
	},
	{
		id: "integrations",
		icon: <PlugZap className="size-6" />,
		title: "Connect integrations",
		description: "Connect apps to streamline workflows.",
	},
	{
		id: "notifications",
		icon: <Bell className="size-6" />,
		title: "Enable notifications",
		description: "Stay informed about updates, activity, and important events.",
	},
]

const CheckboxSetup = () => {
	const [checked, setChecked] = React.useState<Record<string, boolean>>({
		workspace: false,
		invite: true,
		integrations: false,
		notifications: true,
	})

	const toggle = (id: string) =>
		setChecked((prev) => ({ ...prev, [id]: !prev[id] }))

	return (
		<div className="flex flex-col gap-3">
			<p className="text-fg text-sm font-semibold">Project Setup</p>
			{setupItems.map((item) => (
				<div
					key={item.id}
					onClick={() => toggle(item.id)}
					className={cn(
						"w-125 border-soft-alpha bg-bg flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all",
						checked[item.id] && "border-primary"
					)}>
					<div className="bg-fill2 text-fg-secondary flex items-center justify-center rounded-xl p-2.5">
						{item.icon}
					</div>
					<div className="flex flex-1 flex-col gap-0.5">
						<span className="text-fg text-sm font-medium">{item.title}</span>
						<span className="text-fg-tertiary text-sm font-normal">
							{item.description}
						</span>
					</div>
					<Checkbox
						checked={checked[item.id]}
						onCheckedChange={() => toggle(item.id)}
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			))}
		</div>
	)
}

export default CheckboxSetup
