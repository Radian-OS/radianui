import React from "react"
import Image from "next/image"
import type { DashboardPreviewData } from "./types"

export function DashboardPreview({
	imageSrc = "/sandbox/placeholder.svg",
	alt = "Dashboard preview placeholder",
}: DashboardPreviewData) {
	return (
		<div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/50 sm:min-h-[380px] lg:min-h-[440px]">
			<Image
				src={imageSrc}
				alt={alt}
				width={780}
				height={520}
				className="size-full max-h-full rounded-xl object-cover"
				priority
			/>
		</div>
	)
}
