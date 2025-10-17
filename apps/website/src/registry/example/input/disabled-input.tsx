import React from "react"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const DisabledInput = () => {
	return (
		<div className="flex w-80 flex-col gap-1.5">
			<Label>Disabled Input</Label>
			<Input className="w-full" disabled placeholder="Disabled Input" />
		</div>
	)
}

export default DisabledInput
