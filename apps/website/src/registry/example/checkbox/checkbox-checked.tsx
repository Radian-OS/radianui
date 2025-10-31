import { useId } from "react"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"

export default function CheckboxChecked() {
	const id = useId()
	return (
		<div className="flex items-center gap-2">
			<Checkbox id={id} checked />
			<Label htmlFor={id}>Keep me signed in</Label>
		</div>
	)
}
