import React from "react"
import { CurrencyInputField } from "@/registry/ui/currency-amount"
import { Label } from "@/registry/ui/label"

function CurrencyInputExample() {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>Currency Amout</Label>
			<CurrencyInputField className="md:w-80" placeholder="Enter Amount Here" />
		</div>
	)
}

export default CurrencyInputExample
