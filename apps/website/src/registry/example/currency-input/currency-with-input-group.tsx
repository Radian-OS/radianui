import React from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { InputAddon, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function CurrencyWithInputGroup() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1.5">
				<Label>US Dollars</Label>
				<InputGroup className="md:w-80">
					<InputAddon className="text-fg-tertiary">$</InputAddon>
					<CurrencyInput placeholder="Enter Amount Here" />
					<InputAddon className="text-fg-tertiary">USD</InputAddon>
				</InputGroup>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label>Euros</Label>
				<InputGroup className="md:w-80">
					<InputAddon className="text-fg-tertiary">€</InputAddon>
					<CurrencyInput placeholder="Enter Amount Here" />
					<InputAddon className="text-fg-tertiary">EUR</InputAddon>
				</InputGroup>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label>Pounds</Label>
				<InputGroup className="md:w-80">
					<InputAddon className="text-fg-tertiary">£</InputAddon>
					<CurrencyInput placeholder="Enter Amount Here" />
					<InputAddon className="text-fg-tertiary">GBP</InputAddon>
				</InputGroup>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label>Indian Rupees</Label>
				<InputGroup className="md:w-80">
					<InputAddon className="text-fg-tertiary">₹</InputAddon>
					<CurrencyInput placeholder="Enter Amount Here" />
					<InputAddon className="text-fg-tertiary">INR</InputAddon>
				</InputGroup>
			</div>
		</div>
	)
}
