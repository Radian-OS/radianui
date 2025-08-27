import { useState } from "react"

import { EyeIcon, RotateCw, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { AnimatedList } from "@/registry/animated/animated-list"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownSub, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const animatedListData = [
	{ text: "John from United States paid 9 dollars", time: "3 hours ago" },
	{ text: "Mark from United States paid 41 dollars", time: "5 hours ago" },
	{ text: "Dean from Australia paid 30 dollars", time: "1 hour ago" },
	{ text: "Steve from Canada paid 99 dollars", time: "3 hours ago" },
	{ text: "John from United States paid 9 dollars", time: "3 hours ago" },
	{ text: "Mark from United States paid 41 dollars", time: "5 hours ago" },
	{ text: "Dean from Australia paid 30 dollars", time: "1 hour ago" },
	{ text: "Mark from United States paid 41 dollars", time: "5 hours ago" },
]

const AnimatedListPreview = () => {
	const [counter, setCounter] = useState(0)

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<div className="flex gap-2">
					<div className="flex gap-1">
						<IconButton variant="outline" color="neutral" onClick={() => setCounter((prev) => prev + 1)}>
							<RotateCw />
						</IconButton>
					</div>
					<Dropdown>
						<DropdownTrigger asChild>
							<IconButton variant="outline" color="neutral" size="36">
								<Settings />
							</IconButton>
						</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownGroup>
								<DropdownSub></DropdownSub>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</div>
			</div>

			<TabsContent value="preview">
				<div className="relative flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="relative size-80 overflow-hidden">
						<AnimatedList key={counter}>
							{animatedListData.map((d, i) => (
								<div className="w-80 rounded-lg border p-2" key={i}>
									<p>{d.text}</p>
									<p className="text-fg-tertiary text-sm">{d.time}</p>
								</div>
							))}
						</AnimatedList>
						<div className="from-bg-bg pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" />
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="animated-list.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="relative size-80 overflow-hidden">
	<AnimatedList key={counter}>
		{animatedListData.map((d, i) => (
			<div className="w-80 rounded-lg border p-2" key={i}>
				<p>{d.text}</p>
				<p className="text-fg-tertiary text-sm">{d.time}</p>
			</div>
		))}
	</AnimatedList>
	<div className="from-bg-bg pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" />
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default AnimatedListPreview
