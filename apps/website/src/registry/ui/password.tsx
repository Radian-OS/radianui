"use client"

import React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input, InputProps } from "./input"

/**
 * PasswordInput shows a toggle icon only when the input is focused.
 */
export function Password({
	label,
	disabled = false,
	errorMsg,
	hasError = false,
	size = "40",
	rounded = "md",
	id,
	...props
}: Omit<InputProps, "leadIcon" | "trialIcon">) {
	const [isFocused, setIsFocused] = React.useState(false)
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

	function handleToggleVisibility() {
		if (!disabled) setIsPasswordVisible((v) => !v)
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
			trial={
				isFocused && (
					isPasswordVisible ? (
						<Eye
							size={20}
							onClick={handleToggleVisibility}
							className={cn("text-text-tertiary cursor-pointer", {
								"cursor-not-allowed": disabled,
							})}
						/>
					) : (
						<EyeOff
							size={20}
							onClick={handleToggleVisibility}
							className={cn("text-text-tertiary cursor-pointer", {
								"cursor-not-allowed": disabled,
							})}
						/>
					)
				)
			}
			{...props}
		/>
	)
}

Password.displayName = "Password"
