"use client"

import { useId } from "react"
import { ChartLine, Cloud, Globe } from "lucide-react"
import { Label } from "@/registry/ui/label"
import { Switch, SwitchWrapper } from "@/registry/ui/switch"

type PreferenceItem = {
	id: string
	label: string
	description: string
	icon: React.ReactNode
	defaultChecked?: boolean
}

const preferences: PreferenceItem[] = [
	{
		id: "cloud-storage",
		label: "Cloud Storage Sync",
		description: "Sync files across devices in real-time",
		icon: <Cloud className="size-6" />,
		defaultChecked: false,
	},
	{
		id: "email-notifications",
		label: "Email Notifications",
		description: "Send system alerts and weekly summaries",
		icon: <Globe className="size-6" />,
		defaultChecked: true,
	},
	{
		id: "analytics-tracking",
		label: "Analytics Tracking",
		description: "Collect usage data to improve experience",
		icon: <ChartLine className="size-6" />,
		defaultChecked: false,
	},
]

function PreferenceCard({ item }: { item: PreferenceItem }) {
	const id = useId()

	return (
		<Label htmlFor={id} className="cursor-pointer">
			<div className="border-soft-alpha has-[[data-state=checked]~*]:border-primary-border has-[button[data-state=checked]]:border-primary bg-bg relative flex w-full items-center gap-4 rounded-xl border p-4 transition-colors">
				{/* Icon */}
				<div className="text-fg-secondary bg-fill2 flex shrink-0 items-center justify-center rounded-xl p-2.5">
					{item.icon}
				</div>

				{/* Text */}
				<div className="flex flex-1 flex-col gap-1">
					<span className="text-fg text-sm font-medium">{item.label}</span>
					<p className="text-fg-tertiary text-sm font-normal">
						{item.description}
					</p>
				</div>

				{/* Switch */}
				<SwitchWrapper className="self-start">
					<Switch id={id} size="20" defaultChecked={item.defaultChecked} />
				</SwitchWrapper>
			</div>
		</Label>
	)
}

export default function PreferenceSwitchList() {
	return (
		<div className="flex flex-col gap-2">
			<span className="text-fg text-sm font-medium">Preferences</span>
			<div className="flex flex-col gap-2">
				{preferences.map((item) => (
					<PreferenceCard key={item.id} item={item} />
				))}
			</div>
		</div>
	)
}
