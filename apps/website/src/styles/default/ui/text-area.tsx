"use client"

import { type ChangeEvent, useState } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type TextAreaProps = React.ComponentProps<"textarea"> &
	VariantProps<typeof textareaStyles> & {
		resizable?: boolean
	}

export type UseCharacterLimitOptions = {
	maxLength: number
	initialValue?: string
}

const textareaStyles = cva(
	"peer w-full focus:outline-hidden text-fg border-alpha bg-bg drop-shadow-xs focus:border-primary-hover aria-invalid:ring-error aria-invalid:border-error focus:ring-primary-hover/30 disabled:border-soft disabled:bg-fill1 disabled:text-fg-disabled border px-2.5 py-2 text-sm font-normal placeholder:text-sm focus:ring-2 disabled:cursor-not-allowed disabled:resize-none",
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
}: TextAreaProps) {
	return (
		<textarea
			role="textarea"
			data-slot="textarea"
			data-disabled={props.disabled ? "" : undefined}
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

TextArea.displayName = "TextArea"

function useCharacterLimit({
	maxLength,
	initialValue = "",
}: UseCharacterLimitOptions) {
	const [value, setValue] = useState(initialValue)
	const characterCount = value.length
	const remainingCharacters = maxLength - characterCount

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const input = e.target.value
		if (input.length <= maxLength) {
			setValue(input)
		}
	}

	return {
		value,
		setValue,
		characterCount,
		remainingCharacters,
		maxLength,
		handleChange,
	}
}

export { TextArea, useCharacterLimit }
