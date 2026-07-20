import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

export default function CurrencyLocaleConfig() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="locale1">US Dollar</Label>
				<CurrencyInput
					id="locale1"
					intlConfig={{ locale: "en-US", currency: "USD" }}
					placeholder="Enter Amount here"
				/>
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="locale2">British Pound</Label>
				<CurrencyInput
					id="locale2"
					intlConfig={{ locale: "en-GB", currency: "GBP" }}
					placeholder="Enter Amount here"
				/>
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="locale3">Japanese Yen</Label>
				<CurrencyInput
					id="locale3"
					intlConfig={{ locale: "ja-JP", currency: "JPY" }}
					placeholder="Enter Amount here"
				/>
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="locale4">Indian Rupee</Label>
				<CurrencyInput
					id="locale4"
					intlConfig={{ locale: "hi-IN", currency: "INR" }}
					placeholder="Enter Amount here"
				/>
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label htmlFor="locale5">Chinese Yuan</Label>
				<CurrencyInput
					id="locale5"
					intlConfig={{ locale: "zh-CN", currency: "CNY" }}
					placeholder="Enter Amount here"
				/>
			</div>
		</div>
	)
}
