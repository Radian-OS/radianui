import React from "react"
import { Archive, CheckCircle, Loader2 } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{
		id: 1,
		trigger: "Completed",
		icon: <CheckCircle />,
		content: "You have no completed tasks.",
	},
	{
		id: 2,
		trigger: "In Progress",
		icon: <Loader2 />,
		content: "You have no tasks in progress.",
	},
	{
		id: 3,
		trigger: "Archived",
		icon: <Archive />,
		count: 3,
		content: "You have archived 3 items.",
	},
]

export default function DefaultTabs() {
	return (
		<Tabs defaultValue={data[0].trigger.toLowerCase()}>
			<TabsList>
				{data.map((item) => (
					<TabsTrigger key={item.id} value={item.trigger.toLowerCase()}>
						{item.icon}
						{item.trigger}
						{item.count && (
							<Badge color="error" size="20" variant="strong" className="rounded-full">
								{item.count}
							</Badge>
						)}
					</TabsTrigger>
				))}
			</TabsList>
			{data.map((item) => (
				<TabsContent key={item.id} value={item.trigger.toLowerCase()}>
					{item.content}
				</TabsContent>
			))}
		</Tabs>
	)
}
