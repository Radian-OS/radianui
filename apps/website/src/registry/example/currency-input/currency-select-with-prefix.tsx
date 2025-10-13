import { useState } from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

export default function CurrencySelectExample() {
	type domainOption = "USD" | "EUR" | "GBP"
	type currencyOption = "$" | "€" | "£"
	const [currency, setCurrency] = useState<currencyOption>("$")
	const [domain, setDomain] = useState<domainOption>("USD")

	function handleCurrencyChange(value: domainOption) {
		setDomain(value)
		if (value === "USD") {
			setCurrency("$")
		} else if (value === "EUR") {
			setCurrency("€")
		} else if (value === "GBP") {
			setCurrency("£")
		}
	}

	return (
		<div className="flex flex-col gap-1.5">
			<Label htmlFor="c-s-p">Currency Select</Label>
			<div className="flex">
				<InputGroup className="md:w-80">
					<CurrencyInput id="c-s-p" prefix={currency} className="rounded-r-none border-r-0 focus-within:border-r md:w-fit" placeholder="Enter Amount Here" type="url" />
					<Select value={domain} onValueChange={handleCurrencyChange}>
						<SelectTrigger className="w-fit rounded-l-none">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="EUR">EUR</SelectItem>
							<SelectItem value="USD">USD</SelectItem>
							<SelectItem value="GBP">GBP</SelectItem>
						</SelectContent>
					</Select>
				</InputGroup>
			</div>
		</div>
	)
}
