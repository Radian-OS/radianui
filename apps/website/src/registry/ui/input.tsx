"use client"

import React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export type SizeOptions = "0" | "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

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
		"0": "h-fit",
		"28": "h-7 text-xs p-1.5",
		"32": "h-8 text-sm px-3 py-1.5",
		"36": "h-9 text-sm px-2.5 py-2",
		"40": "h-10 text-sm px-3 py-2.5",
		"44": "h-11 text-base py-2.5 px-3.5",
		"48": "h-12 text-base py-3 px-3.5",
	},
}

export const defaultInputSize = "40"
export const defaultInputRadius = "lg"

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
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
	label?: string
	hint?: string
	hasError?: boolean
	custom?: boolean
	type?: "text" | "email" | "url" | "number" | "password" | "file"
	fileUploadSize?: SizeOptions // Only used when type is 'file'
	/* 
	It is not recommended to use type=password, instead use the <Password> component,
	'password' is added here because the <Password> uses <Input> component under the hood
	*/
	start?: React.ReactNode
	end?: React.ReactNode
	size?: SizeOptions
	rounded?: RoundedOptions
	id?: string
	ref?: React.Ref<HTMLInputElement>
}
// Input component definition
function Input({
	label,
	disabled,
	hint,
	custom = false,
	hasError = false,
	type = "text",
	start,
	end,
	size = defaultInputSize,
	rounded = defaultInputRadius,
	fileUploadSize = defaultInputSize,
	id,
	className,
	...props
}: InputProps) {
	let htmlId = React.useId()
	if (id) htmlId = id
	const fileBaseClass = "file:border-border-alpha file:me-2 file:border-0 file:border-e"
	const fileSizeMap = {
		"28": "file:h-7 text-xs file:p-1.5",
		"32": "file:h-8 text-sm file:px-3 file:py-1.5",
		"36": "file:h-9 text-sm file:px-2.5 file:py-2",
		"40": "file:h-10 text-sm file:px-3 file:py-2.5",
		"44": "file:h-11 text-base file:py-2.5 file:px-3.5",
		"48": "file:h-12 text-base file:py-3 file:px-3.5",
	}
	const fileSizeClass = type === "file" && fileUploadSize in fileSizeMap ? fileSizeMap[fileUploadSize as keyof typeof fileSizeMap] : ""

	return (
		<div className={cn("text-fg-1 flex flex-col items-start gap-1.5 text-sm", { "cursor-not-allowed": disabled })}>
			{label && (
				<Label htmlFor={htmlId} className={cn({ "text-text-disabled cursor-not-allowed": disabled })}>
					{label}
				</Label>
			)}
			<Label
				className={cn(
					inputVariants({ size, rounded }),
					{
						// Only show error focus ring when not disabled
						"border-error focus-within:ring-error/10 focus-within:ring-2": hasError && !disabled,

						// Only show regular focus ring when not disabled
						"focus-within:border-primary focus-within:ring-primary/10 border-border-alpha focus-within:ring-2": !hasError && !disabled,

						// Apply disabled styles
						"text-text-disabled bg-fill-level1 cursor-not-allowed drop-shadow-none": disabled,

						[`rounded-r-none`]: custom,
					},
					size === "28" ? "gap-1.5" : "gap-2",
					className
				)}>
				{start && (
					<span
						className={cn("flex items-center justify-center rounded", {
							"text-text-tertiary": !disabled,
							"text-text-disabled": disabled,
						})}>
						{start}
					</span>
				)}

				<input
					id={htmlId}
					className={cn(
						"text-fg-1 placeholder-text-tertiary outline-hidden h-fit w-full select-none border border-none bg-transparent p-0 text-sm placeholder:text-sm placeholder:font-normal focus:ring-0",
						{
							"text-text-disabled placeholder-text-disabled cursor-not-allowed": disabled,
							"file:border-border-alpha p-0 file:me-2 file:border-0 file:border-e file:px-2 file:py-1.5": type === "file",
						},
						size && {
							"text-xs placeholder:text-xs": size === "28",
							"text-sm placeholder:text-sm": ["32", "36", "40"].includes(size),
							"text-base placeholder:text-base": ["44", "48"].includes(size),
						},
						type === "file" && fileBaseClass,
						fileSizeClass,
						size && {
							"text-xs placeholder:text-xs": size === "28",
							"text-sm placeholder:text-sm": ["32", "36", "40"].includes(size),
							"text-base placeholder:text-base": ["44", "48"].includes(size),
						},
						className
					)}
					type={type}
					disabled={disabled}
					{...props}
				/>
				{end && (
					<span
						className={cn("flex items-center justify-center rounded", {
							"text-text-tertiary": !disabled,
							"text-text-disabled": disabled,
						})}>
						{end}
					</span>
				)}
				{/* {end && (
					<span
						className={cn("flex cursor-pointer items-center justify-center rounded", {
							"text-text-tertiary": !disabled,
							"text-text-disabled": disabled,
						})}>
						{React.isValidElement(end)
							? React.cloneElement(end as React.ReactElement<{ className?: string }>, {
									className: cn((end as React.ReactElement<{ className?: string }>)?.props?.className || "", sizeHeightMapping[size]),
								})
							: end}
					</span>
				)} */}
			</Label>
			{hint && <Label className={`flex items-start text-xs font-normal ${hasError ? "text-error" : "text-text-tertiary"}`}>{hint}</Label>}
		</div>
	)
}

Input.displayName = "Input"

export { Input }
