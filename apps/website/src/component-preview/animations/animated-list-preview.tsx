import { useState } from "react"
import { RotateCw } from "lucide-react"
import { AnimatedList } from "@/registry/animated/animated-list"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
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
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownGroup>
								<DropdownSub></DropdownSub>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</div>
				<div className="flex gap-1">
					<Button variant="outline" color="neutral" isIcon onClick={() => setCounter((prev) => prev + 1)}>
						<RotateCw />
					</Button>
					<TabsList>
						<TabsTrigger value="preview">Preview</TabsTrigger>
						<TabsTrigger value="code">Code</TabsTrigger>
					</TabsList>
				</div>
			</div>
			<TabsContent value="preview">
				<div className="relative flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="relative size-80 overflow-hidden">
						<AnimatedList key={counter}>
							{animatedListData.map((d, i) => (
								<div className="w-80 rounded-lg border p-2" key={i}>
									<p>{d.text}</p>
									<p className="text-text-tertiary text-sm">{d.time}</p>
								</div>
							))}
						</AnimatedList>
						<div className="from-bg-base pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" />
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<div className="relative size-80 overflow-hidden">
	<AnimatedList key={counter}>
		{animatedListData.map((d, i) => (
			<div className="w-80 rounded-lg border p-2" key={i}>
				<p>{d.text}</p>
				<p className="text-text-tertiary text-sm">{d.time}</p>
			</div>
		))}
	</AnimatedList>
	<div className="from-bg-base pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" />
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default AnimatedListPreview
