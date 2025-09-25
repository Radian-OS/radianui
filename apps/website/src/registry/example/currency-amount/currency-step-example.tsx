import React from "react"
import { CurrencyInputField } from "@/registry/ui/currency-amount"
import { Label } from "@/registry/ui/label"

function CurrencyStepExample() {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>Please enter a value: (Press up/down)</Label>
			<CurrencyInputField step={5} className="md:w-80" placeholder="Enter Amount Here" />
		</div>
	)
}

export default CurrencyStepExample
