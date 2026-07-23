import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

export default function CurrencySeparatorsExample() {
	return (
		<div className="flex w-full max-w-80 flex-col items-center justify-center gap-4">
			<div className="flex w-full flex-col items-start justify-center gap-1.5">
				<Label htmlFor="cs-1">Group Separator (,)</Label>
				<CurrencyInput
					id="cs-1"
					prefix="$"
					groupSeparator=","
					placeholder="Enter Amount Here"
				/>
			</div>
			<div className="flex w-full flex-col items-start justify-center gap-1.5">
				<Label htmlFor="cs-2">Group Separator (.)</Label>
				<CurrencyInput
					id="cs-2"
					prefix="$"
					groupSeparator="."
					decimalSeparator=","
					placeholder="Enter Amount Here"
				/>
			</div>
			<div className="flex w-full flex-col items-start justify-center gap-1.5">
				<Label htmlFor="cs-5">Group Separator Disabled</Label>
				<CurrencyInput
					id="cs-5"
					prefix="$"
					disableGroupSeparators
					placeholder="Enter Amount Here"
				/>
			</div>
		</div>
	)
}
