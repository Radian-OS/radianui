import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Badge } from "@/registry/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{
		id: 1,
		trigger: "Completed",
		icon: <IconSlot slot="circle-check" />,
		content: "You have no completed tasks.",
	},
	{
		id: 2,
		trigger: "In Progress",
		icon: <IconSlot slot="loader" />,
		count: 6,
		content: "You have 6 tasks in progress.",
	},
	{
		id: 3,
		trigger: "Archived",
		icon: <IconSlot slot="archive" />,
		content: "You have no archived items.",
	},
]

export default function TabsVariantGhost() {
	return (
		<Tabs defaultValue={data[0].trigger.toLowerCase()}>
			<TabsList variant={"ghost"}>
				{data.map((item) => (
					<TabsTrigger key={item.id} value={item.trigger.toLowerCase()}>
						{item.icon}
						{item.trigger}
						{item.count && (
							<Badge
								color="error"
								size="20"
								variant="strong"
								className="rounded-full">
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
