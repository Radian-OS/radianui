"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { type CountryCode, Flag } from "@radianui/flags"
import { ArrowLeftRight, RefreshCw } from "lucide-react"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertTitle,
} from "@/registry/ui/alert"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { Label } from "@/registry/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

const currencies = [
	{ code: "GBP", name: "British pound", symbol: "£", country: "GB" },
	{ code: "USD", name: "US dollar", symbol: "$", country: "US" },
	{ code: "INR", name: "Indian rupee", symbol: "₹", country: "IN" },
	{ code: "JPY", name: "Japanese yen", symbol: "¥", country: "JP" },
	{ code: "CNY", name: "Chinese yuan", symbol: "¥", country: "CN" },
	{ code: "AUD", name: "Australian dollar", symbol: "A$", country: "AU" },
	{ code: "CAD", name: "Canadian dollar", symbol: "C$", country: "CA" },
	{ code: "CHF", name: "Swiss franc", symbol: "CHF ", country: "CH" },
] as const satisfies ReadonlyArray<{
	code: string
	name: string
	symbol: string
	country: CountryCode
}>

type CurrencyCode = (typeof currencies)[number]["code"]
type RateStatus = "loading" | "success" | "stale" | "error"

type RateData = {
	date: string
	base: CurrencyCode
	quote: CurrencyCode
	rate: number
}

const refreshInterval = 15 * 60 * 1000
const rateCachePrefix = "radian-currency-rate"

function getCurrency(code: CurrencyCode) {
	return currencies.find((currency) => currency.code === code) ?? currencies[0]
}

function isRateData(value: unknown): value is RateData {
	if (!value || typeof value !== "object") return false

	const rate = value as Record<string, unknown>
	return (
		typeof rate.date === "string" &&
		typeof rate.base === "string" &&
		typeof rate.quote === "string" &&
		typeof rate.rate === "number" &&
		Number.isFinite(rate.rate)
	)
}

function readCachedRate(base: CurrencyCode, quote: CurrencyCode) {
	try {
		const cached = window.localStorage.getItem(
			`${rateCachePrefix}:${base}:${quote}`
		)
		if (!cached) return null

		const parsed: unknown = JSON.parse(cached)
		return isRateData(parsed) ? parsed : null
	} catch {
		return null
	}
}

function writeCachedRate(rate: RateData) {
	try {
		window.localStorage.setItem(
			`${rateCachePrefix}:${rate.base}:${rate.quote}`,
			JSON.stringify(rate)
		)
	} catch {
		// The converter still works when storage is unavailable.
	}
}

