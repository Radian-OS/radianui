"use client"

import React from "react"
import { cva } from "class-variance-authority"
import { OTPInput as OTP, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS, type SlotProps } from "input-otp"
import { cn } from "@/lib/utils"
import { Input, RoundedOptions, SizeOptions, cvaInputVariants, defaultInputRadius, defaultInputSize } from "./input"
import { Label } from "./label"

// Variants for the container of the OTP input
const otpContainerVariants = cva("", {
	variants: {
		variant: { box: "flex w-fit gap-1.5 select-none", flat: "" },
	},
	defaultVariants: { variant: "box" },
})
// Variants for the slots of the OTP input
const otpSlotVariants = cva("", {
	variants: {
		...cvaInputVariants,
		variant: {
			box: "relative text-text flex items-center justify-center transition-all duration-300 border border-border bg-bg-base drop-shadow-xs",
			flat: "",
		},
		size: {
			"0": "",
			"28": "size-7 text-xs",
			"32": "size-8 text-sm",
			"36": "size-9 text-sm",
			"40": "size-10 text-sm",
			"44": "size-11 text-sm",
			"48": "size-12 text-base",
			"56": "size-14 text-base",
		},
	},
	defaultVariants: { variant: "box", size: defaultInputSize },
})
// Type definition for OTP input props, extending OTP component props
type OTPInputProps = Pick<
	React.ComponentPropsWithoutRef<typeof OTP>,
	| "value"
	| "onChange"
	| "containerClassName"
	| "onComplete"
	| "placeholder"
	| "textAlign"
	| "inputMode"
	| "pattern"
	| "pasteTransformer"
	| "pushPasswordManagerStrategy"
	| "noScriptCSSFallback"
	| "className"
	| "disabled"
> & {
	length?: number
	variant?: "box" | "flat"
	label?: string
	placeholder?: string
	id?: string
	size?: SizeOptions
	rounded?: RoundedOptions
}
// OTPInput component definition
function OTPInput({
	length = 6,
	variant = "box",
	label,
	placeholder,
	id,
	onChange,
	size = defaultInputSize,
	rounded = defaultInputRadius,
	className,
	...props
}: OTPInputProps) {
	// Value for the flat variant
	const [value, setValue] = React.useState<string>("")
	const inputRef = React.useRef<HTMLInputElement>(null)
	// If the variant is flat, render a simple Input component
	if (variant == "flat") {
		return (
			<Input
				ref={inputRef}
				label={label}
				placeholder={placeholder}
				value={value}
				size={size}
				rounded={rounded}
				className={cn(otpContainerVariants({ variant }), className)}
				onChange={(e) => {
					const rawValue = e.target.value
					const regex = props.inputMode === "numeric" ? new RegExp(REGEXP_ONLY_DIGITS) : new RegExp(REGEXP_ONLY_DIGITS_AND_CHARS)

					if (rawValue !== "" && !regex.test(rawValue)) return

					let newValue = rawValue.slice(0, length)

					// If already at max length, replace the last character
					if (newValue.length > length - 1) {
						newValue = value.slice(0, length - 1) + newValue.charAt(newValue.length - 1)
					}

					setValue(newValue)
					onChange?.(newValue)

					if (newValue.length === length) {
						props.onComplete?.(newValue)
					}
				}}
				id={id}
				disabled={props.disabled}
			/>
		)
	}

	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			{label && (
				<Label
					className={cn("w-fit text-sm font-medium", {
						"text-text-tertiary": props.disabled,
					})}>
					{label}
				</Label>
			)}
			<OTP
				render={({ slots }) => (
					<div className={otpContainerVariants({ variant })}>
						{slots.slice(0, length).map((slot, idx) => (
							<Slot key={idx} variant={variant} size={size} rounded={rounded} {...slot} />
						))}
					</div>
				)}
				placeholder={placeholder}
				maxLength={length}
				pattern={props.inputMode === "numeric" ? REGEXP_ONLY_DIGITS : REGEXP_ONLY_DIGITS_AND_CHARS}
				onChange={onChange}
				disabled={props.disabled}
				className={cn({ "cursor-not-allowed": props.disabled })}
				{...props}
			/>
		</div>
	)
}
// Slot component for individual OTP input slots
function Slot(
	props: SlotProps & {
		variant: "box" | "flat"
		size: SizeOptions
		rounded: RoundedOptions
	}
) {
	const slotRef = React.useRef<HTMLDivElement>(null)
	// Adding event listeners for mouse enter and leave
	React.useEffect(function () {
		if (slotRef.current) {
			slotRef.current.addEventListener("mouseenter", () => {
				slotRef.current?.classList.add("border-border-alpha!")
				slotRef.current?.classList.add("border-2")
			})

			slotRef.current.addEventListener("mouseleave", () => slotRef.current?.classList.remove("border-border-alpha!"))
		}
	}, [])

	return (
		<div
			className={cn(
				otpSlotVariants({
					variant: props.variant,
					size: props.size,
					rounded: props.rounded,
				}),
				{
					"border-primary ring-primary-focus ring-2": props.isActive,
				}
			)}
			ref={slotRef}>
			{props.char !== null ? (
				<div>{props.char}</div>
			) : (
				props.isActive && <div className="animate-caret-blink inline-block h-[1.2rem] w-[0.063rem] bg-current" />
			)}
		</div>
	)
}
export default OTPInput
