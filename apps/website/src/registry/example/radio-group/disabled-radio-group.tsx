import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radiogroup"

export default function DisabledRadioGroup() {
	return (
		<div className="bg-bg flex min-w-fit flex-col gap-3">
			<Label className="font-medium">Select Your ARM Chip</Label>
			<RadioGroup defaultValue="m4" className="gap-4" disabled>
				<div className="flex items-center gap-2">
					<RadioGroupItem value="m3" id="11" />
					<Label htmlFor="11">M3</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem value="m3_pro" id="12" />
					<Label htmlFor="12">M3 Pro</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem value="m3_max" id="13" />
					<Label htmlFor="13">M3 Max</Label>
				</div>
			</RadioGroup>
		</div>
	)
}
