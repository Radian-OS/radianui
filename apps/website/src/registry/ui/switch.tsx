"use client"

import React, { useEffect, useId, useState } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Define styles for the switch component
const switchStyles = cva(
	"relative flex cursor-pointer items-center gap-2.5 rounded-full bg-border p-0.75 transition-all duration-[400ms] ease-in-out",
	{
		variants: {
			size: {
				"20": "w-9 h-5",
				"24": "w-10.5 h-6",
			},
		},
		defaultVariants: {
			size: "24",
		},
	}
)
// Define styles for the slider component
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
	// Effect to update local state when isSelected prop changes
	useEffect(() => {
		if (isSelected !== undefined) {
			setSelected(isSelected)
		}
	}, [isSelected])

	return (
		<label className={cn("box-border flex items-center gap-2", className)}>
			<input
				onChange={function (e) {
					setSelected(e.target.checked)
					if (onValueChange !== undefined) {
						onValueChange(e.target.checked)
					}
				}}
				className={cn("h-0 w-0 opacity-0")}
				type="checkbox"
				id={switchId}
				disabled={disabled}
				checked={selected}
				{...props}
			/>
			<label
				htmlFor={switchId}
				className={cn(switchStyles({ size }), {
					"bg-success": selected,
					"cursor-not-allowed": disabled,
					"opacity-20": disabled && selected,
				})}>
				<span
					className={cn(sliderStyles({ size }), {
						"translate-x-4": selected && size == "20",
						"translate-x-4.5": selected && size == "24",
						"opacity-60": disabled,
					})}
				/>
			</label>
			{children && (
				<label
					htmlFor={switchId}
					className={cn("text-sm font-normal select-none", {
						"text-text-tertiary cursor-not-allowed": disabled,
					})}>
					{children}
				</label>
			)}
		</label>
	)
}
Switch.displayName = "Switch"

export default Switch
