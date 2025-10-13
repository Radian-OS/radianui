"use client"

import { useState } from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { InputGroup, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

const currencies = [
	{ value: "USD", prefix: "$", label: "USD", locale: "en-US" },
	{ value: "EUR", prefix: "€", label: "EUR", locale: "de-DE" },
	{ value: "GBP", prefix: "£", label: "GBP", locale: "en-GB" },
	{ value: "INR", prefix: "₹", label: "INR", locale: "en-IN" },
]

export default function CurrencyWithSelect() {
	const [selectedCurrency, setSelectedCurrency] = useState("USD")
	const [amount, setAmount] = useState("")

	const currentCurrency = currencies.find((currency) => currency.value === selectedCurrency) || currencies[0]

	return (
		<div className="flex flex-col gap-1.5">
			<Label>Select Currency</Label>
			<InputGroup className="md:w-80">
				<InputWrapper className="rounded-r-none border-r-0 focus-within:border-r">
					<span className="text-fg-tertiary">{currentCurrency.prefix}</span>
					<CurrencyInput placeholder="Enter Amount Here" value={amount} onValueChange={(value) => setAmount(value ?? "")} />
				</InputWrapper>
				<Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
					<SelectTrigger className="w-fit rounded-l-none">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{currencies.map((currency) => (
							<SelectItem key={currency.value} value={currency.value}>
								{currency.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</InputGroup>
		</div>
	)
}
