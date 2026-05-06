import { useId } from "react"
import { Minus } from "lucide-react"
import { Checkbox } from "@/styles/default/ui/checkbox"
import { Label } from "@/styles/default/ui/label"

export default function IndeterminateCheckboxExample() {
	const id = useId()
	return (
		<div className="flex items-center gap-2">
			<Checkbox id={id} icon={<Minus />} />
			<Label htmlFor={id}>Clear Selection</Label>
		</div>
	)
}
