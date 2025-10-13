import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

export default function CurrencyDecimalSeparatorsExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Separator .</Label>
				<CurrencyInput prefix="$" decimalSeparator="." className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Separator /</Label>
				<CurrencyInput prefix="$" decimalSeparator="/" className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Separator !</Label>
				<CurrencyInput prefix="$" decimalSeparator="!" className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Separator `</Label>
				<CurrencyInput prefix="$" decimalSeparator="`" className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Separator &apos;</Label>
				<CurrencyInput prefix="$" decimalSeparator="'" className="md:w-80" placeholder="Enter Amount Here" />
			</div>
		</div>
	)
}