export default function FlagCurrencyConverter() {
	const [amount, setAmount] = useState("1000")
	const [from, setFrom] = useState<CurrencyCode>("GBP")
	const [to, setTo] = useState<CurrencyCode>("USD")
	const [rateData, setRateData] = useState<RateData | null>(null)
	const [status, setStatus] = useState<RateStatus>("loading")

	const fromCurrency = getCurrency(from)
	const toCurrency = getCurrency(to)
	const currentRate =
		rateData?.base === from && rateData.quote === to ? rateData : null

	const loadRate = useCallback(
		async (signal?: AbortSignal) => {
			if (from === to) {
				setRateData({
					date: new Date().toISOString().slice(0, 10),
					base: from,
					quote: to,
					rate: 1,
				})
				setStatus("success")
				return
			}

			setStatus("loading")

			try {
				const response = await fetch(
					`https://api.frankfurter.dev/v2/rate/${from.toLowerCase()}/${to.toLowerCase()}`,
					{ signal }
				)

				if (!response.ok) throw new Error("Unable to load the exchange rate")

				const result: unknown = await response.json()
				if (!isRateData(result))
					throw new Error("Invalid exchange-rate response")

				setRateData(result)
				writeCachedRate(result)
				setStatus("success")
			} catch (error) {
				if (error instanceof DOMException && error.name === "AbortError") return

				const cachedRate = readCachedRate(from, to)
				if (cachedRate) {
					setRateData(cachedRate)
					setStatus("stale")
					return
				}

				setStatus("error")
			}
		},
		[from, to]
	)

	useEffect(() => {
		const controller = new AbortController()
		const refreshRate = () => void loadRate()
		void loadRate(controller.signal)

		const interval = window.setInterval(refreshRate, refreshInterval)
		window.addEventListener("focus", refreshRate)
		window.addEventListener("online", refreshRate)

		return () => {
			controller.abort()
			window.clearInterval(interval)
			window.removeEventListener("focus", refreshRate)
			window.removeEventListener("online", refreshRate)
		}
	}, [loadRate])

	const convertedAmount = useMemo(() => {
		if (!amount.trim()) return ""

		const numericAmount = Number(amount)
		if (!currentRate || !Number.isFinite(numericAmount)) return ""

		return (numericAmount * currentRate.rate).toFixed(2)
	}, [amount, currentRate])

	const swapCurrencies = () => {
		setFrom(to)
		setTo(from)
	}

	const rateLabel = currentRate
		? currentRate.rate.toLocaleString(undefined, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 6,
			})
		: null

	return (
		<div className="w-full max-w-xl">
			<Card>
				<CardHeader>
					<CardTitle>Currency converter</CardTitle>
					<CardDescription>
						Convert currencies with the latest available reference rate.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-5">
						<div className="grid gap-2">
							<Label htmlFor="converter-amount">Amount</Label>
							<CurrencyInput
								id="converter-amount"
								value={amount}
								prefix={fromCurrency.symbol}
								onValueChange={(value) => setAmount(value ?? "")}
							/>
							<Select
								value={from}
								onValueChange={(value) => setFrom(value as CurrencyCode)}>
								<SelectTrigger aria-label="Source currency">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{currencies.map((currency) => (
										<SelectItem key={currency.code} value={currency.code}>
											<span className="flex items-center gap-2">
												<Flag country={currency.country} size={20} />
												{currency.code} · {currency.name}
											</span>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex justify-center">
							<Button
								variant="outline"
								color="neutral"
								onClick={swapCurrencies}>
								<ArrowLeftRight />
								Swap currencies
							</Button>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="converter-result">Converted to</Label>
							<CurrencyInput
								id="converter-result"
								value={convertedAmount}
								prefix={toCurrency.symbol}
								readOnly
							/>
							<Select
								value={to}
								onValueChange={(value) => setTo(value as CurrencyCode)}>
								<SelectTrigger aria-label="Destination currency">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{currencies.map((currency) => (
										<SelectItem key={currency.code} value={currency.code}>
											<span className="flex items-center gap-2">
												<Flag country={currency.country} size={20} />
												{currency.code} · {currency.name}
											</span>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{currentRate && rateLabel ? (
							<div aria-live="polite" className="grid gap-1">
								<p className="font-medium">
									1 {from} = {rateLabel} {to}
								</p>
								<p className="text-fg-secondary text-sm">
									Reference rate dated {currentRate.date}
								</p>
							</div>
						) : status === "error" ? (
							<Alert color="error" variant="soft">
								<AlertContent>
									<AlertTitle>Rate unavailable</AlertTitle>
									<AlertDescription>
										Check your connection and try refreshing the rate.
									</AlertDescription>
								</AlertContent>
							</Alert>
						) : (
							<p aria-live="polite" className="text-fg-secondary text-sm">
								Loading the latest rate…
							</p>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<div className="flex w-full flex-wrap items-center justify-between gap-3">
						<Badge
							variant="soft"
							color={
								status === "error"
									? "error"
									: status === "stale"
										? "warning"
										: "success"
							}>
							{status === "error"
								? "Rate unavailable"
								: status === "stale"
									? "Cached rate"
									: status === "loading"
										? "Updating rate"
										: "Current reference rate"}
						</Badge>
						<Button
							variant="outline"
							color="neutral"
							loading={status === "loading"}
							onClick={() => void loadRate()}>
							<RefreshCw />
							Refresh rate
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
