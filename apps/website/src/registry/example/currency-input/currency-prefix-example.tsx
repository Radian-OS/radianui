import React from "react"
import { CurrencyInput } from "@/styles/default/ui/currency-input"
import { InputWrapper } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"

function CurrencyPrefixExample() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="c-1">US Dollars</Label>
				<InputWrapper id="c-1" className="[&_span]:text-fg-tertiary md:w-80">
					<span>$</span>
					<CurrencyInput
						className="focus-visible:border-t-1 focus-visible:border-b-1 rounded-none border-l-0 border-r-0 px-0 focus-visible:ring-0 focus-visible:ring-transparent md:w-80"
						placeholder="Enter Amount Here"
					/>
					<span>USD</span>
				</InputWrapper>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="c-2">Euros</Label>
				<InputWrapper id="c-2" className="[&_span]:text-fg-tertiary md:w-80">
					<span>€</span>
					<CurrencyInput
						className="focus-visible:border-t-1 focus-visible:border-b-1 rounded-none border-l-0 border-r-0 px-0 focus-visible:ring-0 focus-visible:ring-transparent md:w-80"
						placeholder="Enter Amount Here"
					/>
					<span>EUR</span>
				</InputWrapper>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="c-3">Pounds</Label>
				<InputWrapper id="c-3" className="[&_span]:text-fg-tertiary md:w-80">
					<span>£</span>
					<CurrencyInput
						className="focus-visible:border-t-1 focus-visible:border-b-1 rounded-none border-l-0 border-r-0 px-0 focus-visible:ring-0 focus-visible:ring-transparent md:w-80"
						placeholder="Enter Amount Here"
					/>
					<span>GBP</span>
				</InputWrapper>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="c-4">Indian Rupees</Label>
				<InputWrapper id="c-4" className="[&_span]:text-fg-tertiary md:w-80">
					<span>₹</span>
					<CurrencyInput
						className="focus-visible:border-t-1 focus-visible:border-b-1 rounded-none border-l-0 border-r-0 px-0 focus-visible:ring-0 focus-visible:ring-transparent"
						placeholder="Enter Amount Here"
					/>
					<span>INR</span>
				</InputWrapper>
			</div>
		</div>
	)
}

export default CurrencyPrefixExample
