import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

export default function CurrencyDecimalSeparatorsExample() {
	return (
		<div className="flex w-full max-w-80 flex-col items-center justify-center gap-4">
			<div className="flex w-full flex-col items-start justify-center gap-1.5">
				<Label htmlFor="ds-1">Decimal Separator (.)</Label>
				<CurrencyInput
					id="ds-1"
					prefix="$"
					decimalSeparator="."
					placeholder="Enter Amount Here"
				/>
			</div>
			<div className="flex w-full flex-col items-start justify-center gap-1.5">
				<Label htmlFor="ds-2">Decimal Separator (,)</Label>
				<CurrencyInput
					id="ds-2"
					prefix="$"
					decimalSeparator=","
					groupSeparator="."
					placeholder="Enter Amount Here"
				/>
			</div>
		</div>
	)
}
