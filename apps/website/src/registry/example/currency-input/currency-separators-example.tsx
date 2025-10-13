import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

export default function CurrencySeparatorsExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Separator 1</Label>
				<CurrencyInput prefix="$" groupSeparator="," className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Separator 2</Label>
				<CurrencyInput prefix="$" groupSeparator=";" className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Separator 3</Label>
				<CurrencyInput prefix="$" groupSeparator="," className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Separator 4</Label>
				<CurrencyInput prefix="$" groupSeparator="'" className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Separator 5</Label>
				<CurrencyInput prefix="$" groupSeparator="`" className="md:w-80" placeholder="Enter Amount Here" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Separator Disabled</Label>
				<CurrencyInput prefix="$" disableGroupSeparators className="md:w-80" placeholder="Enter Amount Here" />
			</div>
		</div>
	)
}
