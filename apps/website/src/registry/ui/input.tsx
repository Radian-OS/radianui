import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type InputProps = Omit<React.ComponentProps<"input">, "size"> &
	VariantProps<typeof inputVariants>
export type InputAddonProps = React.ComponentProps<"div"> &
	VariantProps<typeof inputAddonVariants>
export type InputGroupProps = React.ComponentProps<"div"> &
	VariantProps<typeof inputGroupVariants>
export type InputWrapperProps = React.ComponentProps<"div"> &
	VariantProps<typeof inputWrapperVariants>

const inputVariants = cva(
	`cn-input border-alpha text-fg placeholder:text-fg-tertiary focus-visible:ring-primary-focus focus-visible:border-primary disabled:text-fg-disabled disabled:bg-fill2-alpha [&[readonly]]:bg-fill1 file:border-alpha file:text-fg aria-invalid:border-error aria-invalid:ring-error-focus flex w-full items-center transition-[color,box-shadow] file:h-full file:border-0 file:border-e file:border-solid file:bg-transparent file:p-0 file:font-medium file:not-italic focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 [&[readonly]]:cursor-not-allowed [&[type=file]]:py-0`,
	{
		variants: {
			size: {
				xs: "cn-input-xs h-7 file:me-1.5 file:pe-1.5",
				sm: "cn-input-sm h-8 file:me-3 file:pe-3",
				md: "cn-input-md h-9 file:me-2.5 file:pe-2.5",
				lg: "cn-input-lg h-10 file:me-3 file:pe-3",
				xl: "cn-input-xl h-11 file:me-3.5 file:pe-3.5",
				"2xl": "cn-input-2xl h-12 file:me-3.5 file:pe-3.5",
			},
		},
		defaultVariants: {
			size: "md",
		},
	}
)

const inputAddonVariants = cva(
	"cn-input-addon [&_svg]:text-fg-tertiary flex shrink-0 items-center justify-center",
	{
		variants: {
			size: {
				xs: "cn-input-addon-xs h-7 min-w-7 [&_svg:not([class*=size-])]:size-4",
				sm: "cn-input-addon-sm h-8 min-w-8 [&_svg:not([class*=size-])]:size-4.5",
				md: "cn-input-addon-md h-9 min-w-9 [&_svg:not([class*=size-])]:size-5",
				lg: "cn-input-addon-lg h-10 min-w-10 [&_svg:not([class*=size-])]:size-5",
				xl: "cn-input-addon-xl h-11 min-w-11 [&_svg:not([class*=size-])]:size-5",
				"2xl":
					"cn-input-addon-2xl h-12 min-w-12 [&_svg:not([class*=size-])]:size-5",
			},
			mode: {
				default: "",
				icon: "justify-center px-0",
			},
		},
		defaultVariants: {
			size: "md",
			mode: "default",
		},
	}
)

const inputGroupVariants = cva(
	`flex items-stretch [&_:is([data-slot=input],[data-slot=currency-input])]:grow [&_:is([data-slot=input],[data-slot=currency-input])+[data-slot=button]]:rounded-s-none [&_:is([data-slot=input],[data-slot=currency-input])+[data-slot=input-addon]]:rounded-s-none [&_:is([data-slot=input],[data-slot=currency-input])+[data-slot=input-addon]]:border-s-0 [&_:is([data-slot=input],[data-slot=currency-input]):has(+[data-slot=button])]:rounded-e-none [&_:is([data-slot=input],[data-slot=currency-input]):has(+[data-slot=input-addon])]:rounded-e-none [&_[data-slot=button]+:is([data-slot=input],[data-slot=currency-input])]:rounded-s-none [&_[data-slot=datefield]]:grow [&_[data-slot=datefield]+[data-slot=input-addon]]:rounded-s-none [&_[data-slot=datefield]+[data-slot=input-addon]]:border-s-0 [&_[data-slot=datefield]:has(+[data-slot=input-addon])]:[&_:is([data-slot=input],[data-slot=currency-input])]:rounded-e-none [&_[data-slot=input-addon]+:is([data-slot=input],[data-slot=currency-input])]:rounded-s-none [&_[data-slot=input-addon]+[data-slot=datefield]]:[&_:is([data-slot=input],[data-slot=currency-input])]:rounded-s-none [&_[data-slot=input-addon]:has(+:is([data-slot=input],[data-slot=currency-input]))]:rounded-e-none [&_[data-slot=input-addon]:has(+:is([data-slot=input],[data-slot=currency-input]))]:border-e-0 [&_[data-slot=input-addon]:has(+[data-slot=button])]:rounded-e-none [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:rounded-e-none [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:border-e-0`,
	{
		variants: {},
		defaultVariants: {},
	}
)

