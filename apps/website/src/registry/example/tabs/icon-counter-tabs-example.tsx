import React from "react"
import { Archive, CheckCircle, EyeIcon, Loader2, SquareTerminal } from "lucide-react"
import { CodeArea } from "@/registry/ui/code-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{
		id: 1,
		trigger: "Completed",
		icon: <CheckCircle />,
		content: "You have completed 8 tasks.",
		counter: 8,
	},
	{
		id: 2,
		trigger: "In Progress",
		icon: <Loader2 />,
		content: "You have 4 tasks in progress.",
		counter: 4,
	},
	{
		id: 3,
		trigger: "Archived",
		icon: <Archive />,
		content: "You have archived 10 items.",
		counter: 10,
	},
]

function IconCounterTabs() {
	return (
		<Tabs defaultValue={data[0].trigger.toLowerCase()} variant={"open"}>
			<TabsList>
				{data.map((item) => (
					<TabsTrigger key={item.id} value={item.trigger.toLowerCase()} icon={item.icon} counter={item.counter}>
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

function IconCounterTabsExample() {
	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} className="mb-10">
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
			</div>
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<IconCounterTabs />
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-105"
					code={`const data = [
	{
		id: 1,
		trigger: "Completed",
		icon: <CheckCircle />,
		content: "You have completed 8 tasks.",
		counter: 8,
	},
	{
		id: 2,
		trigger: "In Progress",
		icon: <Loader2 />,
		content: "You have 4 tasks in progress.",
		counter: 4,
	},
	{
		id: 3,
		trigger: "Archived",
		icon: <Archive />,
		content: "You have archived 10 items.",
		counter: 10,
	},
]

export default function IconCounterTabs() {
	return (
		<Tabs defaultValue={data[0].trigger.toLowerCase()} variant={"open"}>
			<TabsList>
				{data.map((item) => (
					<TabsTrigger key={item.id} value={item.trigger.toLowerCase()} icon={item.icon} counter={item.counter}>
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
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default IconCounterTabsExample
