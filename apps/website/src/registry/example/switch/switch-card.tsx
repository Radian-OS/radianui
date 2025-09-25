import { useId } from "react"
import { Label } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"

export default function SwitchCard() {
	const id = useId()

	return (
		<div className="flex w-full max-w-sm items-center space-x-2">
			<div className="border-border has-data-[state=checked]:border-primary relative flex w-full items-start gap-2 rounded-xl border p-4">
				<Switch id={id} className="order-1" aria-describedby={`${id}-description`} />
				<div className="grid grow gap-2">
					<Label htmlFor={id}>Label</Label>
					<p id={`${id}-description`} className="text-fg-secondary text-xs">
						Insert the switch description here
					</p>
				</div>
			</div>
		</div>
	)
}
