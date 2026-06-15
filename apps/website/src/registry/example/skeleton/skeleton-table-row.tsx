import { Skeleton } from "@/registry/ui/skeleton"

export default function SkeletonTableRow() {
	return (
		<div className="bg-bg border-soft w-78.5 rounded-xl border p-5">
			<div className="flex flex-col gap-3">
				{Array.from({ length: 3 }).map((_, i) => (
					<div key={i} className="flex items-center gap-3">
						<Skeleton className="size-8 shrink-0 rounded-full" />
						<div className="flex flex-1 flex-col gap-2">
							<Skeleton className="h-2 w-[55%] rounded-md" />
							<Skeleton className="h-2 w-[75%] rounded-md" />
						</div>
						<Skeleton className="h-2 w-6 shrink-0 rounded-full" />
					</div>
				))}
			</div>
		</div>
	)
}
