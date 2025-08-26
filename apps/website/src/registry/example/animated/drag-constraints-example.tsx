import React from "react"

import { EyeIcon, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Draggable } from "@/registry/animated/draggable"
import { Badge } from "@/registry/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function CollaborationPointerExample() {
	const containerRef = React.useRef(null)

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} className="mb-10">
			<div className="flex items-center justify-start">
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
				<div ref={containerRef} className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border px-10">
					<Draggable dragConstraints={containerRef}>
						<Badge size="28" variant="soft">
							John Doe
						</Badge>
					</Draggable>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="drag-constraints-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`const containerRef = React.useRef(null)

<div ref={containerRef} className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border px-10">
	<Draggable dragConstraints={containerRef}>
		<Badge size="" variant="soft">
			John Doe
		</Badge>
	</Draggable>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
