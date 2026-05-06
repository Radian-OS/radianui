import React from "react"
import { Input } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"

export default function PasswordPreview() {
	return (
		<div className="flex flex-col gap-1.5">
			<Label htmlFor="password">Password</Label>
			<Input
				id="password"
				className="w-80"
				type="password"
				placeholder="Enter your password"
			/>
		</div>
	)
}
