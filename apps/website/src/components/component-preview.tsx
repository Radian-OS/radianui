"use client"

import React, { ReactNode, useEffect, useState } from "react"
import CodeSnippet from "@/components/code-snippet"
import { Spinner } from "@/registry/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type ComponentPreviewProps = {
	path: string
	code: string
	height: number
	align: "center" | "start" | "end"
	type?: "component" | "block"
}

type ComponentPreviewContext = ComponentPreviewProps & {
	children: ReactNode
}

const ComponentPreviewContext = React.createContext<ComponentPreviewContext | null>(null)

export function useComponentPreview() {
	const context = React.useContext(ComponentPreviewContext)
	if (!context) {
		throw new Error("useComponentPreview must be used within a ComponentPreviewProvider.")
	}
	return context
}

function ComponentPreviewProvider({ path, code, height, align, children, type }: ComponentPreviewContext) {
	return (
		<ComponentPreviewContext.Provider
			value={{
				path,
				code,
				height,
				align,
				children,
				type,
			}}>
			<div className="flex min-w-0 flex-col items-stretch">{children}</div>
		</ComponentPreviewContext.Provider>
	)
}

function ComponentPreviewDemo() {
	const { path, height, align, type } = useComponentPreview()
	const [Component, setComponent] = useState<React.ComponentType | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadComponent = async () => {
			try {
				setLoading(true)
				setError(null)
				setComponent(null)

				const ComponentModule = await import(`@/registry/example/${path}`)
				setComponent(() => ComponentModule.default ?? ComponentModule)
			} catch (err) {
				console.error(`Failed to load component at path: ${path}`, err)
				setError(`Failed to load component: ${path}`)
			} finally {
				setLoading(false)
			}
		}

		loadComponent()
	}, [path])

	return (
		<div
			className={`relative h-full overflow-auto rounded-xl border ${type === "component" ? `flex px-4 py-10 md:px-6 lg:px-10 items-${align} justify-center` : ""} `}
			style={{ minHeight: `${height}px` }}>
			{loading ? (
				<div className="text-fg-tertiary flex size-full items-center justify-center gap-2">
					<Spinner size={20} variant="activity" />
					<span className="text-sm">Loading</span>
				</div>
			) : error ? (
				<div className="text-error-text flex size-full items-center justify-center">
					<span className="text-sm">{error}</span>
				</div>
			) : Component ? (
				<Component />
			) : (
				<div className="text-fg-tertiary flex size-full items-center justify-center">
					<span className="text-sm">No component found</span>
				</div>
			)}
		</div>
	)
}

function ComponentPreviewCode() {
	const { code, path, height } = useComponentPreview()
	return (
		<div style={{ height: `${height}px` }}>
			<CodeSnippet title={`${path.split("/").pop() || "code"}.tsx`} code={code} className="h-full" showLineNumber />
		</div>
	)
}

export function ComponentPreview({ path, code, height, align, type }: ComponentPreviewProps) {
	return (
		<div className="mb-8">
			<ComponentPreviewProvider type={type ?? "component"} path={path} code={code} height={height ?? 420} align={align ?? "center"}>
				<Tabs defaultValue="preview" className="w-full">
					<TabsList size="md">
						<TabsTrigger value="preview">Preview</TabsTrigger>
						<TabsTrigger value="code">Code</TabsTrigger>
					</TabsList>

					<TabsContent value="preview">
						<ComponentPreviewDemo />
					</TabsContent>

					<TabsContent value="code">
						<ComponentPreviewCode />
					</TabsContent>
				</Tabs>
			</ComponentPreviewProvider>
		</div>
	)
}
