import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

export default function CurrencyDecimalsLimit() {
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="2-dl">2 Decimals - Default</Label>
				<CurrencyInput id="2-dl" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="4-dl">4 Decimals</Label>
				<CurrencyInput
					id="4-dl"
					placeholder="Enter Amount Here"
					decimalsLimit={4}
				/>
			</div>
		</div>
	)
}
