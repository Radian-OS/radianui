import { useId } from "react"
import { Checkbox } from "@/styles/default/ui/checkbox"
import { Label } from "@/styles/default/ui/label"

export default function CheckboxPreview() {
	const id = useId()
	return (
		<div className="flex items-center gap-2">
			<Checkbox id={id} />
			<Label htmlFor={id}>I agree to the Terms and Conditions</Label>
		</div>
	)
}
