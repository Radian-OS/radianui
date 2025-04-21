"use client"

import React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export type SizeOptions = "32" | "36" | "40" | "44" | "48" | "56"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
// Variants for input styles based on size and rounded options
export const cvaInputVariants = {
	rounded: {
		xs: "rounded-xs",
		sm: "rounded-sm",
		md: "rounded-md",
		lg: "rounded-lg",
		xl: "rounded-xl",
		"2xl": "rounded-2xl",
	},
	size: {
		"32": "h-8 text-sm px-3 py-1.5",
		"36": "h-9 text-sm px-3 py-2",
		"40": "h-10 text-sm px-3 py-2.5",
		"44": "h-11 text-base py-2.5 px-3.5",
		"48": "h-12 text-base py-3 px-3.5",
		"56": "h-14 text-base py-4 px-3.5",
	},
}

export const defaultInputSize = "40"
export const defaultInputRadius = "md"
// Creating a variant for input styles using cva
const inputVariants = cva("flex h-10 w-full items-center justify-center gap-2 border drop-shadow-xs bg-bg-base cursor-text", {
	variants: {
		...cvaInputVariants,
	},
	defaultVariants: {
		size: defaultInputSize,
		rounded: defaultInputRadius,
	},
})
// Type definition for custom class names for various parts of the input
export type InputClassNames = {
	base?: string /* The div that wraps the component */
	label?: string /* The label of the input */
	wrapper?: string /* The wrapper div for the input and icons (used for showing borders) */
	input?: string /* The actual input element used inside */
	error?: string /* The error message */
}
// Type definition for input props, extending standard input attributes
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
	label?: string
	errorMsg?: string
	hasError?: boolean
	type?: "text" | "email" | "url" | "number" | "password"
	/* 
	It is not recommended to use type=password, instead use the <Password> component,
	'password' is added here because the <Password> uses <Input> component under the hood
	*/
	leadIcon?: React.ReactNode
	trialIcon?: React.ReactNode
	size?: SizeOptions
	rounded?: RoundedOptions
	id?: string
	classNames?: InputClassNames
	ref?: React.Ref<HTMLInputElement>
}
// Input component definition
function Input({
	label,
	disabled,
	errorMsg,
	hasError = false,
	type = "text",
	leadIcon,
	trialIcon,
	size = defaultInputSize,
	rounded = defaultInputRadius,
	id,
	className,
	classNames,
	...props
}: InputProps) {
	let htmlId = React.useId()
	if (id) htmlId = id

	return (
		<div className={cn("text-fg-1 flex w-full flex-col gap-1.5 text-sm", { "cursor-not-allowed": disabled }, className, classNames?.base)}>
			{label && (
				<Label htmlFor={htmlId} className={cn({ "text-text-disabled cursor-not-allowed": disabled }, classNames?.label)}>
					{label}
				</Label>
			)}
			<label
				className={cn(
					inputVariants({ size, rounded }),
					{
						"border-error focus-within:ring-error/10 focus-within:ring-2": hasError,
						"focus-within:border-primary! focus-within:ring-primary/10 hover:border-border-alpha focus-within:ring-2": !hasError,
						"text-text-disabled cursor-not-allowed": disabled,
					},
					classNames?.wrapper
				)}>
				{leadIcon && <span>{leadIcon}</span>}
				<input
					id={htmlId}
					className={cn(
						"text-fg-1 text-sm placeholder-text-tertiary outline-hidden h-fit w-full select-none border border-none bg-transparent p-0 placeholder:text-sm placeholder:font-normal focus:ring-0",
						{
							"text-text-disabled placeholder-text-disabled cursor-not-allowed": disabled,
						},
						classNames?.input
					)}
					type={type}
					disabled={disabled}
					{...props}
				/>
				{trialIcon && <span className="ml-auto">{trialIcon}</span>}
			</label>
			{hasError && <Label className={cn("text-error text-xs font-medium", className)}>{errorMsg}</Label>}
		</div>
	)
}

Input.displayName = "Input"

export { Input }
