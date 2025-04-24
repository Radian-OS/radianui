"use client"

import * as React from "react"
import * as OTP from "@radix-ui/react-one-time-password-field"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type OTPInputProps = React.ComponentProps<typeof OTP.Root> & {
	length?: number
	size?: "28" | "32" | "36" | "40" | "44" | "48" | "56"
	placeholder?: string
	label?: string
	className?: string
	inputClassName?: string
}

const otpInputVariants = cva(
	"rounded-lg shadow-2xs bg-bg-base text-text text-center placeholder:select-none appearance-none transition-all disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary border border-border-alpha",
	{
		variants: {
			size: {
				"28": "size-7 text-xs",
				"32": "size-8 text-sm",
				"36": "size-9 text-sm",
				"40": "size-10 text-sm",
				"44": "size-11 text-sm",
				"48": "size-12 text-base",
				"56": "size-14 text-base",
			},
		},
	}
)

function OTPInput({ length = 6, size = "44", label, className, inputClassName, ...props }: OTPInputProps) {
	return (
		<div className="flex flex-col gap-2">
			{label && <label className={cn("text-sm font-medium", { "text-text-tertiary": props.disabled })}>{label}</label>}
			<OTP.Root className={cn("flex flex-nowrap gap-2", className)} {...props} validationType="alphanumeric" disabled={true}>
				{Array.from({ length }).map((_, i) => (
					<OTP.Input
						key={i}
						className={cn(
							otpInputVariants({ size: size }),
							{ "bg-bg-level0 pointer-events-none cursor-not-allowed": props.disabled },
							inputClassName
						)}
					/>
				))}
				<OTP.HiddenInput />
			</OTP.Root>
		</div>
	)
}

OTPInput.displayName = "OTPInput"

export { OTPInput }
