import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"

export default function CheckboxChecked() {
	return (
		<div className="flex items-center gap-2">
			<Checkbox id="terms" checked />
			<Label htmlFor="terms">Checked Checkbox</Label>
		</div>
	)
}
