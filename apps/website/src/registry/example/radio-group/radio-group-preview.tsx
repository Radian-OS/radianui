import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radiogroup"

export default function RadioGroupPreview() {
	return (
		<div className="flex flex-col gap-4">
			<Label>Notify me about...</Label>
			<RadioGroup defaultValue="all-new-messages">
				<div className="flex items-center gap-2">
					<RadioGroupItem id="1" value="all-new-messages" />
					<Label htmlFor="1">All new messages</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem id="2" value="direct-messages-and-mentions" />
					<Label htmlFor="2">Direct messages and mentions</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem id="3" value="nothing" />
					<Label htmlFor="3">Nothing</Label>
				</div>
			</RadioGroup>
		</div>
	)
}
