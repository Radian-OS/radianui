"use client"

import React from "react"
import { Input } from "./input"

type visibilityType = "show" | "hide" | "onFocus"

interface PasswordProps extends React.ComponentProps<"input"> {
	visibility?: visibilityType
}

/**
 * Password shows a toggle icon:
 * - When visibility="show", the icon is always visible
 * - When visibility is not specified or "onFocus", the icon only appears when input is focused
 * - When visibility="hide", no icon is shown
 * Prevents blur when clicking the icon so toggling works.
 */
export function Password({ disabled = false, id }: PasswordProps) {
	// const [isFocused, setIsFocused] = React.useState(false)
	// const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

	// function handleToggleVisibility() {
	// 	if (!disabled) setIsPasswordVisible((v) => !v)
	// }

	//Determine what to show in the visibility prop
	// let trailContent = null

	// When visibility is explicitly "hide", don't show any icon
	// if (visibility === "hide") {
	// 	trailContent = null
	// }
	// When "show" is specified, always show the icon
	// else if (visibility === "show") {
	// 	trailContent = isPasswordVisible ? (
	// 		<Eye
	// 			size={20}
	// 			onMouseDown={(e) => e.preventDefault()} // prevent blur
	// 			onClick={handleToggleVisibility}
	// 			className={cn("text-fg-tertiary cursor-pointer", {
	// 				"cursor-not-allowed": disabled,
	// 			})}
	// 		/>
	// 	) : (
	// 		<EyeOff
	// 			size={20}
	// 			onMouseDown={(e) => e.preventDefault()} // prevent blur
	// 			onClick={handleToggleVisibility}
	// 			className={cn("text-fg-tertiary cursor-pointer", {
	// 				"cursor-not-allowed": disabled,
	// 			})}
	// 		/>
	// 	)
	// }

	return <Input id={id} disabled={disabled} />
}

Password.displayName = "Password"
