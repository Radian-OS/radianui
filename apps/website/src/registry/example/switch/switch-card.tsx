import { BellDot, Keyboard, LayoutList, ListCheck } from "lucide-react"
import { Label } from "@/registry/ui/label"
import { Switch, SwitchWrapper } from "@/registry/ui/switch"

const data = [
	{
		value: "desktop-notifications",
		id: "setting_desktop_notifications",
		title: "Desktop notifications",
		description: "Receive notifications when the app is foreground",
		icon: BellDot,
	},
	{
		value: "auto-save",
		id: "setting_auto_save",
		title: "Auto-save changes",
		description: "Save edits automatically while you work",
		icon: ListCheck,
	},
	{
		value: "compact-interface",
		id: "setting_compact_interface",
		title: "Compact interface",
		description: "Reduce spacing to fit more content on screen",
		icon: LayoutList,
	},
	{
		value: "keyboard-shortcuts",
		id: "setting_keyboard_shortcuts",
		title: "Keyboard shortcuts",
		description: "Enable keyboard shortcuts throughout the application",
		icon: Keyboard,
	},
]

export default function SwitchCard() {
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

						{/* Switch */}
						<SwitchWrapper className="self-start" id={view.id}>
							<Switch
								size="20"
								defaultChecked={view.id === "setting_desktop_notifications"}
							/>
						</SwitchWrapper>
					</Label>
				)
			})}
		</div>
	)
}
