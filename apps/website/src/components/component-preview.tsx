import React, { Suspense } from "react"
import registry from "@/registry/registry-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { ComponentPreviewCopyButton } from "./component-preview-copy-button"
import { ComponentPreviewDemo } from "./component-preview-demo"
import { ComponentSource } from "./component-source"
import { DisplayBlock } from "./display-block"

export function getComponent(name: string) {
	const loader = registry[name]
	if (!loader) return () => null
	return loader
}

export type ComponentPreviewProps = {
	path: string
	code: string
	height: number
	align: "center" | "start" | "end"
	type?: "component" | "block"
	title: string
}

export function ComponentPreview({
	path,
	code,
	height,
	align,
	type,
	title = "Component Preview",
}: ComponentPreviewProps) {
	const props: ComponentPreviewProps = {
		path,
		code,
		height: height ?? 420,
		align: align ?? "center",
		type: type ?? "component",
		title,
	}

	if (type === "block") {
		return <DisplayBlock name={path} />
	}

	const Component = getComponent(path.split("/")[1])

	return (
		<div className="mb-8">
			<div
				data-slot="component-preview"
				className="relative flex min-w-0 flex-col items-stretch">
				<Tabs
					defaultValue="preview"
					className="border-soft bg-fill1-alpha flex w-full flex-col gap-2 rounded-2xl border p-1">
					<div className="flex items-center justify-between px-2 pt-1">
						<span className="text-fg text-sm font-medium">{title}</span>
						<div className="flex items-center gap-2">
							<TabsList className="h-8 data-[orientation=horizontal]:h-8">
								<TabsTrigger value="preview">Preview</TabsTrigger>
								<TabsTrigger value="code">Code</TabsTrigger>
							</TabsList>
							<ComponentPreviewCopyButton value={code} />
						</div>
					</div>
					<div className="flex-1">
						<TabsContent value="preview" className="mt-0 outline-none">
							<Suspense fallback={<div>Loading...</div>}>
								<ComponentPreviewDemo
									{...props}
									Component={React.createElement(Component)}
								/>
							</Suspense>
						</TabsContent>
						<TabsContent value="code" className="mt-0 outline-none">
							<ComponentSource
								codeAreaClassName="max-h-100 overflow-auto no-scrollbar"
								className="[&>figure]:mt-0! [&_[data-slot=copy-button]]:hidden"
								code={code}
								title={`${path.split("/")[path.split("/").length - 1]}.tsx`}
								collapsible={false}
							/>
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</div>
	)
}
