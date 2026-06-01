import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{
		id: 1,
		trigger: "Completed",
		icon: <IconSlot slot="circle-check" />,
	},
	{
		id: 2,
		trigger: "In Progress",
		icon: <IconSlot slot="loader" />,
	},
	{
		id: 3,
		trigger: "Archived",
		icon: <IconSlot slot="archive" />,
	},
]

export default function TabsWidthFull() {
	return (
		<div className="flex min-w-full flex-col justify-center gap-5">
			<Tabs defaultValue={data[0].trigger.toLowerCase()}>
				<TabsList width={"full"} className="w-full">
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
