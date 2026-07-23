import React from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

export default function CurrencyWithPrefix() {
	return (
		<div className="flex w-full max-w-80 flex-col gap-4">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="us-dollars">US Dollars</Label>
				<CurrencyInput
					id="us-dollars"
					prefix="$"
					placeholder="Enter Amount Here"
				/>
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="euros">Euros</Label>
				<CurrencyInput id="euros" prefix="€" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="pounds">Pounds</Label>
				<CurrencyInput id="pounds" prefix="£" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="indian-rupees">Indian Rupees</Label>
				<CurrencyInput
					id="indian-rupees"
					prefix="₹"
					placeholder="Enter Amount Here"
				/>
			</div>
		</div>
	)
}
