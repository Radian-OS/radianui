import React from "react"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const InvalidInput = () => {
	return (
		<div className="flex w-80 flex-col gap-1.5">
			<Label>Email</Label>
			<Input className="w-full" type="email" aria-invalid placeholder="sample@email" />
			<div className="text-error-text text-xs font-normal">Please enter a valid email address</div>
		</div>
	)
}

export default InvalidInput
