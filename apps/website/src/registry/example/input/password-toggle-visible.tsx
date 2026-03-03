"use client"

import React, { useRef, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
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

	const IconComponent = showPassword ? EyeOffIcon : EyeIcon

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
				<IconComponent
					className="hover:text-fg peer-disabled:text-fg-disabled cursor-pointer peer-disabled:pointer-events-none"
					onMouseDown={togglePasswordVisibility}
				/>
			</InputWrapper>
		</div>
	)
}
