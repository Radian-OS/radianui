import React from "react"
import { Draggable } from "@/registry/animated/make-draggable"
import { Badge } from "@/registry/ui/badge"
import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function CollaborationPointerExample() {
	const containerRef = React.useRef(null)

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
				<div ref={containerRef} className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border px-10">
					<Draggable dragConstraints={containerRef}>
						<Badge size="28" variant="pastel">
							John Doe
						</Badge>
					</Draggable>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-105"
					code={`const containerRef = React.useRef(null)

<div ref={containerRef} className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border px-10">
	<Draggable dragConstraints={containerRef}>
		<Badge size="" variant="pastel">
			John Doe
		</Badge>
	</Draggable>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
