import React from "react"
import { Label } from "@/registry/ui/label"
import { TextArea } from "@/registry/ui/text-area"

const TextAreaPreview = () => {
	const id = React.useId()

	return (
		<div className="flex w-full max-w-md flex-col gap-1.5">
			<Label htmlFor={id}>Leave a message</Label>
			<TextArea id={id} placeholder="Type your message here..." />
		</div>
	)
}

export default TextAreaPreview
