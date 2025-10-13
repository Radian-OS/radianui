import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

export default function CurrencyDecimalsLimit() {
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="2-dl">Currency Input (2 Decimal Places)</Label>
				<CurrencyInput id="2-dl" className="md:w-80" placeholder="Enter Amount Here" decimalsLimit={2} />
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="3-dl">Currency Input (3 Decimal Places)</Label>
				<CurrencyInput id="3-dl" className="md:w-80" placeholder="Enter Amount Here" decimalsLimit={3} />
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="4-dl">Currency Input (4 Decimal Places)</Label>
				<CurrencyInput id="4-dl" className="md:w-80" placeholder="Enter Amount Here" decimalsLimit={4} />
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="5-dl">Currency Input (5 Decimal Places)</Label>
				<CurrencyInput id="5-dl" className="md:w-80" placeholder="Enter Amount Here" decimalsLimit={5} />
			</div>
		</div>
	)
}
