import { Calendar1, Database, Inbox, ListTodo } from "lucide-react"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

const views = [
	{
		value: "overview",
		id: "view_overview",
		title: "Overview",
		description: "Get a quick summary of your account and activity",
		icon: ListTodo,
	},
	{
		value: "projects",
		id: "view_projects",
		title: "Projects",
		description: "Focus on your active projects and ongoing work",
		icon: Database,
	},
	{
		value: "inbox",
		id: "view_inbox",
		title: "Inbox",
		description: "Jump straight to your latest notifications and updates",
		icon: Inbox,
	},
	{
		value: "calendar",
		id: "view_calendar",
		title: "Calendar",
		description: "Start your day with upcoming events and deadlines",
		icon: Calendar1,
	},
]

export default function RadioCard() {
	return (
		<RadioGroup defaultValue="overview" className="flex flex-col gap-3">
			{views.map((view) => {
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

						{/* Radio */}
						<RadioGroupItem
							className="self-start"
							value={view.value}
							id={view.id}
						/>
					</Label>
				)
			})}
		</RadioGroup>
	)
}
