import React from "react"
import { useId } from "react"
import { Checkbox } from "@/styles/default/ui/checkbox"
import { Label } from "@/styles/default/ui/label"

export default function CheckboxDisabled() {
	const id = useId()
	return (
		<div className="flex items-center gap-2">
			<Checkbox id={id} disabled />
			<Label htmlFor={id}>Keep me signed in</Label>
		</div>
	)
}
