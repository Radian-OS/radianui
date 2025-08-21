"use client"

import React, { useEffect, useId, useRef, useState } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const switchStyles = cva("relative flex cursor-pointer items-center gap-2.5 rounded-full bg-border p-0.75 transition-all duration-[400ms] ease-in-out", {
	variants: {
		size: {
			"20": "w-9 h-5",
			"24": "w-10.5 h-6",
		},
	},
	defaultVariants: {
		size: "24",
	},
})

const sliderStyles = cva("absolute select-none rounded-full bg-white transition-all duration-[400ms] ease-in-out", {
	variants: {
		size: {
			"20": "size-3.5",
			"24": "size-4.5",
		},
	},
	defaultVariants: {
		size: "24",
	},
})

type SwitchProps = React.HTMLAttributes<HTMLInputElement> & {
	children?: string
	size?: "20" | "24"
	isSelected?: boolean
	onValueChange?: (selected: boolean) => void
	defaultSelected?: boolean
	disabled?: boolean
	ref?: React.Ref<HTMLInputElement>
}

function Switch({ size = "24", defaultSelected = false, isSelected, onValueChange, disabled = false, className, children, ...props }: SwitchProps) {
	const switchId = useId()
	const [selected, setSelected] = useState<boolean>(defaultSelected)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isSelected !== undefined) {
			setSelected(isSelected)
		}
	}, [isSelected])

	return (
		<div className={cn("box-border flex items-center gap-2", className)}>
			<div className="relative">
				<input
					ref={inputRef}
					onChange={(e) => {
						setSelected(e.target.checked)
						onValueChange?.(e.target.checked)
					}}
					className="peer sr-only" // Add peer class here
					type="checkbox"
					id={switchId}
					disabled={disabled}
					checked={selected}
					{...props}
				/>
				<label
					htmlFor={switchId}
					className={cn(
						switchStyles({ size }),
						// Add focus styles using peer selector
						"peer-focus-visible:ring-primary peer-focus-visible:ring-offset-bg-bg text-fgpeer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
						{
							"bg-primary": selected,
							"cursor-not-allowed": disabled,
							"opacity-50": disabled && selected,
							"peer-focus-visible:ring-border peer-focus-visible:ring-offset-bg-bg peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2": !selected,
						}
					)}>
					<span
						className={cn(sliderStyles({ size }), {
							"translate-x-4": selected && size === "20",
							"translate-x-4.5": selected && size === "24",
						})}
					/>
				</label>
			</div>
			{children && (
				<label
					htmlFor={switchId}
					className={cn("select-none font-normal", {
						"text-fg-disabled cursor-not-allowed": disabled,
						"text-sm": size === "20",
						"text-base": size === "24",
					})}>
					{children}
				</label>
			)}
		</div>
	)
}

Switch.displayName = "Switch"
export default Switch
