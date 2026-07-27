import { cn } from "@/lib/utils"

type SkeletonProps = React.ComponentProps<"div">

function Skeleton({ className, ...props }: SkeletonProps) {
	return (
		<div
			data-slot="skeleton"
			className={cn("bg-fill2 animate-pulse", className)}
			{...props}></div>
	)
}
Skeleton.displayName = "Skeleton"

export { Skeleton }
