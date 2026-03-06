import React, { Suspense } from "react"
import registry from "@/registry/registry-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { ComponentPreviewDemo } from "./component-preview-demo"
import { ComponentSource } from "./component-source"

export function getComponent(path: string) {
	const loader = registry[path]
	if (!loader) return () => null
	return loader
}

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

	const Component = getComponent(path)

	return (
		<div className="mb-8">
			<div className="flex min-w-0 flex-col items-stretch">
				<Tabs defaultValue="preview" className="w-full">
					<TabsList size="md">
						<TabsTrigger value="preview">Preview</TabsTrigger>
						<TabsTrigger value="code">Code</TabsTrigger>
					</TabsList>
					<TabsContent value="preview">
						<Suspense fallback={<div>Loading...</div>}>
							<ComponentPreviewDemo
								{...props}
								Component={React.createElement(Component)}
							/>
						</Suspense>
					</TabsContent>
					<TabsContent value="code">
						<ComponentSource
							codeAreaClassName="max-h-100 overflow-auto no-scrollbar"
							className="[&>figure]:mt-0!"
							code={code}
							title={`${path.split("/")[path.split("/").length - 1]}.tsx`}
							collapsible={false}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
