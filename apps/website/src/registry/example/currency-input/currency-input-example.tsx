import React from "react"
import { CurrencyInput } from "@/styles/default/ui/currency-input"
import { Label } from "@/styles/default/ui/label"

function CurrencyInputExample() {
	return (
		<div className="flex flex-col gap-1.5">
			<Label htmlFor="eg-1">Currency Amount</Label>
			<CurrencyInput
				id="eg-1"
				className="md:w-80"
				placeholder="Enter Amount Here"
			/>
		</div>
	)
}

export default CurrencyInputExample
