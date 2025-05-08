"use client"

import React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input, InputProps } from "./input"

type TrialType = "show" | "hide" | "onFocus"

interface PasswordProps extends Omit<InputProps, "leadIcon" | "trialIcon"> {
	trial?: TrialType
}
/**
 * Password shows a toggle icon:
 * - When trial="visibilityIcon", the icon is always visible
 * - When trial is not specified or true, the icon only appears when input is focused
 * - When trial is false, no icon is shown
 * Prevents blur when clicking the icon so toggling works.
 */
export function Password({ label, disabled = false, errorMsg, hasError = false, size = "40", rounded = "md", id, trial, ...props }: PasswordProps) {
	const [isFocused, setIsFocused] = React.useState(false)
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

	function handleToggleVisibility() {
		if (!disabled) setIsPasswordVisible((v) => !v)
	}

	//Determine what to show in the trial prop
	let trialContent = null

	// When trial is explicitly false, don't show any icon
	if (trial === "hide") {
		trialContent = null
	}
	// When visibilityIcon is specified, always show the icon
	else if (trial === "show") {
		trialContent = isPasswordVisible ? (
			<Eye
				size={20}
				onMouseDown={(e) => e.preventDefault()} // prevent blur
				onClick={handleToggleVisibility}
				className={cn("text-text-tertiary cursor-pointer", {
					"cursor-not-allowed": disabled,
				})}
			/>
		) : (
			<EyeOff
				size={20}
				onMouseDown={(e) => e.preventDefault()} // prevent blur
				onClick={handleToggleVisibility}
				className={cn("text-text-tertiary cursor-pointer", {
					"cursor-not-allowed": disabled,
				})}
			/>
		)
	}
	// Default behavior: show only when focused
	else if (trial === "onFocus") {
		trialContent =
			isFocused &&
			(isPasswordVisible ? (
				<Eye
					size={20}
					onMouseDown={(e) => e.preventDefault()} // prevent blur
					onClick={handleToggleVisibility}
					className={cn("text-text-tertiary cursor-pointer", {
						"cursor-not-allowed": disabled,
					})}
				/>
			) : (
				<EyeOff
					size={20}
					onMouseDown={(e) => e.preventDefault()} // prevent blur
					onClick={handleToggleVisibility}
					className={cn("text-text-tertiary cursor-pointer", {
						"cursor-not-allowed": disabled,
					})}
				/>
			))
	}

	return (
		<Input
			id={id}
			label={label}
			size={size}
			rounded={rounded}
			disabled={disabled}
			hasError={hasError}
			errorMsg={errorMsg}
			type={isPasswordVisible ? "text" : "password"}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			trial={trialContent}
			{...props}
		/>
	)
}

Password.displayName = "Password"
