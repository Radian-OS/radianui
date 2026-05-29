"use client"

import React, { useState } from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function PasswordToggleOnFocus() {
	const [showPassword, setShowPassword] = useState(false)
	const [isFocused, setIsFocused] = useState(false)

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword(!showPassword)
	}

	const IconComponent = showPassword ? (
		<IconSlot
			slot="eyeoff"
			className="hover:text-fg cursor-pointer"
			onMouseDown={togglePasswordVisibility}
		/>
	) : (
		<IconSlot
			slot="eye"
			className="hover:text-fg cursor-pointer"
			onMouseDown={togglePasswordVisibility}
		/>
	)

	return (
		<div className="flex flex-col gap-1.5">
			<Label htmlFor="on-focus-password">Password</Label>
			<InputWrapper className="w-80">
				<Input
					id="on-focus-password"
					placeholder="Enter your password"
					type={showPassword ? "text" : "password"}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
				{isFocused && IconComponent}
			</InputWrapper>
		</div>
	)
}
