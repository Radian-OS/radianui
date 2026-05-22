"use client"

import * as React from "react"
import * as OneTimePasswordFieldPrimitive from "@radix-ui/react-one-time-password-field"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type SlotSize = NonNullable<VariantProps<typeof otpInputVariants>["size"]>
type OTPContextType = { size?: SlotSize }
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
		"r-otp-input cn-otp-input inline-flex appearance-none items-center justify-center text-center p-0 leading-none outline-none outline-hidden",
		"group-aria-invalid:border-error group-aria-invalid:ring-error group-aria-invalid:focus-visible:ring-error-focus group-aria-invalid:focus-visible:border-error-hover",
		"[[data-invalid=true]_&]:border-error [[data-invalid=true]_&]:ring-error [[data-invalid=true]_&]:focus-visible:ring-error-focus [[data-invalid=true]_&]:focus-visible:border-error-hover"
	),
	{
		variants: {
			size: {
				"28": "r-otp-input-28 cn-otp-input-28",
				"32": "r-otp-input-32 cn-otp-input-32",
				"36": "r-otp-input-36 cn-otp-input-36",
				"40": "r-otp-input-40 cn-otp-input-40",
				"44": "r-otp-input-44 cn-otp-input-44",
				"48": "r-otp-input-48 cn-otp-input-48",
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
				"r-otp-field cn-otp-field has-disabled:cursor-not-allowed group peer flex flex-nowrap",
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
