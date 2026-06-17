import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

export default function RadioHorizontal() {
	return (
		<div className="flex min-w-fit flex-col gap-3">
			<Label>Label</Label>
			<RadioGroup defaultValue="" className="flex flex-row gap-3">
				<div className="flex items-center gap-2">
					<RadioGroupItem value="option_a" id="option_a" />
					<Label htmlFor="option_a">Option A</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem value="option_b" id="option_b" />
					<Label htmlFor="option_b">Option B</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem value="option_c" id="option_c" />
					<Label htmlFor="option_c">Option C</Label>
				</div>
			</RadioGroup>
			<p className="text-fg-secondary text-sm">This is a hint.</p>
		</div>
	)
}
