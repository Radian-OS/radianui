import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

export default function RadioGroupSize() {
	return (
		<div className="bg-bg flex min-w-fit flex-col gap-1.5">
			<Label>Size</Label>
			<RadioGroup defaultValue="sm">
				<div className="flex items-center gap-2">
					<RadioGroupItem size="sm" value="sm" id="sm" />
					<Label htmlFor="sm">Small</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem size="md" value="md" id="md" />
					<Label htmlFor="md">Medium</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem size="lg" value="lg" id="lg" />
					<Label htmlFor="lg">Large</Label>
				</div>
			</RadioGroup>
		</div>
	)
}
