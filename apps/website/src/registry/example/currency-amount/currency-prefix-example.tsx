import React from "react"
import { CurrencyInputField } from "@/registry/ui/currency-amount"
import { Label } from "@/registry/ui/label"

function CurrencyPrefixExample() {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>Please Enter a Value:</Label>
			<CurrencyInputField prefix="$" className="md:w-80" placeholder="Enter Amount Here" />
		</div>
	)
}

export default CurrencyPrefixExample
