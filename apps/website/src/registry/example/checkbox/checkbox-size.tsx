import React from "react"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"

export default function CheckboxSize() {
	return (
		<div className="flex flex-col space-y-2">
			<div className="flex items-center space-x-2">
				<Checkbox size="sm" id="sm" />
				<Label htmlFor="sm">Small</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Checkbox size="md" id="md" />
				<Label htmlFor="md">Medium</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Checkbox size="lg" id="lg" />
				<Label htmlFor="lg">Large</Label>
			</div>
		</div>
	)
}
