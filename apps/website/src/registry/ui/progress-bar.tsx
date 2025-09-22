import React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

function Progress({
	value,
	className,
	indicatorClassName,
	...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
	indicatorClassName?: string
}) {
	return (
		<ProgressPrimitive.Root className={cn("bg-fill3 translate-z-0 relative h-2 w-full transform overflow-hidden rounded-full", className)} {...props}>
			<ProgressPrimitive.Indicator
				className={cn("bg-primary h-full w-full transition-transform duration-[660ms] [transition-timing-function:cubic-bezier(0,0,1,1)]", indicatorClassName)}
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	)
}

export { Progress }
