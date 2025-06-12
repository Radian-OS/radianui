import React from "react"
import { Draggable } from "@/registry/animated/make-draggable"
import { Badge } from "@/registry/ui/badge"
import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function CollaborationPointerExample() {
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
				<div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border px-10">
					<Draggable dragConstraints={{ top: -160, left: -200, right: 200, bottom: 160 }}>
						<Badge size="32" variant="pastel">
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
					code={`<Draggable dragConstraints={{ top: 0, left: 0, right: 300, bottom: 300 }}>
        <Badge size="32" variant="pastel">
            John Doe
        </Badge>
    </Draggable>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
