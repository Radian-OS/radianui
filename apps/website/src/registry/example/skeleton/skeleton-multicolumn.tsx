import { Skeleton } from "@/registry/ui/skeleton"

export default function SkeletonMultiColumn() {
	return (
		<div className="flex gap-2.5">
			<div className="w-45">
				<div className="flex flex-col gap-2 px-1 py-1.5">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="flex items-center gap-2 px-1 py-1.5">
							<Skeleton className="size-6 shrink-0 rounded-full" />
							<Skeleton className="h-3 w-full rounded-sm" />
						</div>
					))}
				</div>
			</div>
			<div className="w-38">
				<div className="flex flex-col gap-2 px-1 py-1.5">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="flex items-center gap-2 px-1 py-1.5">
							<Skeleton className="size-5 shrink-0 rounded-full" />
							<Skeleton className="h-3 w-full rounded-sm" />
						</div>
					))}
				</div>
			</div>
			<div className="w-36">
				<div className="flex flex-col gap-2 px-1 py-1.5">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="flex items-center gap-2 px-1 py-1.5">
							<Skeleton className="h-4 w-full rounded-sm" />
						</div>
					))}
				</div>
			</div>
			<div className="w-45">
				<div className="flex flex-col gap-2 px-3 py-2">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="flex items-center gap-2 px-1 py-1.5">
							<Skeleton className="h-4 w-full rounded-sm" />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
