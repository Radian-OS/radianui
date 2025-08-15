import React from "react"

import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Label } from "./label"

const textareaStyles = cva(
	"text-sm placeholder:text-sm text-fg-1 min-h-12 w-full border border-alpha bg-base px-3 py-2 font-normal drop-shadow-xs focus:border-primary-hover focus:outline-hidden focus:ring-2 focus:ring-primary-hover/10",
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
	hasError?: boolean
	hint?: string
	classNames?: {
		base?: string // The div that wraps the whole component
		label?: string // The label of the input
		textarea?: string // The actual textarea input
	}
}

function TextArea({ label, className, classNames, hasError = false, hint = "", rounded = "rounded", rows = 4, resizable = true, value, defaultValue, ...props }: TextAreaProps) {
	let id = React.useId()
	if (props.id) id = props.id

	// Using React's key property to force a remount when rows change
	// This is a nuclear option but will ensure the textarea always respects the rows prop
	return (
		<div className={cn("flex flex-col gap-1", classNames?.base)}>
			{label && (
				<label className={cn("text-sm font-medium", { "text-fg-disabled": props.disabled }, classNames?.label)} htmlFor={id}>
					{label}
				</label>
			)}
			<textarea
				key={`textarea-${rows}`} // Force remount when rows change
				rows={rows}
				value={value}
				defaultValue={defaultValue}
				className={cn(
					textareaStyles({ rounded }),
					{
						"border-error focus-within:ring-error/10 focus-within:ring-2": hasError && !props.disabled,
						"resize-none": resizable === false,
						"border-border bg-fill1 text-fg-disabled cursor-not-allowed": props.disabled,
					},
					className,
					classNames?.textarea
				)}
				id={id}
				{...props}
			/>
			{hint && <Label className={`flex items-start text-xs font-normal ${hasError ? "text-error" : "text-fg-tertiary"}`}>{hint}</Label>}
		</div>
	)
}

TextArea.displayName = "TextArea"

export { TextArea }
