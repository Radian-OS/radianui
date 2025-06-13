import React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"
import { Label } from "./label"

// Defines the props for the ProgressBar component, extending the props of ProgressPrimitive.Root
type ProgressBarProps = React.ComponentPropsWithRef<typeof ProgressPrimitive.Root> & {
	className?: string
	indicatorClassName?: string
	label?: string
	disabled?: boolean
	hasError?: boolean
	hint?: string
	valueLabel?: boolean
}
// Defines the ProgressBar functional component
function ProgressBar({ value, valueLabel, className, indicatorClassName, hint, hasError, label, disabled, ...props }: ProgressBarProps) {
	return (
		<div className={cn("text-fg-1 flex flex-col items-start gap-1.5 text-sm", { "cursor-not-allowed": disabled }, className)}>
			{(label || valueLabel) && (
				<div className="flex w-full justify-between">
					<Label className={cn({ "text-text-disabled cursor-not-allowed": disabled })}>{label}</Label>
					{valueLabel && <span>{value}%</span>}
				</div>
			)}

			<ProgressPrimitive.Root className={cn("bg-fill-level3 translate-z-0 relative h-2 w-full transform overflow-hidden rounded-full", className)} value={value} {...props}>
				<ProgressPrimitive.Indicator
					className={cn("bg-primary h-full w-full transition-transform duration-[660ms] [transition-timing-function:cubic-bezier(0,0,1,1)]", indicatorClassName)}
					style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
				/>
			</ProgressPrimitive.Root>
			<Label className={`flex items-start text-sm font-normal ${hasError ? "text-error" : "text-text-tertiary"}`}>{hint}</Label>
		</div>
	)
}

export default ProgressBar
