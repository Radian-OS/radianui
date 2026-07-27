"use client"

import React, { useId } from "react"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function PasswordPreview() {
	const id = useId()

	return (
		<div className="flex w-full max-w-80 flex-col gap-1.5">
			<Label htmlFor={id}>Password</Label>
			<Input id={id} type="password" placeholder="Enter your password" />
		</div>
	)
}
