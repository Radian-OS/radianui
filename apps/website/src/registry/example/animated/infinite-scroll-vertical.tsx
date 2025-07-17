import React from "react"
import { infiniteScrollData } from "@/component-preview/animations/infinite-scroll-preview"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { CodeArea } from "@/registry/ui/code-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function InfiniteScrollVerticalExample() {
	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-end">
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 relative flex w-full items-center justify-center overflow-hidden rounded-xl border px-10">
					<InfiniteScroll vertical className="w-fit">
						{infiniteScrollData.map((d) => (
							<div key={d.name} className="w-70 rounded-lg border p-4">
								<p className="font-medium">{d.name}</p>
								<p>{d.body}</p>
							</div>
						))}
					</InfiniteScroll>
					<div className="from-bg-base pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
					<div className="from-bg-base pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-105"
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
    
<div className="h-105 relative flex w-full items-center justify-center overflow-hidden rounded-xl border px-10">
    <InfiniteScroll vertical className="w-fit">
        {infiniteScrollData.map((d) => (
            <div key={d.name} className="w-70 rounded-lg border p-4">
                <p className="font-medium">{d.name}</p>
                <p>{d.body}</p>
            </div>
        ))}
    </InfiniteScroll>
    {/* Top and bottom mask overlay */}
    <div className="from-bg-base pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
    <div className="from-bg-base pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
</div>
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
