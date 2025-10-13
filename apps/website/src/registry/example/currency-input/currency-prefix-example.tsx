import React from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

function CurrencyPrefixExample() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1.5">
				<Label>US Dollars</Label>
				<InputWrapper className="md:w-80">
					<CurrencyInput prefix="$" placeholder="Enter Amount Here" />
					<span>USD</span>
				</InputWrapper>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label>Euros</Label>
				<InputWrapper className="md:w-80">
					<CurrencyInput placeholder="Enter Amount Here" />
					<span>EUR</span>
				</InputWrapper>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label>Pounds</Label>
				<InputWrapper className="md:w-80">
					<CurrencyInput placeholder="Enter Amount Here" />
					<span>GBP</span>
				</InputWrapper>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label>Indian Rupees</Label>
				<InputWrapper className="md:w-80">
					<CurrencyInput placeholder="Enter Amount Here" />
					<span>INR</span>
				</InputWrapper>
			</div>
		</div>
	)
}

export default CurrencyPrefixExample
