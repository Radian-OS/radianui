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
		disabled: true,
	},
]

export default function TabsDisabled() {
	return (
		<div className="flex flex-col items-center justify-center space-y-4">
			<Tabs defaultValue={data[0].trigger.toLowerCase()}>
				<TabsList size="lg">
					{data.map((item) => (
						<TabsTrigger
							key={item.id}
							disabled={item.disabled}
							value={item.trigger.toLowerCase()}>
							{item.icon}
							{item.trigger}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		</div>
	)
}
