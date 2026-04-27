import { CurrencyInput } from "@/styles/default/ui/currency-input"
import { Label } from "@/styles/default/ui/label"

export default function CurrencyDecimalSeparatorsExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="ds-1">Separator (.)</Label>
				<CurrencyInput
					id="ds-1"
					prefix="$"
					decimalSeparator="."
					className="md:w-80"
					placeholder="Enter Amount Here"
				/>
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="ds-2">Separator (,)</Label>
				<CurrencyInput
					id="ds-2"
					prefix="$"
					decimalSeparator=","
					groupSeparator="."
					className="md:w-80"
					placeholder="Enter Amount Here"
				/>
			</div>
		</div>
	)
}
