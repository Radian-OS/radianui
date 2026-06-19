import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{ label: "Inbox", value: "inbox", content: "Inbox Content" },
	{ label: "Projects", value: "projects", content: "Projects Content" },
	{ label: "Tasks", value: "tasks", content: "Tasks Content" },
]

export default function TabsVariantGhost() {
	return (
		<Tabs className="w-105" defaultValue={data[0].value}>
			<TabsList width="full" variant={"ghost"}>
				{data.map((item) => (
					<TabsTrigger key={item.value} value={item.value}>
						{item.label}
					</TabsTrigger>
				))}
			</TabsList>
			{data.map(({ value, content }) => (
				<TabsContent key={value} value={value}>
					<div className="bg-fill1 text-fg-tertiary flex items-center justify-center rounded-xl px-2.5 py-10 text-sm">
						{content}
					</div>
				</TabsContent>
			))}
		</Tabs>
	)
}
