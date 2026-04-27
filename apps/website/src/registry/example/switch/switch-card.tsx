import { useId } from "react"
import { Label } from "@/styles/default/ui/label"
import { Switch } from "@/styles/default/ui/switch"

export default function SwitchCard() {
	const id = useId()

	return (
		<Label htmlFor={id}>
			<div className="flex w-[332px] items-center space-x-3">
				<div className="border-border has-data-[state=checked]:border-primary-border relative flex w-full items-start gap-2 rounded-xl border p-4">
					<Switch
						size="20"
						id={id}
						className="order-1"
						aria-describedby={`${id}-description`}
					/>
					<div className="grid grow gap-1">
						<Label htmlFor={id}>Allow edit access</Label>
						<p
							id={`${id}-description`}
							className="text-fg-tertiary text-xs font-normal">
							Enable public edit access all your docs.
						</p>
					</div>
				</div>
			</div>
		</Label>
	)
}
