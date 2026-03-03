"use client"

import { useEffect, useState } from "react"
import { Spinner } from "@/registry/ui/spinner"
import { ComponentPreviewProps } from "./component-preview"

export function ComponentPreviewDemo({
	path,
	height,
	align,
	type,
}: ComponentPreviewProps) {
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

	const renderContent = () => {
		if (loading) {
			return (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-fg-tertiary flex items-center justify-center gap-2">
						<Spinner size={20} variant="activity" />
						<span className="text-sm">Loading</span>
					</div>
				</div>
			)
		}
		if (error) {
			return (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-error-text flex items-center justify-center">
						<span className="text-sm">{error}</span>
					</div>
				</div>
			)
		}
		if (!Component) {
			return (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-fg-tertiary flex items-center justify-center">
						<span className="text-sm">No component found</span>
					</div>
				</div>
			)
		}
		return <Component />
	}

	return (
		<div
			className={`relative h-full overflow-auto rounded-xl border ${type === "component" ? `flex px-4 py-10 md:px-6 lg:px-10 items-${align} justify-center` : ""}`}
			style={{ minHeight: `${height}px` }}>
			{renderContent()}
		</div>
	)
}
