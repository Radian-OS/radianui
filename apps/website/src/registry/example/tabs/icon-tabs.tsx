import React from "react"
import { Archive, CheckCircle, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{
		id: 1,
		trigger: "Completed",
		icon: <CheckCircle />,
		content: "You have completed 8 tasks.",
	},
	{
		id: 2,
		trigger: "In Progress",
		icon: <Loader2 />,
		content: "You have 4 tasks in progress.",
	},
	{
		id: 3,
		trigger: "Archived",
		icon: <Archive />,
		content: "You have archived 3 items.",
	},
]

export default function IconTabs() {
	return (
		<Tabs defaultValue={data[0].trigger.toLowerCase()}>
			<TabsList>
				{data.map((item) => (
					<TabsTrigger key={item.id} value={item.trigger.toLowerCase()}>
						{item.icon}
						{item.trigger}
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
