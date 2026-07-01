"use client"

import React from "react"
import { ComponentPreviewProps } from "./component-preview"

export function ComponentPreviewDemo({
	height,
	align,
	type,
	Component,
}: ComponentPreviewProps & { Component: React.ReactNode }) {
	const renderContent = () => {
		if (!Component) {
			return (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-fg-tertiary flex items-center justify-center">
						<span className="text-sm">No component found</span>
					</div>
				</div>
			)
		}
		return Component
	}

	return (
		<div
			data-slot="preview"
			className={`bg-bg relative h-full overflow-hidden rounded-xl border ${type === "component" ? `flex px-4 py-10 md:px-6 lg:px-10 items-${align} justify-center` : ""}`}
			style={{ minHeight: `${height}px` }}>
			{renderContent()}
		</div>
	)
}
