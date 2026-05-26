"use client"

import { useId, useState } from "react"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"

export default function CheckboxChecked() {
	const id = useId()
	const [checked, setChecked] = useState(true)
	return (
		<div className="flex items-center gap-2">
			<Checkbox
				id={id}
				checked={checked}
				onCheckedChange={(v) => setChecked(v === true)}
			/>
			<Label htmlFor={id}>Keep me signed in</Label>
		</div>
	)
}
