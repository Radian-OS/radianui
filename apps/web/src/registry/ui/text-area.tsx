import React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaStyles = cva(
	"body-sm placeholder:body-sm text-fg-1 min-h-12 w-full border border-stroke bg-bg1 px-3 py-2.5 font-normal drop-shadow-xs hover:border-stroke-decorative hover:bg-bg2 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/10",
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

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: string
	resizable?: boolean
	rounded?: "rounded" | "square"
	classNames?: {
		base?: string // The div that wraps the whole component
		label?: string // The label of the input
		textarea?: string // The actual textarea input
	}
}

function TextArea({ label, className, classNames, rounded = "rounded", rows = 4, resizable = true, ...props }: TextAreaProps) {
	let id = React.useId()
	if (props.id) id = props.id
	return (
		<div className={cn("flex w-full flex-col gap-1", className, classNames?.base)}>
			{label && (
				<label className={cn("body-sm font-medium", { "text-fg3": props.disabled }, classNames?.label)} htmlFor={id}>
					{label}
				</label>
			)}
			<textarea
				rows={rows}
				className={cn(
					textareaStyles({ rounded }),
					{ "resize-none": resizable === false, "hover:border-stroke hover:bg-bg1 cursor-not-allowed": props.disabled },
					classNames?.textarea
				)}
				id={id}
				{...props}
			/>
		</div>
	)
}
TextArea.displayName = "TextArea"

export default TextArea
