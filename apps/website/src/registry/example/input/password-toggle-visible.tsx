"use client"

import React, { useRef, useState } from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function PasswordToggleVisible() {
	const [showPassword, setShowPassword] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

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
			<Label htmlFor="toggle-visible-password">Password</Label>
			<InputWrapper className="w-80">
				<Input
					id="toggle-visible-password"
					ref={inputRef}
					placeholder="Enter your password"
					className="peer"
					type={showPassword ? "text" : "password"}
				/>
				{IconComponent}
			</InputWrapper>
		</div>
	)
}
