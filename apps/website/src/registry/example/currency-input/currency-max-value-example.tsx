import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

export default function CurrencyMaxValueExample() {
	return (
		<div className="flex flex-col items-start justify-center gap-1.5">
			<Label>Enter a value (max $9999)</Label>
			<CurrencyInput prefix="$" placeholder="Enter Amount Here" className="md:w-80" maxLength={4} />
		</div>
	)
}
