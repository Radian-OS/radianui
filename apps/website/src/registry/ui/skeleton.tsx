"use client"

import { css } from "@emotion/css"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type SkeletonProps = React.ComponentProps<"div"> & {
	animation?: "shimmer" | "pulse"
}

const DEFAULT_ANIMATION = "shimmer"

const shimmer = css`
	@keyframes shimmer {
		from {
			background-position: 100% 50%;
		}
		to {
			background-position: 0 50%;
		}
	}
	animation-name: shimmer;
	animation-duration: 2s;
	animation-timing-function: ease-out;
	animation-iteration-count: infinite;
`

const skeletonVariants = cva("rounded-md", {
	variants: {
		animation: {
			pulse: "bg-fill-level3 animate-pulse",
			shimmer: `bg-[linear-gradient(-61deg,var(--color-fill-level3)_40%,var(--color-fill-level2)_50%,var(--color-fill-level3)_60%)] bg-size-[300%] ${shimmer}`,
		},
	},
})

function Skeleton({ className, animation = DEFAULT_ANIMATION, ...props }: SkeletonProps) {
	return <div data-slot="skeleton" className={cn(skeletonVariants({ animation: animation }), className)} {...props}></div>
}
Skeleton.displayName = "Skeleton"

export { Skeleton }
