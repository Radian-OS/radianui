import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

export type ProgressProps = React.ComponentProps<
	typeof ProgressPrimitive.Root
> & {
	indicatorClassName?: string
}

function Progress({
	value,
	className,
	indicatorClassName,
	...props
}: ProgressProps) {
	return (
		<ProgressPrimitive.Root
			className={cn(
				"bg-fill3 relative h-1.5 w-full translate-z-0 transform overflow-hidden rounded-full",
				className
			)}
			{...props}>
			<ProgressPrimitive.Indicator
				className={cn(
					"bg-primary h-full w-full transition-transform duration-660 [transition-timing-function:cubic-bezier(0,0,1,1)]",
					indicatorClassName
				)}
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	)
}

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
