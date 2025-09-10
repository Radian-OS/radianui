import React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaStyles = cva(
	"text-sm placeholder:text-sm text-fg-1 min-h-12 w-full border border-alpha bg-bg px-3 py-2 font-normal drop-shadow-xs focus:border-primary-hover aria-invalid:ring-error/20 aria-invalid:border-error dark:aria-invalid:ring-error/40 focus:outline-hidden focus:ring-2 focus:ring-primary-hover/10 disabled:border-border disabled:bg-fill1 disabled:text-fg-disabled disabled:cursor-not-allowed",
	{
		variants: {
			rounded: {
				rounded: "rounded-md",
				square: "rounded-none",
			},
		},
		defaultVariants: {
			rounded: "rounded",
		},
	}
)

function TextArea({
	className,
	rounded = "rounded",
	resizable = true,
	...props
}: React.ComponentProps<"textarea"> & {
	resizable?: boolean
	rounded?: "rounded" | "square"
}) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				textareaStyles({ rounded }),
				{
					"resize-none": resizable === false,
				},
				className
			)}
			{...props}
		/>
	)
}

export { TextArea }
