import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

export default function CurrencyDecimalSeparatorsExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="ds-1">Separator (.)</Label>
				<CurrencyInput id="ds-1" prefix="$" decimalSeparator="." className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="ds-2">Separator (/)</Label>
				<CurrencyInput id="ds-2" prefix="$" decimalSeparator="/" className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="ds-3">Separator (!)</Label>
				<CurrencyInput id="ds-3" prefix="$" decimalSeparator="!" className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="ds-4">Separator (`)</Label>
				<CurrencyInput id="ds-4" prefix="$" decimalSeparator="`" className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="ds-5">Separator (&apos;)</Label>
				<CurrencyInput id="ds-5" prefix="$" decimalSeparator="'" className="md:w-80" placeholder="Enter Amount Here" />
			</div>
		</div>
	)
}
