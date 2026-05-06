import React from "react"
import { Badge } from "@/styles/default/ui/badge"
import { Divider } from "@/styles/default/ui/divider"
import { Skeleton } from "@/styles/default/ui/skeleton"

function DividerBadgePreview() {
	return (
		<div className="max-w-100 flex w-full flex-col items-center gap-4">
			<div className="flex w-full flex-col gap-2">
				<Skeleton className="bg-fill2 h-4 w-20 rounded-sm" />
				<Skeleton className="bg-fill2 h-6 w-full rounded-sm" />
				<Skeleton className="bg-fill2 mt-2 h-4 w-20 rounded-sm" />
				<Skeleton className="bg-fill2 h-6 w-full rounded-sm" />
			</div>
			<div className="flex w-full items-center justify-center gap-4">
				<Divider className="flex-1" />
				<Badge variant="outline" color="neutral">
					January 12, 2025
				</Badge>
				<Divider className="flex-1" />
			</div>
			<div className="flex w-full flex-col gap-2">
				<Skeleton className="bg-fill2 h-4 w-20 rounded-sm" />
				<Skeleton className="bg-fill2 h-6 w-full rounded-sm" />
				<Skeleton className="bg-fill2 mt-2 h-4 w-20 rounded-sm" />
				<Skeleton className="bg-fill2 h-6 w-full rounded-sm" />
			</div>
		</div>
	)
}

export default DividerBadgePreview
