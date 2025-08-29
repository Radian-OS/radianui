"use client"

import React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input, type InputProps } from "./input"

type visibilityType = "show" | "hide" | "onFocus"

interface PasswordProps extends Omit<InputProps, "leadIcon" | "trailIcon"> {
	visibility?: visibilityType
}

/**
 * Password shows a toggle icon:
 * - When visibility="show", the icon is always visible
 * - When visibility is not specified or "onFocus", the icon only appears when input is focused
 * - When visibility="hide", no icon is shown
 * Prevents blur when clicking the icon so toggling works.
 */
export function Password({ label, disabled = false, hint, hasError = false, size = "40", rounded = "md", id, visibility, ...props }: PasswordProps) {
	const [isFocused, setIsFocused] = React.useState(false)
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

	function handleToggleVisibility() {
		if (!disabled) setIsPasswordVisible((v) => !v)
	}

	//Determine what to show in the visibility prop
	let trailContent = null

	// When visibility is explicitly "hide", don't show any icon
	if (visibility === "hide") {
		trailContent = null
	}
	// When "show" is specified, always show the icon
	else if (visibility === "show") {
		trailContent = isPasswordVisible ? (
			<Eye
				size={20}
				onMouseDown={(e) => e.preventDefault()} // prevent blur
				onClick={handleToggleVisibility}
				className={cn("text-fg-tertiary cursor-pointer", {
					"cursor-not-allowed": disabled,
				})}
			/>
		) : (
			<EyeOff
				size={20}
				onMouseDown={(e) => e.preventDefault()} // prevent blur
				onClick={handleToggleVisibility}
				className={cn("text-fg-tertiary cursor-pointer", {
					"cursor-not-allowed": disabled,
				})}
			/>
		)
	}
	// Default behavior: show only when focused
	else if (visibility === "onFocus") {
		trailContent =
			isFocused &&
			(isPasswordVisible ? (
				<Eye
					size={20}
					onMouseDown={(e) => e.preventDefault()} // prevent blur
					onClick={handleToggleVisibility}
					className={cn("text-fg-tertiary cursor-pointer", {
						"cursor-not-allowed": disabled,
					})}
				/>
			) : (
				<EyeOff
					size={20}
					onMouseDown={(e) => e.preventDefault()} // prevent blur
					onClick={handleToggleVisibility}
					className={cn("text-fg-tertiary cursor-pointer", {
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
