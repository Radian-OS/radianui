"use client"

import { useState } from "react"
import { BrainCircuit, MailCheck, Moon, SendToBack } from "lucide-react"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"

const data = [
	{
		value: "email-notifications",
		id: "setting_email_notifications",
		title: "Enable email notifications",
		description: "Stay informed about updates, and account activity.",
		icon: MailCheck,
	},
	{
		value: "dark-mode",
		id: "setting_dark_mode",
		title: "Use dark mode by default",
		description: "Automatically apply the dark theme",
		icon: Moon,
	},
	{
		value: "remember-workspace",
		id: "setting_remember_workspace",
		title: "Remember my last workspace",
		description: "Open the workspace you were last",
		icon: BrainCircuit,
	},
	{
		value: "usage-analytics",
		id: "setting_usage_analytics",
		title: "Send anonymous usage analytics",
		description: "Help improve the product by sharing usage insights.",
		icon: SendToBack,
	},
]

export default function CheckboxCardSetup() {
	const [checkedItems, setCheckedItems] = useState<string[]>([
		"setting_email_notifications",
	])

	const toggle = (id: string) => {
		setCheckedItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		)
	}

	return (
		<div className="flex flex-col gap-3">
			{data.map((view) => {
				const Icon = view.icon
				return (
					<Label
						key={view.value}
						htmlFor={view.id}
						className="border-soft-alpha hover:bg-fill1-alpha bg-bg group flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors">
						{/* Icon */}
						<div className="bg-fill1 group-hover:bg-bg text-fg-secondary flex size-11 shrink-0 items-center justify-center rounded-[10px] transition-colors">
							<Icon className="size-5" />
						</div>

						{/* Content */}
						<div className="flex flex-1 flex-col gap-1">
							<p className="text-fg cursor-pointer text-sm font-medium leading-5">
								{view.title}
							</p>
							<p className="text-fg-tertiary text-sm font-normal leading-5">
								{view.description}
							</p>
						</div>

						<Checkbox
							className="cursor-pointer self-start"
							id={view.id}
							checked={checkedItems.includes(view.id)}
							onCheckedChange={() => toggle(view.id)}
							onClick={(e) => e.stopPropagation()}
						/>
					</Label>
				)
			})}
		</div>
	)
}
