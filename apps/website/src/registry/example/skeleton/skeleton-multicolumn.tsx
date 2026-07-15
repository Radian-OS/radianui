import { Skeleton } from "@/registry/ui/skeleton"

export default function SkeletonMultiColumn() {
	return (
		<div className="flex flex-col gap-2">
			{Array.from({ length: 4 }).map((_, i) => (
				<div
					key={i}
					className="flex flex-wrap items-center justify-center gap-2.5">
					<div className="w-45 flex items-center gap-2 px-1 py-1.5">
						<Skeleton className="size-6 shrink-0 rounded-full" />
						<Skeleton className="h-3 w-full rounded-sm" />
					</div>
					<div className="w-38 flex items-center gap-2 px-1 py-1.5">
						<Skeleton className="size-5 shrink-0 rounded-full" />
						<Skeleton className="h-3 w-full rounded-sm" />
					</div>
					<div className="flex w-36 items-center gap-2 px-1 py-1.5">
						<Skeleton className="h-4 w-full rounded-sm" />
					</div>
					<div className="w-45 flex items-center gap-2 px-3 py-1.5">
						<Skeleton className="h-4 w-full rounded-sm" />
					</div>
				</div>
			))}
		</div>
	)
}
