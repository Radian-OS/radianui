import React from "react"
import { Label } from "@/styles/default/ui/label"
import { Switch } from "@/styles/default/ui/switch"

export default function SquareSwitch() {
	const id = React.useId()

	return (
		<div className="flex items-center space-x-2">
			<Switch id={id} shape="square" />
			<Label htmlFor={id}>Turn on notifications</Label>
		</div>
	)
}
