"use client"

import * as React from "react"
import * as OneTimePasswordFieldPrimitive from "@radix-ui/react-one-time-password-field"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type SlotSize = NonNullable<VariantProps<typeof otpInputVariants>["size"]>
type OTPContextType = {
	size?: SlotSize
}
type OTPFieldProps = React.ComponentPropsWithoutRef<
	typeof OneTimePasswordFieldPrimitive.Root
> &
	OTPContextType
type OTPInputProps = React.ComponentPropsWithoutRef<
	typeof OneTimePasswordFieldPrimitive.Input
>
type OTPHiddenInputProps = React.ComponentPropsWithoutRef<
	typeof OneTimePasswordFieldPrimitive.HiddenInput
>

const otpInputVariants = cva(
	cn(
		"group-has-disabled:cursor-not-allowed group-has-disabled:text-fg-disabled group-has-disabled:bg-fill2-alpha group-has-disabled:placeholder:text-fg-disabled placeholder:text-fg-tertiary inline-flex text-center appearance-none items-center justify-center rounded-lg bg-bg p-0 leading-none text-fg outline-none shadow-2xs font-semibold outline-hidden border border-alpha focus-visible:ring-3 focus-visible:ring-primary-focus focus-visible:border-primary-hover ",
		"group-aria-invalid:border-error group-aria-invalid:ring-error group-aria-invalid:focus-visible:ring-error-focus group-aria-invalid:focus-visible:border-error-hover",
		"[[data-invalid=true]_&]:border-error [[data-invalid=true]_&]:ring-error [[data-invalid=true]_&]:focus-visible:ring-error-focus [[data-invalid=true]_&]:focus-visible:border-error-hover"
	),
	{
		variants: {
			size: {
				"28": "size-7 text-[13px]",
				"32": "size-8 text-sm",
				"36": "size-9 text-sm",
				"40": "size-10 text-sm",
				"44": "size-11 text-base",
				"48": "size-12 text-base",
			},
		},
		defaultVariants: {
			size: "40",
		},
	}
)

const OTPContext = React.createContext<OTPContextType | null>(null)

function useOTPContext() {
	const context = React.useContext(OTPContext)
	if (!context) throw new Error("OTPInput must be used within an OTPField")
	return context
}

function OTPField({
	className,
	children,
	validationType = "alphanumeric",
	...props
}: OTPFieldProps) {
	const { size = "40" } = props as OTPContextType
	const ctx = React.useMemo(() => ({ size }), [size])
	return (
		<OneTimePasswordFieldPrimitive.Root
			data-slot="otp-field"
			validationType={validationType}
			className={cn(
				"group peer flex flex-nowrap gap-1.5 has-disabled:cursor-not-allowed",
				className
			)}
			{...props}>
			<OTPContext.Provider value={ctx}>{children}</OTPContext.Provider>
		</OneTimePasswordFieldPrimitive.Root>
	)
}
OTPField.displayName = "OTPField"

function OTPInput({ className, ...props }: OTPInputProps) {
	const { size } = useOTPContext()
	return (
		<OneTimePasswordFieldPrimitive.Input
			data-slot="otp-input"
			className={cn(otpInputVariants({ size }), className)}
			{...props}
		/>
	)
}
OTPInput.displayName = "OTPInput"

function OTPHiddenInput({ className, ...props }: OTPHiddenInputProps) {
	return (
		<OneTimePasswordFieldPrimitive.HiddenInput
			data-slot="otp-hidden-input"
			className={className}
			{...props}
		/>
	)
}
OTPHiddenInput.displayName = "OTPHiddenInput"

export { OTPField, OTPInput, OTPHiddenInput }
