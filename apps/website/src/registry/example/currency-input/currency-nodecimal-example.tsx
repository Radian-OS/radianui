import React from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

function CurrencyNoDecimalExample() {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>Please enter a value:</Label>
			<CurrencyInput allowDecimals={false} prefix="€" className="md:w-80" placeholder="Enter Amount Here" />
		</div>
	)
}

export default CurrencyNoDecimalExample
