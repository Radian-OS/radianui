import React from "react"
import { Button } from "@/styles/default/ui/button"
import { Input } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"
import { TextArea } from "@/styles/default/ui/text-area"

const ReportCard = () => {
	return (
		<div className="bg-bg border-border flex w-full flex-col gap-4 rounded-2xl border p-5">
			<span>
				<p className="text-fg text-base font-medium">Report an issue</p>
				<p className="text-fg-secondary text-sm font-normal">
					What area are you having problems with?
				</p>
			</span>
			<span className="flex gap-3">
				<span className="flex flex-col gap-1.5">
					<Label>Area</Label>
					<Input placeholder="Billing" />
				</span>
				<span className="flex flex-col gap-1.5">
					<Label>Security Level</Label>
					<Input placeholder="Severity 2" />
				</span>
			</span>
			<span className="flex flex-col gap-1.5">
				<Label>Description</Label>
				<TextArea
					rows={4}
					placeholder="Please include all information relevant to your issue."
				/>
			</span>
			<span className="flex justify-end gap-2">
				<Button variant="outline" color="neutral">
					Cancel
				</Button>
				<Button>Submit</Button>
			</span>
		</div>
	)
}

export default ReportCard
