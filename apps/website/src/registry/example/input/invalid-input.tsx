import React from "react"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const InvalidInput = () => {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>Invalid Input</Label>
			<Input className="md:w-80" aria-invalid placeholder="Invalid Input" />{" "}
		</div>
	)
}

export default InvalidInput
