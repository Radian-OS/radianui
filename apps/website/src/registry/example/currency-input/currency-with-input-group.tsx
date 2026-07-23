import React from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { InputAddon, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function CurrencyWithInputGroup() {
	return (
		<div className="flex w-full max-w-80 flex-col gap-4">
			<div className="flex w-full flex-col gap-1.5">
				<Label htmlFor="ing-usd">US Dollars</Label>
				<InputGroup>
					<InputAddon>$</InputAddon>
					<CurrencyInput id="ing-usd" placeholder="Enter Amount Here" />
					<InputAddon>USD</InputAddon>
				</InputGroup>
			</div>
			<div className="flex w-full flex-col gap-1.5">
				<Label htmlFor="ing-eur">Euros</Label>
				<InputGroup>
					<InputAddon>€</InputAddon>
					<CurrencyInput id="ing-eur" placeholder="Enter Amount Here" />
					<InputAddon>EUR</InputAddon>
				</InputGroup>
			</div>
			<div className="flex w-full flex-col gap-1.5">
				<Label htmlFor="ing-pou">Pounds</Label>
				<InputGroup>
					<InputAddon>£</InputAddon>
					<CurrencyInput id="ing-pou" placeholder="Enter Amount Here" />
					<InputAddon>GBP</InputAddon>
				</InputGroup>
			</div>
			<div className="flex w-full flex-col gap-1.5">
				<Label htmlFor="ing-inr">Indian Rupees</Label>
				<InputGroup>
					<InputAddon>₹</InputAddon>
					<CurrencyInput id="ing-inr" placeholder="Enter Amount Here" />
					<InputAddon>INR</InputAddon>
				</InputGroup>
			</div>
		</div>
	)
}
