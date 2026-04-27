"use client"

import React, { useState } from "react"
import { useId } from "react"
import { Checkbox } from "@/styles/default/ui/checkbox"
import { Label } from "@/styles/default/ui/label"

export default function CheckboxCard() {
	const id = useId()
	const [checked, setChecked] = useState(false)

	return (
		<Label
			htmlFor={id}
			className="border-soft bg-bg has-[[data-state=checked]]:border-primary-border has-[[data-state=checked]]:bg-primary-accent flex items-start gap-3 rounded-lg border p-4">
			<Checkbox
				id={id}
				checked={checked}
				onCheckedChange={(v) => setChecked(v === true)}
				aria-label="Allow edit access"
			/>
			<div className="flex flex-col gap-1">
				<Label htmlFor={id}>Allow Edit Access</Label>
				<span className="text-fg-tertiary text-normal text-sm">
					Enable public edit access all your docs.
				</span>
			</div>
		</Label>
	)
}
