import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"

export default function CurrencyLocaleConfig() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>US Dollar</Label>
				<CurrencyInput intlConfig={{ locale: "en-US", currency: "USD" }} placeholder="Enter Amount here" className="md:w-80" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>British Pound</Label>
				<CurrencyInput intlConfig={{ locale: "en-GB", currency: "GBP" }} placeholder="Enter Amount here" className="md:w-80" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Japanese Yen</Label>
				<CurrencyInput intlConfig={{ locale: "ja-JP", currency: "JPY" }} placeholder="Enter Amount here" className="md:w-80" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Indian Rupee</Label>
				<CurrencyInput intlConfig={{ locale: "hi-IN", currency: "INR" }} placeholder="Enter Amount here" className="md:w-80" />
			</div>
			<div className="flex flex-col items-start justify-center gap-1.5">
				<Label>Chinese Yuan</Label>
				<CurrencyInput intlConfig={{ locale: "zh-CN", currency: "CNY" }} placeholder="Enter Amount here" className="md:w-80" />
			</div>
		</div>
	)
}
