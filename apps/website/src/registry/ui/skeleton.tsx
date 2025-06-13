import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type SkeletonProps = React.ComponentProps<"div"> & {
	animation?: "shimmer" | "pulse"
}

const DEFAULT_ANIMATION = "pulse"

const skeletonVariants = cva("rounded-md", {
	variants: {
		animation: {
			pulse: "bg-fill-level3 animate-pulse",
			shimmer: "bg-[linear-gradient(-61deg,var(--color-fill-level3)_40%,var(--color-fill-level2)_50%,var(--color-fill-level3)_60%)] bg-size-[300%] animate-shimmer",
		},
	},
})

function Skeleton({ className, animation = DEFAULT_ANIMATION, ...props }: SkeletonProps) {
	return (
		<>
			<div data-slot="skeleton" className={cn(skeletonVariants({ animation: animation }), className)} {...props}></div>
		</>
	)
}
Skeleton.dislayName = "Skeleton"

export { Skeleton }
