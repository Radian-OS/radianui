import { Skeleton } from "@/registry/ui/skeleton"

export default function SkeletonSocialPost() {
	return (
		<div className="bg-bg border-soft w-100 rounded-xl border p-5">
			<div className="flex flex-col gap-4">
				{/* Header: avatar + name/meta */}
				<div className="flex items-center gap-3">
					<Skeleton className="size-10 shrink-0 rounded-full" />
					<div className="flex flex-1 flex-col gap-2">
						<Skeleton className="h-3 w-[50%] rounded-full" />
						<Skeleton className="h-3 w-[30%] rounded-full" />
					</div>
				</div>

				{/* Body lines */}
				<div className="flex flex-col gap-2">
					<Skeleton className="h-2 w-full rounded-full" />
					<Skeleton className="h-2 w-[30%] rounded-full" />
				</div>

				{/* Image/media block */}
				<Skeleton className="h-39.5 w-full rounded-lg" />
			</div>
		</div>
	)
}
