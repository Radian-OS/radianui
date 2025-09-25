import React from "react"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const DisabledInput = () => {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>Disabled Input</Label>
			<Input className="md:w-80" disabled placeholder="Disabled Input" />
		</div>
	)
}

export default DisabledInput
