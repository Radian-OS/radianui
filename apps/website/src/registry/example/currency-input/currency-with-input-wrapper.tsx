import React from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function CurrencyWithInputWrapper() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="inw-usd">US Dollars</Label>
				<InputWrapper className="[&_span]:text-fg-tertiary md:w-80">
					<span>$</span>
					<CurrencyInput id="inw-usd" placeholder="Enter Amount Here" />
					<span>USD</span>
				</InputWrapper>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="inw-eu">Euros</Label>
				<InputWrapper className="[&_span]:text-fg-tertiary md:w-80">
					<span>€</span>
					<CurrencyInput id="inw-eu" placeholder="Enter Amount Here" />
					<span>EUR</span>
				</InputWrapper>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="inw-po">Pounds</Label>
				<InputWrapper className="[&_span]:text-fg-tertiary md:w-80">
					<span>£</span>
					<CurrencyInput id="inw-po" placeholder="Enter Amount Here" />
					<span>GBP</span>
				</InputWrapper>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="inw-inr">Indian Rupees</Label>
				<InputWrapper className="[&_span]:text-fg-tertiary md:w-80">
					<span>₹</span>
					<CurrencyInput id="inw-inr" placeholder="Enter Amount Here" />
					<span>INR</span>
				</InputWrapper>
			</div>
		</div>
	)
}
