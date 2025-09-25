import React from "react"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"

export default function CheckboxDisabled() {
	return (
		<div className="flex items-center gap-2">
			<Checkbox id="disabled" disabled />
			<Label htmlFor="disabled">Disabled Checkbox</Label>
		</div>
	)
}
