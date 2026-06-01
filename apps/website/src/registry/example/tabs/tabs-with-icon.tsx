import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{
		id: 1,
		trigger: "Completed",
		icon: <IconSlot slot="circle-check" />,
		content: "You have completed 8 tasks.",
	},
	{
		id: 2,
		trigger: "In Progress",
		icon: <IconSlot slot="loader" />,
		content: "You have 4 tasks in progress.",
	},
	{
		id: 3,
		trigger: "Archived",
		icon: <IconSlot slot="archive" />,
		content: "You have archived 3 items.",
	},
]

export default function TabsWithIcon() {
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
