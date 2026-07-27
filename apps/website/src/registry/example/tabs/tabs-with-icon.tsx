import React from "react"
import { Box, Inbox, ListTodo } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{ label: "Inbox", icon: <Inbox />, value: "inbox", content: "Inbox Content" },
	{
		label: "Projects",
		icon: <Box />,
		value: "projects",
		content: "Projects Content",
	},
	{
		label: "Tasks",
		icon: <ListTodo />,
		value: "tasks",
		content: "Tasks Content",
	},
]

export default function TabsWithIcon() {
	return (
		<Tabs className="w-105" defaultValue={data[0].value}>
			<TabsList width="full">
				{data.map((item) => (
					<TabsTrigger key={item.value} value={item.value}>
						{item.icon}
						{item.label}
					</TabsTrigger>
				))}
			</TabsList>
			{data.map(({ value, content }) => (
				<TabsContent key={value} value={value}>
					<div className="bg-bg border-soft text-fg-tertiary flex items-center justify-center rounded-xl border px-2.5 py-10 text-sm">
						{content}
					</div>
				</TabsContent>
			))}
		</Tabs>
	)
}
