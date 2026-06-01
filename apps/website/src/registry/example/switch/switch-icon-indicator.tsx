"use client"

import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Switch } from "@/registry/ui/switch"

export default function Component() {
	const id = React.useId()
	const [checked, setChecked] = React.useState(false)

	const toggleSwitch = () => setChecked((prev) => !prev)

	return (
		<div
			className="group inline-flex items-center gap-2"
			data-state={checked ? "checked" : "unchecked"}>
			<span
				id={`${id}-off`}
				className="group-data-[state=checked]:text-fg-tertiary flex-1 cursor-pointer text-right text-sm font-medium"
				aria-controls={id}
				onClick={() => setChecked(false)}>
				<IconSlot slot="moon" size={20} aria-hidden="true" />
			</span>
			<Switch
				id={id}
				checked={checked}
				onCheckedChange={toggleSwitch}
				aria-labelledby={`${id}-off ${id}-on`}
				aria-label="Toggle between dark and light mode"
			/>
			<span
				id={`${id}-on`}
				className="group-data-[state=unchecked]:text-fg-tertiary flex-1 cursor-pointer text-left text-sm font-medium"
				aria-controls={id}
				onClick={() => setChecked(true)}>
				<IconSlot slot="sun" size={20} aria-hidden="true" />
			</span>
		</div>
	)
}
