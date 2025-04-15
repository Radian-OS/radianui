import React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

// Defines the props for the ProgressBar component, extending the props of ProgressPrimitive.Root
type ProgressBarProps = React.ComponentPropsWithRef<typeof ProgressPrimitive.Root> & {
	rootClassName?: string
	indicatorClassName?: string
}
// Defines the ProgressBar functional component
function ProgressBar({ value, rootClassName, indicatorClassName, ...props }: ProgressBarProps) {
	return (
		<ProgressPrimitive.Root
			className={cn("border-border bg-bg-level1 relative h-2 w-full translate-z-0 transform overflow-hidden rounded-full border", rootClassName)}
			value={value}
			{...props}>
			<ProgressPrimitive.Indicator
				className={cn(
					"bg-primary h-full w-full transition-transform duration-[660ms] [transition-timing-function:cubic-bezier(0,0,1,1)]",
					indicatorClassName
				)}
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	)
}

export default ProgressBar
