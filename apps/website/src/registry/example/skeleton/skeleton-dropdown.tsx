import { Skeleton } from "@/registry/ui/skeleton"

export default function SkeletonDropdown() {
	return (
		<div className="bg-bg border-soft w-50 rounded-xl border p-1.5">
			<div className="flex flex-col gap-2 px-1 py-1.5">
				{Array.from({ length: 3 }).map((_, i) => (
					<div key={i} className="flex items-center gap-2 px-1 py-1.5">
						<Skeleton className="size-5 shrink-0 rounded-full" />
						<Skeleton className="h-3 w-full rounded-sm" />
					</div>
				))}
			</div>
		</div>
	)
}
