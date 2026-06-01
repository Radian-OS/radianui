import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Badge } from "@/registry/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{
		id: 1,
		trigger: "Completed",
		icon: <IconSlot slot="circle-check" />,
		count: 8,
		content: "You have completed 8 tasks.",
	},
	{
		id: 2,
		trigger: "In Progress",
		icon: <IconSlot slot="loader" />,
		count: 4,
		content: "You have 4 tasks in progress.",
	},
	{
		id: 3,
		trigger: "Archived",
		icon: <IconSlot slot="archive" />,
		count: 3,
		content: "You have archived 3 items.",
	},
]

export default function TabsWithBadge() {
	return (
		<Tabs defaultValue={data[0].trigger.toLowerCase()}>
			<TabsList>
				{data.map((item) => (
					<TabsTrigger key={item.id} value={item.trigger.toLowerCase()}>
						{item.icon}
						{item.trigger}
						<Badge
							color="error"
							size="20"
							variant="strong"
							className="rounded-full">
							{item.count}
						</Badge>
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
