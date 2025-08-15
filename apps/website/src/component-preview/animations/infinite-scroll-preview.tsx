import { EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownSub, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export const infiniteScrollData = [
	{
		name: "Jack",
		body: "I don't know what to say. I'm speechless. This is amazing.",
	},
	{
		name: "John",
		body: "I'm at a loss for words. This is amazing. I love it.",
	},
	{
		name: "James",
		body: "I'm at a loss for words. This is amazing. I love it.",
	},
	{
		name: "Joe",
		body: "I don't know what to say. I'm speechless. This is amazing.",
	},
]

const InfiniteScrollPreview = () => {
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
				<Dropdown>
					<DropdownTrigger asChild>
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownGroup>
							<DropdownSub></DropdownSub>
						</DropdownGroup>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-xl border px-10">
					<InfiniteScroll>
						{infiniteScrollData.map((d) => (
							<div key={d.name} className="w-70 rounded-lg border p-4">
								<p className="font-medium">{d.name}</p>
								<p>{d.body}</p>
							</div>
						))}
					</InfiniteScroll>
					<div className="from-bg-base pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
					<div className="from-bg-base pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="infinite-scroll.tsx"
					showLineNumber
					className="h-[420px]"
					code={`const infiniteScrollData = [
	{
		name: "Jack",
		body: "I don't know what to say. I'm speechless. This is amazing.",
	},
	{
		name: "John",
		body: "I'm at a loss for words. This is amazing. I love it.",
	},
	{
		name: "James",
		body: "I'm at a loss for words. This is amazing. I love it.",
	},
	{
		name: "Joe",
		body: "I don't know what to say. I'm speechless. This is amazing.",
	},
]

<div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-xl border px-10">
	<InfiniteScroll>
		{infiniteScrollData.map((d) => (
			<div key={d.name} className="w-70 rounded-lg border p-4">
				<p className="font-medium">{d.name}</p>
				<p>{d.body}</p>
			</div>
		))}
	</InfiniteScroll>
	{/* Left and right mask overlay */}
	<div className="from-bg-base pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
	<div className="from-bg-base pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default InfiniteScrollPreview
