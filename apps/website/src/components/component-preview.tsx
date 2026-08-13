import React, { Suspense } from "react"
import { getComponent } from "@/registry/registry-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { ComponentPreviewCopyButton } from "./component-preview-copy-button"
import { ComponentPreviewDemo } from "./component-preview-demo"
import { ComponentSource } from "./component-source"
import { DisplayBlock } from "./display-block"

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
	title = "Preview",
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
		return <DisplayBlock name={path} title={title} />
	}

	const Component = getComponent(path) ?? (() => null)

	const slug = title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")

	return (
		<div className="mb-8 scroll-mt-20" id={slug}>
			<div
				data-slot="component-preview"
				className="relative flex min-w-0 flex-col items-stretch">
				<Tabs
					defaultValue="preview"
					className="border-soft bg-fill1-alpha flex w-full flex-col gap-2 rounded-xl border p-1">
					<div className="flex items-center justify-between px-2 pt-1">
						{/* <a href={`#${slug}`} className="hover:underline"> */}
						<p className="text-fg text-sm font-medium">{title}</p>
						{/* </a> */}
						<div className="flex items-center gap-2">
							<TabsList
								variant="ghost"
								className="h-7 data-[orientation=horizontal]:h-7">
								<TabsTrigger
									className="data-[state=active]:text-fg data-[state=active]:bg-elevation-level2 data-[state=active]:border-soft text-xs data-[state=active]:rounded-md data-[state=active]:border"
									value="preview">
									Preview
								</TabsTrigger>
								<TabsTrigger
									className="data-[state=active]:text-fg data-[state=active]:bg-elevation-level2 data-[state=active]:border-soft text-xs data-[state=active]:rounded-md data-[state=active]:border"
									value="code">
									Code
								</TabsTrigger>
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
								codeAreaClassName="max-h-105 overflow-auto no-scrollbar"
								className="[&>figure]:mt-0! [&_[data-slot=copy-button]]:hidden"
								code={code}
								language="tsx"
								collapsible={false}
							/>
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</div>
	)
}
