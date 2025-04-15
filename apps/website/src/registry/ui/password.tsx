"use client"

import React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input, InputProps } from "./input"

// Password component definition
function Password({
	label,
	disabled,
	errorMsg,
	hasError = false,
	size = "40",
	rounded = "rounded",
	id,
	...props
}: Omit<InputProps, "prefixIcon" | "suffixIcon">) {
	const [showPassword, setShowPassword] = React.useState(false)
	function toggleShowPassword() {
		if (!disabled) {
			setShowPassword((prevValue) => !prevValue)
		}
	}

	return (
		<Input
			suffixIcon={
				showPassword ? (
					<Eye
						size={20}
						onClick={function () {
							toggleShowPassword()
						}}
						className={cn("text-text-tertiary cursor-pointer", {
							"cursor-not-allowed": disabled,
						})}
					/>
				) : (
					<EyeOff
						onClick={function () {
							toggleShowPassword()
						}}
						size={20}
						className={cn("text-text-tertiary cursor-pointer", {
							"cursor-not-allowed": disabled,
						})}
					/>
				)
			}
			label={label}
			errorMsg={errorMsg}
			hasError={hasError}
			disabled={disabled}
			size={size}
			rounded={rounded}
			type={showPassword ? "text" : "password"}
			id={id}
			{...props}
		/>
	)
}

Password.displayName = "Password"

export { Password }
