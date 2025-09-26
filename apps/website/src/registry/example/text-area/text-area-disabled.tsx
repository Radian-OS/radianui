import { useId } from "react"
import { Label } from "@/registry/ui/label"
import { TextArea } from "@/registry/ui/text-area"

export default function TextAreaDisabled() {
	const id = useId()
	return (
		<div className="group flex w-full max-w-md flex-col gap-1.5">
			<Label htmlFor={id} className="group-has-disabled:text-fg-disabled">
				Disabled
			</Label>
			<TextArea id={id} disabled placeholder="Disabled Text Area" />
		</div>
	)
}
