import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radiogroup"

export default function RadioGroupSize() {
	return (
		<div className="bg-bg flex min-w-fit flex-col gap-3">
			<Label>Size</Label>
			<RadioGroup defaultValue="sm" className="gap-3">
				<div className="flex items-center gap-2">
					<RadioGroupItem size="md" value="sm" id="sm" />
					<Label htmlFor="sm">Small</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem value="md" id="md" />
					<Label htmlFor="md">Medium</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem value="lg" id="lg" />
					<Label htmlFor="lg">Large</Label>
				</div>
			</RadioGroup>
		</div>
	)
}
