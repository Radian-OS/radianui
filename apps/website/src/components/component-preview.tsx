import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { ComponentPreviewDemo } from "./component-preview-demo"
import { ComponentSource } from "./component-source"

export type ComponentPreviewProps = {
	path: string
	code: string
	height: number
	align: "center" | "start" | "end"
	type?: "component" | "block"
}

export function ComponentPreview({
	path,
	code,
	height,
	align,
	type,
}: ComponentPreviewProps) {
	const props: ComponentPreviewProps = {
		path,
		code,
		height: height ?? 420,
		align: align ?? "center",
		type: type ?? "component",
	}

	return (
		<div className="mb-8">
			<div className="flex min-w-0 flex-col items-stretch">
				<Tabs defaultValue="preview" className="w-full">
					<TabsList size="md">
						<TabsTrigger value="preview">Preview</TabsTrigger>
						<TabsTrigger value="code">Code</TabsTrigger>
					</TabsList>
					<TabsContent value="preview">
						<ComponentPreviewDemo {...props} />
					</TabsContent>
					<TabsContent value="code">
						<ComponentSource
							codeAreaClassName="max-h-100 overflow-auto no-scrollbar"
							className="[&>figure]:mt-0!"
							src={path}
							title={`${path.split("/")[path.split("/").length - 1]}.tsx`}
							collapsible={false}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
