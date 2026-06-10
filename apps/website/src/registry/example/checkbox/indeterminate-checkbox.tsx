"use client"

import React, { useId, useState } from "react"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Divider } from "@/registry/ui/divider"
import { Label } from "@/registry/ui/label"

const FRAMEWORKS = [
	{ id: "react", label: "React" },
	{ id: "vue", label: "Vue" },
	{ id: "svelte", label: "Svelte" },
	{ id: "angular", label: "Angular" },
]

export default function CheckboxGroup() {
	const selectAllId = useId()
	const [selected, setSelected] = useState<string[]>([])

	const allChecked = selected.length === FRAMEWORKS.length
	const someChecked = selected.length > 0 && !allChecked

	const toggleAll = () => {
		setSelected(allChecked ? [] : FRAMEWORKS.map((f) => f.id))
	}

	const toggle = (id: string) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
		)
	}

	return (
		<div className="bg-bg border-soft w-90 rounded-lg border">
			<div className="p-4 text-sm font-medium">
				Which frameworks do you use?
			</div>
			<Divider />

			<div className="flex flex-col gap-3 p-4">
				<div className="flex items-center gap-2">
					<Checkbox
						id={selectAllId}
						checked={allChecked ? true : someChecked ? "indeterminate" : false}
						onCheckedChange={toggleAll}
					/>
					<Label htmlFor={selectAllId} className="font-medium">
						Select all
					</Label>
				</div>

				<div className="flex flex-col gap-3">
					{FRAMEWORKS.map((framework) => (
						<div key={framework.id} className="flex items-center gap-2">
							<Checkbox
								id={framework.id}
								checked={selected.includes(framework.id)}
								onCheckedChange={() => toggle(framework.id)}
							/>
							<Label
								htmlFor={framework.id}
								className="text-fg-secondary font-normal">
								{framework.label}
							</Label>
						</div>
					))}
				</div>
			</div>
			<Divider />

			<div className="flex items-center justify-end gap-2 p-4">
				<Button
					variant="outline"
					color="neutral"
					onClick={() => setSelected([])}>
					Clear
				</Button>
				<Button variant="strong" color="primary">
					Submit
				</Button>
			</div>
		</div>
	)
}