const inputWrapperVariants = cva(
	`cn-input-wrapper has-[:focus-visible]:ring-primary-accent has-[:focus-visible]:border-primary [&_:is([data-slot=input],[data-slot=currency-input])]:text-fg [&_:is([data-slot=input],[data-slot=currency-input])]:placeholder:text-fg-tertiary [&_svg]:text-fg-tertiary has-[[aria-invalid=true]]:border-error has-[[aria-invalid=true]]:ring-error-accent flex items-center gap-1.5 has-[:focus-visible]:outline-none [&_:is([data-slot=input],[data-slot=currency-input])]:flex [&_:is([data-slot=input],[data-slot=currency-input])]:h-auto [&_:is([data-slot=input],[data-slot=currency-input])]:w-full [&_:is([data-slot=input],[data-slot=currency-input])]:rounded-none [&_:is([data-slot=input],[data-slot=currency-input])]:border-0 [&_:is([data-slot=input],[data-slot=currency-input])]:bg-transparent [&_:is([data-slot=input],[data-slot=currency-input])]:p-0 [&_:is([data-slot=input],[data-slot=currency-input])]:shadow-none [&_:is([data-slot=input],[data-slot=currency-input])]:transition-colors [&_:is([data-slot=input],[data-slot=currency-input])]:outline-none [&_:is([data-slot=input],[data-slot=currency-input])]:focus-visible:ring-0 [&_:is([data-slot=input],[data-slot=currency-input])]:disabled:cursor-not-allowed [&_:is([data-slot=input],[data-slot=currency-input])]:disabled:opacity-50 [&_:is([data-slot=input],[data-slot=currency-input])]:data-focus-within:border-0 [&_:is([data-slot=input],[data-slot=currency-input])]:data-focus-within:ring-0 [&_:is([data-slot=input],[data-slot=currency-input])]:data-focus-within:ring-transparent [&_[data-slot=datefield]]:grow [&_svg]:shrink-0`,
	{
		variants: {
			size: {
				xs: "cn-input-wrapper-xs [&_svg:not([class*=size-])]:size-4",
				sm: "cn-input-wrapper-sm [&_svg:not([class*=size-])]:size-4.5",
				md: "cn-input-wrapper-md [&_svg:not([class*=size-])]:size-5",
				lg: "cn-input-wrapper-lg [&_svg:not([class*=size-])]:size-5",
				xl: "cn-input-wrapper-xl [&_svg:not([class*=size-])]:size-5",
				"2xl": "cn-input-wrapper-2xl [&_svg:not([class*=size-])]:size-5",
			},
			disabled: {
				true: "cn-input-wrapper-disabled has-[:focus-visible]:border-alpha has-[:focus-visible]:ring-0",
				false: "",
			},
		},
		defaultVariants: {
			size: "md",
			disabled: false,
		},
	}
)

function Input({ className, type, size, ...props }: InputProps) {
	return (
		<input
			data-slot="input"
			type={type}
			className={cn(inputVariants({ size }), className)}
			{...props}
		/>
	)
}
Input.displayName = "Input"

function InputAddon({ className, size, mode, ...props }: InputAddonProps) {
	return (
		<div
			data-slot="input-addon"
			className={cn(inputAddonVariants({ size, mode }), className)}
			{...props}
		/>
	)
}
InputAddon.displayName = "InputAddon"

function InputGroup({ className, ...props }: InputGroupProps) {
	return (
		<div
			data-slot="input-group"
			className={cn(inputGroupVariants(), className)}
			{...props}
		/>
	)
}
InputGroup.displayName = "InputGroup"

function InputWrapper({
	className,
	size,
	disabled,
	...props
}: InputWrapperProps) {
	return (
		<div
			data-slot="input-wrapper"
			className={cn(
				inputVariants({ size }),
				inputWrapperVariants({ size, disabled }),
				className
			)}
			{...props}
		/>
	)
}
InputWrapper.displayName = "InputWrapper"

export {
	Input,
	InputAddon,
	InputGroup,
	InputWrapper,
	inputVariants,
	inputAddonVariants,
}
