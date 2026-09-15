"use client"

import { useMemo, useState } from "react"
import { type CountryCode, Flag } from "@radianui/flags"
import { ArrowDownUp } from "lucide-react"
import { IconButton } from "@/registry/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

const currencies = [
	{
		code: "USD",
		country: "US",
		countryName: "United States",
		name: "US Dollar",
		symbol: "$",
		decimals: 2,
	},
	{
		code: "EUR",
		country: "DE",
		countryName: "Germany",
		name: "Euro",
		symbol: "€",
		decimals: 2,
	},
	{
		code: "INR",
		country: "IN",
		countryName: "India",
		name: "Indian Rupee",
		symbol: "₹",
		decimals: 2,
	},
	{
		code: "JPY",
		country: "JP",
		countryName: "Japan",
		name: "Japanese Yen",
		symbol: "¥",
		decimals: 0,
	},
	{
		code: "CNY",
		country: "CN",
		countryName: "China",
		name: "Chinese Yuan",
		symbol: "¥",
		decimals: 2,
	},
] as const satisfies ReadonlyArray<{
	code: string
	country: CountryCode
	countryName: string
	name: string
	symbol: string
	decimals: number
}>

type CurrencyCode = (typeof currencies)[number]["code"]
type Currency = (typeof currencies)[number]

const usdRates: Record<CurrencyCode, number> = {
	USD: 1,
	EUR: 0.92,
	INR: 83.1,
	JPY: 149.5,
	CNY: 7.24,
}

function getCurrency(code: CurrencyCode) {
	return currencies.find((currency) => currency.code === code) ?? currencies[0]
}

function getRate(from: CurrencyCode, to: CurrencyCode) {
	return usdRates[to] / usdRates[from]
}

function convertAmount(amount: string, rate: number, decimals: number) {
	if (!amount) return ""

	const numericAmount = Number(amount)
	if (!Number.isFinite(numericAmount)) return ""

	return (numericAmount * rate).toFixed(decimals)
}

type CurrencyFieldProps = {
	amount: string
	currency: Currency
	id: string
	label: string
	onAmountChange: (value: string | undefined) => void
	onCurrencyChange: (value: CurrencyCode) => void
}

function CurrencyField({
	amount,
	currency,
	id,
	label,
	onAmountChange,
	onCurrencyChange,
}: CurrencyFieldProps) {
	return (
		<div className="grid gap-2">
			<Label htmlFor={id}>{label}</Label>
			<InputWrapper
				size="48"
				className="h-auto flex-col items-stretch gap-4 rounded-xl p-4">
				<Select
					value={currency.code}
					onValueChange={(value) => onCurrencyChange(value as CurrencyCode)}>
					<SelectTrigger
						aria-label={`${label} currency`}
						className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:border-transparent focus-visible:ring-0">
						<SelectValue>
							<span className="flex min-w-0 items-center gap-3 text-start">
								<Flag
									country={currency.country}
									shape="circle"
									size={40}
									className="size-10"
								/>
								<span className="grid min-w-0 gap-0.5">
									<span className="font-semibold">{currency.code}</span>
									<span className="text-fg-secondary truncate text-sm">
										{currency.countryName} · {currency.name}
									</span>
								</span>
							</span>
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{currencies.map((item) => (
							<SelectItem key={item.code} value={item.code}>
								<span className="flex items-center gap-2">
									<Flag country={item.country} shape="circle" size={28} />
									<span>
										{item.countryName} · {item.code}
									</span>
								</span>
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<CurrencyInput
					id={id}
					value={amount}
					prefix={`${currency.symbol} `}
					allowDecimals={currency.decimals > 0}
					decimalsLimit={currency.decimals}
					decimalScale={currency.decimals}
					groupSeparator=","
					decimalSeparator="."
					aria-label={`${label} amount in ${currency.name}`}
					onValueChange={onAmountChange}
					className="text-3xl leading-none font-semibold tracking-tight tabular-nums"
				/>
			</InputWrapper>
		</div>
	)
}

export default function FlagCurrencyConverter() {
	const [amount, setAmount] = useState("1000")
	const [sourceField, setSourceField] = useState<"from" | "to">("from")
	const [from, setFrom] = useState<CurrencyCode>("USD")
	const [to, setTo] = useState<CurrencyCode>("EUR")

	const fromCurrency = getCurrency(from)
	const toCurrency = getCurrency(to)
	const rate = getRate(from, to)
	const fromAmount = useMemo(
		() =>
			sourceField === "from"
				? amount
				: convertAmount(amount, 1 / rate, fromCurrency.decimals),
		[amount, fromCurrency.decimals, rate, sourceField]
	)
	const toAmount = useMemo(
		() =>
			sourceField === "to"
				? amount
				: convertAmount(amount, rate, toCurrency.decimals),
		[amount, rate, sourceField, toCurrency.decimals]
	)

	const formattedRate = rate.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 6,
	})

	const swapCurrencies = () => {
		setFrom(to)
		setTo(from)
		setSourceField((current) => (current === "from" ? "to" : "from"))
	}

	return (
		<Card className="w-full max-w-md gap-0 rounded-2xl py-0 shadow-md">
			<CardHeader className="border-soft border-b p-6">
				<CardTitle>Currency converter</CardTitle>
				<CardDescription>
					Convert between five currencies using hardcoded example rates.
				</CardDescription>
			</CardHeader>

			<CardContent className="grid gap-4 p-6">
				<CurrencyField
					id="currency-from"
					label="From"
					amount={fromAmount}
					currency={fromCurrency}
					onAmountChange={(value) => {
						setSourceField("from")
						setAmount(value ?? "")
					}}
					onCurrencyChange={setFrom}
				/>

				<div className="relative flex h-5 items-center justify-center">
					<div className="border-soft absolute inset-x-0 border-t" />
					<IconButton
						type="button"
						size="36"
						variant="outline"
						color="neutral"
						aria-label="Swap currencies"
						className="bg-bg hover:bg-fill1 active:bg-fill2 relative z-10 rounded-full"
						onClick={swapCurrencies}>
						<ArrowDownUp />
					</IconButton>
				</div>

				<CurrencyField
					id="currency-to"
					label="To"
					amount={toAmount}
					currency={toCurrency}
					onAmountChange={(value) => {
						setSourceField("to")
						setAmount(value ?? "")
					}}
					onCurrencyChange={setTo}
				/>

				<div className="bg-fill1 flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-sm">
					<span className="text-fg-secondary">Hardcoded demo rate</span>
					<span className="font-medium tabular-nums">
						1 {from} = {formattedRate} {to}
					</span>
				</div>
			</CardContent>
		</Card>
	)
}
