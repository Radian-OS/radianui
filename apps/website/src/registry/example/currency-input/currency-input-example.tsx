import React from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

function CurrencyInputExample() {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>Currency Amout</Label>
			<CurrencyInput className="md:w-80" placeholder="Enter Amount Here" />
		</div>
	)
}

export default CurrencyInputExample
