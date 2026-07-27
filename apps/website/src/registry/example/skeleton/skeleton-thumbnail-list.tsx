import React from "react"
import { Divider } from "@/registry/ui/divider"
import { Skeleton } from "@/registry/ui/skeleton"

export default function SkeletonThumbnailList() {
	const items = Array.from({ length: 3 })
	return (
		<div className="bg-bg border-soft w-78.5 rounded-xl border">
			<div className="flex flex-col">
				{items.map((_, i) => (
					<React.Fragment key={i}>
						<div className="flex items-center gap-3 px-4 py-3">
							<Skeleton className="size-20 shrink-0 rounded-lg" />
							<div className="flex flex-1 flex-col gap-2">
								<Skeleton className="h-2 w-full rounded-full" />
								<Skeleton className="h-2 w-[50%] rounded-full" />
							</div>
						</div>
						{i < items.length - 1 && <Divider />}
					</React.Fragment>
				))}
			</div>
		</div>
	)
}
