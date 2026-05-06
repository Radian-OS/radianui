import React from "react"
import { Button } from "@/styles/default/ui/button"
import { Checkbox } from "@/styles/default/ui/checkbox"
import { Label } from "@/styles/default/ui/label"

export default function CheckboxGroup() {
	return (
		<div className="bg-bg border-soft w-full max-w-60 rounded-lg border p-4">
			<div className="mb-3 text-sm font-medium">
				Pick your favorite hobbies{" "}
			</div>
			<div className="flex flex-col gap-3">
				<div className="flex items-center gap-2">
					<Checkbox id="eating" value="eating" />
					<Label htmlFor="eating" className="text-fg-secondary font-normal">
						Eating
					</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="reading" value="reading" />
					<Label htmlFor="reading" className="text-fg-secondary font-normal">
						Reading
					</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="sleeping" value="sleeping" />
					<Label htmlFor="sleeping" className="text-fg-secondary font-normal">
						Sleeping
					</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="walking" value="walking" />
					<Label htmlFor="walking" className="text-fg-secondary font-normal">
						Walking
					</Label>
				</div>
			</div>
			<div className="mt-5 flex items-center justify-end gap-2">
				<Button variant="outline" color="neutral">
					Clear
				</Button>
				<Button variant="strong" color="primary">
					Submit
				</Button>
			</div>
		</div>
	)
}
