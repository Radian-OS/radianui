"use client"

import React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input, type InputProps } from "./input"

type trailType = "show" | "hide" | "onFocus"

interface PasswordProps extends Omit<InputProps, "leadIcon" | "trailIcon"> {
	trail?: trailType
}
/**
 * Password shows a toggle icon:
 * - When trail="visibilityIcon", the icon is always visible
 * - When trail is not specified or true, the icon only appears when input is focused
 * - When trail is false, no icon is shown
 * Prevents blur when clicking the icon so toggling works.
 */
export function Password({ label, disabled = false, hint, hasError = false, size = "40", rounded = "md", id, trail, ...props }: PasswordProps) {
	const [isFocused, setIsFocused] = React.useState(false)
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

	function handleToggleVisibility() {
		if (!disabled) setIsPasswordVisible((v) => !v)
	}

	//Determine what to show in the trail prop
	let trailContent = null

	// When trail is explicitly false, don't show any icon
	if (trail === "hide") {
		trailContent = null
	}
	// When visibilityIcon is specified, always show the icon
	else if (trail === "show") {
		trailContent = isPasswordVisible ? (
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
	else if (trail === "onFocus") {
		trailContent =
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
			hint={hint && hint}
			type={isPasswordVisible ? "text" : "password"}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			end={trailContent}
			{...props}
		/>
	)
}

Password.displayName = "Password"
