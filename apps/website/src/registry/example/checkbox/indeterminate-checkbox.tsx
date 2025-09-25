import { Minus } from "lucide-react"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"

export default function IndeterminateCheckboxExample() {
	return (
		<div className="flex items-center gap-2">
			<Checkbox id="indeterminate" icon={<Minus />} />
			<Label htmlFor="indeterminate">Indeterminate Checkbox</Label>
		</div>
	)
}
