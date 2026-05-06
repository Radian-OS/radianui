import React from "react"
import { useId } from "react"
import { Checkbox } from "@/styles/default/ui/checkbox"
import { Label } from "@/styles/default/ui/label"

export default function CheckboxSize() {
	const smId = useId()
	const mdId = useId()
	const lgId = useId()
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Checkbox size="sm" id={smId} />
				<Label htmlFor={smId}>Small</Label>
			</div>
			<div className="flex items-center gap-2">
				<Checkbox size="md" id={mdId} />
				<Label htmlFor={mdId}>Medium</Label>
			</div>
			<div className="flex items-center gap-2">
				<Checkbox size="lg" id={lgId} />
				<Label htmlFor={lgId}>Large</Label>
			</div>
		</div>
	)
}
