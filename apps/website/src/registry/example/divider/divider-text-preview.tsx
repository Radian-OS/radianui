import React from "react"
import { Divider } from "@/registry/ui/divider"
import { Skeleton } from "@/registry/ui/skeleton"

function DividerTextPreview() {
	return (
		<div className="flex w-full max-w-100 flex-col items-center gap-4">
			<div className="flex w-full flex-col gap-2">
				<Skeleton className="bg-fill2 h-4 w-20 rounded-sm" />
				<Skeleton className="bg-fill2 h-6 w-full rounded-sm" />
				<Skeleton className="bg-fill2 mt-2 h-4 w-20 rounded-sm" />
				<Skeleton className="bg-fill2 h-6 w-full rounded-sm" />
			</div>
			<div className="flex w-full items-center justify-center gap-4">
				<Divider className="flex-1" />
				<span className="text-error-text text-sm">New Messages • 15:04</span>
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

export default DividerTextPreview
