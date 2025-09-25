import React from "react"
import { Label } from "@/registry/ui/label"
import { Password } from "@/registry/ui/password"

function PasswordExample3() {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>Password</Label>
			<Password toggleVisibility="always" className="w-80" placeholder="Enter your  Password" />
		</div>
	)
}

export default PasswordExample3
