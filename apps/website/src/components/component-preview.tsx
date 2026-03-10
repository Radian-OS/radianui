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

	if (type === "block") {
		return (
			<div className="border-soft mb-2 overflow-hidden rounded-xl border">
				<div className="relative h-[800px] w-[800px] overflow-hidden">
					<iframe src={`/view/${path}`} className="h-full w-full" />
				</div>
			</div>
		)
	}

	const Component = getComponent(path)

	return (
		<div className="mb-8">
			<div
				data-slot="component-preview"
				className="relative flex min-w-0 flex-col items-stretch">
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
