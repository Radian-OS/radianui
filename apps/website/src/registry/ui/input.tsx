import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type InputProps = Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>

export type InputAddonProps = React.ComponentProps<"div"> & VariantProps<typeof inputAddonVariants>

export type InputGroupProps = React.ComponentProps<"div"> & VariantProps<typeof inputGroupVariants>

export type InputWrapperProps = React.ComponentProps<"div"> & VariantProps<typeof inputWrapperVariants>

const inputVariants = cva(
	`
	flex w-full items-center bg-bg border border-alpha transition-[color,box-shadow] text-fg placeholder:text-fg-tertiary 
	focus-visible:ring-primary-focus  focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2   
	disabled:cursor-not-allowed disabled:opacity-60 disabled:text-fg-disabled disabled:bg-fill2-alpha
	[&[readonly]]:bg-fill1 [&[readonly]]:cursor-not-allowed
	file:h-full [&[type=file]]:py-0 file:border-solid file:border-alpha file:bg-transparent 
	file:font-medium file:not-italic file:text-fg file:p-0 file:border-0 file:border-e
	aria-invalid:border-error aria-invalid:ring-error-focus
  `,
	{
		variants: {
			size: {
				"28": "h-7 text-[13px] px-2 rounded-md file:pe-1.5 file:me-1.5",
				"32": "h-8 text-sm px-2 rounded-md file:pe-3 file:me-3",
				"36": "h-9 text-sm px-2.5 rounded-lg file:pe-2.5 file:me-2.5",
				"40": "h-10 text-sm px-3 rounded-lg file:pe-3 file:me-3",
				"44": "h-11 text-base px-3 rounded-[10px] file:pe-3.5 file:me-3.5",
				"48": "h-12 text-base px-3.5 rounded-[10px] file:pe-3.5 file:me-3.5",
			},
		},
		defaultVariants: {
			size: "36",
		},
	}
)

const inputAddonVariants = cva(
	"flex items-center shrink-0 justify-center bg-elevation-level1 border border-alpha shadow-xs shadow-[rgba(0,0,0,0.05)] text-fg-secondary [&_svg]:text-fg-tertiary",
	{
		variants: {
			size: {
				"28": "h-7 min-w-7 text-[13px]  px-2 rounded-md [&_svg:not([class*=size-])]:size-4",
				"32": "h-8 min-w-8 text-sm px-2  rounded-md [&_svg:not([class*=size-])]:size-4.5",
				"36": "h-9 min-w-9 text-sm px-2.5 rounded-lg [&_svg:not([class*=size-])]:size-5",
				"40": "h-10 min-w-10 text-sm px-3 rounded-lg [&_svg:not([class*=size-])]:size-5",
				"44": "h-11 min-w-11 text-base px-3 rounded-[10px] [&_svg:not([class*=size-])]:size-5",
				"48": "h-12 min-w-12 text-base px-3.5 rounded-[10px] [&_svg:not([class*=size-])]:size-5",
			},
			mode: {
				default: "",
				icon: "px-0 justify-center",
			},
		},
		defaultVariants: {
			size: "36",
			mode: "default",
		},
	}
)

const inputGroupVariants = cva(
	`
	flex items-stretch
	[&_:is([data-slot=input],[data-slot=currency-input])]:grow
	[&_[data-slot=input-addon]:has(+:is([data-slot=input],[data-slot=currency-input]))]:rounded-e-none [&_[data-slot=input-addon]:has(+:is([data-slot=input],[data-slot=currency-input]))]:border-e-0
	[&_[data-slot=input-addon]:has(+[data-slot=datefield])]:rounded-e-none [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:border-e-0 
	[&_:is([data-slot=input],[data-slot=currency-input])+[data-slot=input-addon]]:rounded-s-none [&_:is([data-slot=input],[data-slot=currency-input])+[data-slot=input-addon]]:border-s-0
	[&_[data-slot=input-addon]:has(+[data-slot=button])]:rounded-e-none
	[&_:is([data-slot=input],[data-slot=currency-input])+[data-slot=button]]:rounded-s-none
	[&_[data-slot=button]+:is([data-slot=input],[data-slot=currency-input])]:rounded-s-none
	[&_[data-slot=input-addon]+:is([data-slot=input],[data-slot=currency-input])]:rounded-s-none
	[&_[data-slot=input-addon]+[data-slot=datefield]]:[&_:is([data-slot=input],[data-slot=currency-input])]:rounded-s-none
	[&_[data-slot=datefield]:has(+[data-slot=input-addon])]:[&_:is([data-slot=input],[data-slot=currency-input])]:rounded-e-none
	[&_:is([data-slot=input],[data-slot=currency-input]):has(+[data-slot=button])]:rounded-e-none
	[&_:is([data-slot=input],[data-slot=currency-input]):has(+[data-slot=input-addon])]:rounded-e-none
	[&_[data-slot=datefield]]:grow
	[&_[data-slot=datefield]+[data-slot=input-addon]]:rounded-s-none [&_[data-slot=datefield]+[data-slot=input-addon]]:border-s-0
  `,
	{
		variants: {},
		defaultVariants: {},
	}
)

