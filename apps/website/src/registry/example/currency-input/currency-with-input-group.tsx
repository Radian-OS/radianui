import React from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { InputAddon, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function CurrencyWithInputGroup() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="ing-usd">US Dollars</Label>
				<InputGroup className="md:w-80">
					<InputAddon className="text-fg-tertiary">$</InputAddon>
					<CurrencyInput id="ing-usd" placeholder="Enter Amount Here" />
					<InputAddon className="text-fg-tertiary">USD</InputAddon>
				</InputGroup>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="ing-eur">Euros</Label>
				<InputGroup className="md:w-80">
					<InputAddon className="text-fg-tertiary">€</InputAddon>
					<CurrencyInput id="ing-eur" placeholder="Enter Amount Here" />
					<InputAddon className="text-fg-tertiary">EUR</InputAddon>
				</InputGroup>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="ing-pou">Pounds</Label>
				<InputGroup className="md:w-80">
					<InputAddon className="text-fg-tertiary">£</InputAddon>
					<CurrencyInput id="ing-pou" placeholder="Enter Amount Here" />
					<InputAddon className="text-fg-tertiary">GBP</InputAddon>
				</InputGroup>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="ing-inr">Indian Rupees</Label>
				<InputGroup className="md:w-80">
					<InputAddon className="text-fg-tertiary">₹</InputAddon>
					<CurrencyInput id="ing-inr" placeholder="Enter Amount Here" />
					<InputAddon className="text-fg-tertiary">INR</InputAddon>
				</InputGroup>
			</div>
		</div>
	)
}
