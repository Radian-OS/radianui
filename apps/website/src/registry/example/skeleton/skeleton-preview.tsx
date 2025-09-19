import { Skeleton } from "@/registry/ui/skeleton"

export default function SkeletonPreview() {
	return (
		<div className="inline-flex w-80 flex-col items-start justify-start gap-5 rounded-xl border p-5">
			{Array.from({ length: 5 }).map((_, index) => (
				<div key={index} className="inline-flex items-center justify-start gap-3 self-stretch">
					<Skeleton className="h-8 w-8 rounded-full" />
					<div className="inline-flex flex-1 flex-col items-start justify-start gap-2">
						<div className="inline-flex h-2 items-start justify-between self-stretch">
							<Skeleton className="w-24 self-stretch rounded-lg" />
							<Skeleton className="w-6 self-stretch rounded-lg" />
						</div>
						<Skeleton className="h-2 w-40 rounded-lg" />
					</div>
				</div>
			))}
		</div>
	)
}
