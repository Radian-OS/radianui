"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { EyeIcon, LoaderCircleIcon, SquareTerminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import CodeSnippet from "./code-snippet"

type ComponentPreviewContext = {
	path: string
	code: string
	children: ReactNode
}

export type ComponentPreviewProps = {
	path: string
	code: string
}

const ComponentPreviewContext = React.createContext<ComponentPreviewContext | null>(null)

export function useComponentPreview() {
	const context = React.useContext(ComponentPreviewContext)
	if (!context) {
		throw new Error("useComponentPreview must be used within a ComponentPreviewProvider.")
	}
	return context
}

function ComponentPreviewProvider({ path, code = "", children }: { path: string; code: string; children: ReactNode }) {
	return (
		<ComponentPreviewContext.Provider
			value={{
				path,
				code,
				children,
			}}>
			<div className="flex min-w-0 flex-col items-stretch gap-4">{children}</div>
		</ComponentPreviewContext.Provider>
	)
}

// function CopyCodeButton() {
// 	const { code, path } = useComponentPreview()
// 	const { copy, copied } = useCopyPaste({
// 		title: path,
// 		category: "component",
// 		code: code || "",
// 		eventName: "snippet_copy",
// 	})

// 	if (!code) return null

// 	return (
// 		<Button size="36" variant="outline" onClick={copy} className="h-8 px-3">
// 			{copied ? (
// 				<>
// 					<Check className="mr-2 h-4 w-4" />
// 					Copied
// 				</>
// 			) : (
// 				<>
// 					<Copy className="mr-2 h-4 w-4" />
// 					Copy
// 				</>
// 			)}
// 		</Button>
// 	)
// }

function ComponentPreviewDemo() {
	const { path } = useComponentPreview()
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
		<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
			{loading ? (
				<div className="text-fg-tertiary flex items-center justify-center gap-2">
					<LoaderCircleIcon className="h-4 w-4 animate-spin" />
					<span className="text-sm">Loading component...</span>
				</div>
			) : error ? (
				<div className="text-error-text flex items-center justify-center">
					<span className="text-sm">{error}</span>
				</div>
			) : Component ? (
				<Component />
			) : (
				<div className="text-fg-tertiary flex items-center justify-center">
					<span className="text-sm">No component found</span>
				</div>
			)}
		</div>
	)
}

function ComponentPreviewCode() {
	const { code, path } = useComponentPreview()
	return <CodeSnippet title={`${path.split("/").pop() || "code"}.tsx`} code={code} className="h-[420px]" />
}

export function ComponentPreview({ path, code }: ComponentPreviewProps) {
	return (
		<div className="mb-8 pt-4">
			<ComponentPreviewProvider path={path} code={code}>
				<Tabs defaultValue="preview" className="w-full">
					<div className="flex items-center justify-between">
						<TabsList variant="outline-ghost" size="md">
							<TabsTrigger value="preview">
								<EyeIcon />
								Preview
							</TabsTrigger>
							<TabsTrigger value="code">
								<SquareTerminal />
								Code
							</TabsTrigger>
						</TabsList>
						{/* <CopyCodeButton /> */}
					</div>

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
