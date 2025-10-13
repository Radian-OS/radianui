import React from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

function CurrencyStepExample() {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>Please enter a value: (Press up/down)</Label>
			<CurrencyInput prefix="$" step={5} className="md:w-80" placeholder="Enter Amount Here" />
		</div>
	)
}

export default CurrencyStepExample