const inputWrapperVariants = cva(
	`
	flex items-center gap-1.5
	has-[:focus-visible]:ring-primary-accent
	has-[:focus-visible]:border-primary
	has-[:focus-visible]:outline-none 
	has-[:focus-visible]:ring-2

	
	[&_[data-slot=datefield]]:grow 
	[&_:is([data-slot=input],[data-slot=currency-input])]:rounded-none
	[&_:is([data-slot=input],[data-slot=currency-input])]:data-focus-within:ring-transparent  
	[&_:is([data-slot=input],[data-slot=currency-input])]:data-focus-within:ring-0
	[&_:is([data-slot=input],[data-slot=currency-input])]:data-focus-within:border-0
	[&_:is([data-slot=input],[data-slot=currency-input])]:flex 
	[&_:is([data-slot=input],[data-slot=currency-input])]:w-full 
    [&_:is([data-slot=input],[data-slot=currency-input])]:outline-none 
    [&_:is([data-slot=input],[data-slot=currency-input])]:transition-colors 
	[&_:is([data-slot=input],[data-slot=currency-input])]:text-fg
	[&_:is([data-slot=input],[data-slot=currency-input])]:placeholder:text-fg-tertiary 
	[&_:is([data-slot=input],[data-slot=currency-input])]:p-0
	[&_:is([data-slot=input],[data-slot=currency-input])]:border-0 
	[&_:is([data-slot=input],[data-slot=currency-input])]:bg-transparent 
	[&_:is([data-slot=input],[data-slot=currency-input])]:shadow-none 
	[&_:is([data-slot=input],[data-slot=currency-input])]:focus-visible:ring-0 
	[&_:is([data-slot=input],[data-slot=currency-input])]:h-auto 
	[&_:is([data-slot=input],[data-slot=currency-input])]:disabled:cursor-not-allowed
	[&_:is([data-slot=input],[data-slot=currency-input])]:disabled:opacity-50

	[&_svg]:text-fg-tertiary
	[&_svg]:shrink-0

	has-[[aria-invalid=true]]:border-error
	has-[[aria-invalid=true]]:ring-error-accent   
  `,
	{
		variants: {
			size: {
				"28": "gap-1.5 [&_svg:not([class*=size-])]:size-4",
				"32": "gap-2 [&_svg:not([class*=size-])]:size-4.5",
				"36": "gap-2 [&_svg:not([class*=size-])]:size-5",
				"40": "gap-2 [&_svg:not([class*=size-])]:size-5",
				"44": "gap-2 [&_svg:not([class*=size-])]:size-5",
				"48": "gap-2 [&_svg:not([class*=size-])]:size-5",
			},
			disabled: {
				true: "cursor-not-allowed opacity-60 bg-fill1 has-[:focus-visible]:ring-0 has-[:focus-visible]:border-alpha [&_svg]:text-fg-tertiary",
				false: "",
			},
		},
		defaultVariants: {
			size: "36",
			disabled: false,
		},
	}
)

function Input({ className, type, size, ...props }: InputProps) {
	return <input data-slot="input" type={type} className={cn(inputVariants({ size }), className)} {...props} />
}

Input.displayName = "Input"

function InputAddon({ className, size, mode, ...props }: InputAddonProps) {
	return <div data-slot="input-addon" className={cn(inputAddonVariants({ size, mode }), className)} {...props} />
}

InputAddon.displayName = "InputAddon"

function InputGroup({ className, ...props }: InputGroupProps) {
	return <div data-slot="input-group" className={cn(inputGroupVariants(), className)} {...props} />
}

InputGroup.displayName = "InputGroup"

function InputWrapper({ className, size, disabled, ...props }: InputWrapperProps) {
	return <div data-slot="input-wrapper" className={cn(inputVariants({ size }), inputWrapperVariants({ size, disabled }), className)} {...props} />
}

InputWrapper.displayName = "InputWrapper"

export { Input, InputAddon, InputGroup, InputWrapper, inputVariants, inputAddonVariants }
