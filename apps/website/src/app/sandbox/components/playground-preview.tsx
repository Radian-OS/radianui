"use client"

import React, { type RefObject } from "react"
import { cn } from "@/lib/utils"
import type { DeviceSize, SandboxComponentConfig } from "./types"

interface PlaygroundPreviewProps {
	activeComponentConfig: SandboxComponentConfig
	deviceSize: DeviceSize
	iframeRef: RefObject<HTMLIFrameElement | null>
}

export function PlaygroundPreview({
	activeComponentConfig,
	deviceSize,
	iframeRef,
}: PlaygroundPreviewProps) {
	return (
		<div className="flex flex-1 flex-col items-center overflow-y-auto">
			<div
				className={cn(
					"flex h-full min-h-[500px] flex-col gap-6 transition-all duration-300",
					deviceSize === "mobile" && "w-[375px]",
					deviceSize === "tablet" && "w-[768px]",
					deviceSize === "desktop" && "w-full"
				)}>
				{/* Component Preview Card */}
				<div className="text-fg flex flex-1 flex-col overflow-hidden">
					<div className="bg-bg text-fg relative flex flex-1 overflow-hidden">
						<iframe
							ref={iframeRef}
							key={activeComponentConfig.id}
							src={activeComponentConfig.previewRoute}
							className="bg-bg h-full w-full border-0"
							title={`${activeComponentConfig.label} Component Preview`}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
