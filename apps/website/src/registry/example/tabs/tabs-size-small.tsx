import React from "react"
import { Archive, CheckCircle, Loader2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"

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

export default function TabsSizeSmall() {
	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<Tabs defaultValue={data[0].trigger.toLowerCase()}>
				<TabsList size="sm">
					{data.map((item) => (
						<TabsTrigger key={item.id} value={item.trigger.toLowerCase()}>
							{item.icon}
							{item.trigger}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		</div>
	)
}
