"use client"

import * as React from "react"
import * as RadixOTP from "@radix-ui/react-one-time-password-field"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type SlotSize = NonNullable<VariantProps<typeof otpInputVariants>["size"]>
type OTPContextType = {
	size?: SlotSize
}
type OTPFieldProps = React.ComponentPropsWithoutRef<typeof RadixOTP.Root>
type OTPInputProps = React.ComponentPropsWithoutRef<typeof RadixOTP.Input>
type OTPHiddenInputProps = React.ComponentPropsWithoutRef<typeof RadixOTP.HiddenInput>

const otpInputVariants = cva(
	cn(
		"group-has-disabled:cursor-not-allowed placeholder:text-fg-tertiary inline-flex text-center appearance-none items-center justify-center rounded-lg bg-bg p-0 leading-none text-fg outline-none shadow-2xs font-semibold outline-hidden border border-alpha focus-visible:ring-3 focus-visible:ring-primary-focus focus-visible:border-primary-hover ",
		"group-aria-invalid:border-error/60 group-aria-invalid:ring-error/10 dark:group-aria-invalid:border-error dark:group-aria-invalid:ring-error/20 group-aria-invalid:focus-visible:ring-error-focus group-aria-invalid:focus-visible:border-error-hover",
		"[[data-invalid=true]_&]:border-error/60 [[data-invalid=true]_&]:ring-error/10  dark:[[data-invalid=true]_&]:border-error dark:[[data-invalid=true]_&]:ring-error/20 [[data-invalid=true]_&]:focus-visible:ring-error-focus [[data-invalid=true]_&]:focus-visible:border-error-hover"
	),
	{
		variants: {
			size: {
				"28": "size-7 text-xs",
				"32": "size-8 text-sm",
				"36": "size-9 text-sm",
				"40": "size-10 text-sm",
				"44": "size-11 text-sm",
				"56": "size-14 text-3xl",
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

function OTPField({ className, children, ...props }: OTPFieldProps & OTPContextType) {
	const { size = "40" } = props as OTPContextType
	const ctx = React.useMemo(() => ({ size }), [size])
	return (
		<RadixOTP.Root data-slot="otp-root" className={cn("has-disabled:cursor-not-allowed has-disabled:opacity-50 group peer flex flex-nowrap gap-1.5", className)} {...props}>
			<OTPContext.Provider value={ctx}>{children}</OTPContext.Provider>
		</RadixOTP.Root>
	)
}
OTPField.displayName = "OTPField"

function OTPInput({ className, ...props }: OTPInputProps & OTPContextType) {
	const { size } = useOTPContext()
	return <RadixOTP.Input data-slot="otp-input" className={cn(otpInputVariants({ size }), className)} {...props} />
}
OTPInput.displayName = "OTPInput"

function OTPHiddenInput({ className, ...props }: OTPHiddenInputProps) {
	return <RadixOTP.HiddenInput data-slot="otp-hidden-input" className={className} {...props} />
}
OTPHiddenInput.displayName = "OTPHiddenInput"

export { OTPField, OTPInput, OTPHiddenInput }
