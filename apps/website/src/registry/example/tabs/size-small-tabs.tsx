import React from "react"
import { Archive, CheckCircle, Loader2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, type TabsVariant } from "@/registry/ui/tabs"

const VARIANTS: TabsVariant[] = ["default", "open", "outline", "ghost", "outline-ghost"]

const data = [
	{
		id: 1,
		trigger: "Completed",
		icon: <CheckCircle />,
	},
	{
		id: 2,
		trigger: "In Progress",
		icon: <Loader2 />,
	},
	{
		id: 3,
		trigger: "Archived",
		icon: <Archive />,
	},
]

export default function SizeSmallTabs() {
	return (
		<div className="flex flex-col items-center justify-center gap-5">
			{VARIANTS.map((variant) => (
				<Tabs key={variant} defaultValue={data[0].trigger.toLowerCase()}>
					<TabsList size="sm" variant={variant}>
						{data.map((item) => (
							<TabsTrigger key={item.id} value={item.trigger.toLowerCase()}>
								{item.icon}
								{item.trigger}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			))}
		</div>
	)
}
