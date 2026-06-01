"use client"

import React, { useMemo, useState } from "react"
import { z } from "zod"
import { IconSlot } from "@/registry/icon/icon-library"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Progress } from "@/registry/ui/progress"

const passwordSchema = z
	.string()
	.min(8, { message: "At least 8 characters" })
	.regex(/\d/, { message: "At least one number" })
	.regex(/[a-z]/, { message: "At least one lowercase letter" })
	.regex(/[A-Z]/, { message: "At least one uppercase letter" })

function PasswordValidationExample() {
	const [password, setPassword] = useState("")
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

	const validation = useMemo(
		() => passwordSchema.safeParse(password),
		[password]
	)

	const errors = useMemo(() => {
		if (validation.success) return []
		return validation.error.issues.map((e) => e.message)
	}, [validation])

	const progress = useMemo(() => {
		const totalChecks = 4
		const passedChecks = totalChecks - errors.length
		return (passedChecks / totalChecks) * 100
	}, [errors])

	const isValid = (message: string) => !errors.includes(message)
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="validation-password">Password</Label>
				<InputWrapper className="w-80">
					<Input
						id="validation-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						type={showPassword ? "text" : "password"}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
					/>
					{isFocused && IconComponent}
				</InputWrapper>
			</div>
			<div className="body-13 flex w-full flex-col gap-2">
				<Progress value={progress} />
				<p className="text-sm font-semibold">Your Password must contain</p>
				{[
					"At least 8 characters",
					"At least one number",
					"At least one lowercase letter",
					"At least one uppercase letter",
				].map((label) => (
					<p key={label} className="text-fg-tertiary flex items-center gap-2">
						<IconSlot
							slot="circle-check"
							className={`size-4 ${isValid(label) ? "text-success-text" : ""}`}
						/>
						{label}
					</p>
				))}
			</div>
		</div>
	)
}

export default PasswordValidationExample
