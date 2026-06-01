import { useId } from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"

export default function IndeterminateCheckboxExample() {
	const id = useId()
	return (
		<div className="flex items-center gap-2">
			<Checkbox id={id} icon={<IconSlot slot="minus" />} />
			<Label htmlFor={id}>Clear Selection</Label>
		</div>
	)
}
