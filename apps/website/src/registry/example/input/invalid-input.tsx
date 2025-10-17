import React from "react"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const InvalidInput = () => {
	return (
		<div className="flex w-80 flex-col gap-1.5">
			<Label>Invalid Input</Label>
			<Input className="w-full" aria-invalid placeholder="Invalid Input" />
			<div className="text-error-text text-xs font-normal">Please enter a valid detail</div>
		</div>
	)
}

export default InvalidInput
