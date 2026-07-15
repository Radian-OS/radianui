import { Skeleton } from "@/registry/ui/skeleton"

export default function SkeletonGallery() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			{Array.from({ length: 3 }).map((_, i) => (
				<div key={i} className="w-50 flex flex-col gap-2">
					<Skeleton className="h-30 w-full rounded-lg" />
					<Skeleton className="h-3 w-full rounded-full" />
					<Skeleton className="h-3 w-[30%] rounded-full" />
				</div>
			))}
		</div>
	)
}
