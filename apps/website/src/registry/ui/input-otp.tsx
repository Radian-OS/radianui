"use client"

import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { type OTPInputProps, OTPInput as Root, type SlotProps } from "input-otp"
import { cn } from "@/lib/utils"
import { Label } from "./label"

type SlotSize = NonNullable<VariantProps<typeof slotVariants>["size"]>

type OTPInput = Pick<
	OTPInputProps,
	| "value"
	| "onChange"
	| "containerClassName"
	| "onComplete"
	| "textAlign"
	| "inputMode"
	| "pattern"
	| "placeholder"
	| "pasteTransformer"
	| "pushPasswordManagerStrategy"
	| "noScriptCSSFallback"
	| "className"
> &
	OTPInputContextType & {
		length?: number
		label?: string
	}

type OTPInputContextType = {
	size?: SlotSize
	errorMsg?: string
	disabled?: boolean
	hasError?: boolean
}

const OTPInputContext = React.createContext<OTPInputContextType | null>(null)

const slotVariants = cva(
	"relative rounded-lg shadow-2xs font-semibold bg-bg-base text-text flex items-center justify-center placeholder:select-none appearance-none transition-all outline-hidden border border-border-alpha",
	{
		variants: {
			size: {
				"28": "size-7 text-xs p-1.5",
				"32": "size-8 text-sm p-1.5",
				"36": "size-9 text-sm p-2",
				"40": "size-10 text-sm p-2.5",
				"44": "size-11 text-sm p-2.5",
				"56": "size-14 text-base p-4",
			},
		},
	}
)

function useOTPInputContext() {
	const context = React.useContext(OTPInputContext)
	if (!context) {
		throw new Error("Slot must be used inside an OTPInput")
	}
	return context
}

function InputOtp({ size = "40", length = 6, label, disabled, hasError, errorMsg, ...props }: OTPInput) {
	const ctxValues = React.useMemo(() => ({ size, disabled, hasError, errorMsg }), [size, disabled, hasError, errorMsg])
	return (
		<OTPInputContext.Provider value={ctxValues}>
			<div className="flex w-fit flex-col gap-1.5">
				{label && (
					<Label
						className={cn("w-fit text-sm font-medium", {
							"text-text-disabled cursor-not-allowed select-none": disabled,
						})}>
						{label}
					</Label>
				)}
				<Root
					maxLength={length}
					className="disabled:cursor-not-allowed"
					containerClassName="group flex items-center w-fit"
					render={({ slots }) => (
						<div className="flex gap-1.5">
							{slots.map((slot, idx) => (
								<Slot key={idx} {...slot} />
							))}
						</div>
					)}
					disabled={disabled}
					{...props}
				/>
				{hasError && <Label className={cn("text-error text-xs font-medium")}>{errorMsg}</Label>}
			</div>
		</OTPInputContext.Provider>
	)
}

function Slot({ isActive, hasFakeCaret, char }: SlotProps) {
	const { size, disabled, hasError } = useOTPInputContext()
	return (
		<div
			className={cn(slotVariants({ size: size }), {
				"ring-primary-focus border-primary-stroke ring-3": isActive,
				"bg-bg-level0 border-border cursor-not-allowed": disabled,
				"border-error-stroke ring-error-focus": hasError,
			})}>
			{char !== null && <div>{char}</div>}
			{hasFakeCaret && <FakeCaret />}
		</div>
	)
}

function FakeCaret() {
	return (
		<div className="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center">
			<div className="bg-text h-6 w-px" />
		</div>
	)
}

export { InputOtp }
