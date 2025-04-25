"use client"

import * as React from "react"
import { OTPInput as Root,OTPInputContext,REGEXP_ONLY_CHARS,REGEXP_ONLY_DIGITS_AND_CHARS,REGEXP_ONLY_DIGITS,type OTPInputProps,type SlotProps } from "input-otp"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type OTPInput = React.ComponentProps<typeof Root> & {
	length?: number
	size?: "28" | "32" | "36" | "40" | "44" | "48" | "56"
	placeholder?: string
	label?: string
	className?: string
}

const slotVariants = cva(
	"relative rounded-lg shadow-2xs bg-bg-base text-text flex items-center justify-center placeholder:select-none appearance-none transition-all disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary border border-border-alpha",
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

function OTPInput(){

}


function Slot(props: SlotProps) {
	return (
	  <div
		className={cn()}
	  >
		{props.char !== null && <div>{props.char}</div>}
		{props.hasFakeCaret && <FakeCaret />}
	  </div>
	)
  }


  function FakeCaret() {
	return (
	  <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
		<div className="w-px h-8 bg-white" />
	  </div>
	)
  }

export { OTPInput }
