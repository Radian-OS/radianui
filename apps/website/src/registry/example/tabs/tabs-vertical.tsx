import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{ label: "Inbox", value: "inbox", content: "Inbox Content" },
	{ label: "Projects", value: "projects", content: "Projects Content" },
	{ label: "Tasks", value: "tasks", content: "Tasks Content" },
]

export default function VerticalTabs() {
	return (
		<Tabs defaultValue={data[0].value} className="w-105" orientation="vertical">
			<TabsList className="w-34 h-27">
				{data.map((item) => (
					<TabsTrigger
						className="justify-start"
						key={item.value}
						value={item.value}>
						{item.label}
					</TabsTrigger>
				))}
			</TabsList>
			{data.map(({ value, content }) => (
				<TabsContent key={value} value={value}>
					<div className="bg-bg border-soft text-fg-tertiary flex h-48 items-center justify-center rounded-xl border px-2.5 py-10 text-sm">
						{content}
					</div>
				</TabsContent>
			))}
		</Tabs>
	)
}
