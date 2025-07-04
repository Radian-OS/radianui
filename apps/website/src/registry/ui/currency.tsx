import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import type { InputProps } from "./input"

type CurrencyInputProps = {
	currency?: string
	locale?: string
	decimals?: number
	decimalSeparator?: string
	groupSeparator?: string
	separator?: boolean
	maxValue?: number
	minValue?: number
	onValueChange?: (value: number | null, name?: string) => void
}

function CurrencyInput({
	currency = "usd",
	locale = "en-US",
	decimals = 2,
	decimalSeparator,
	groupSeparator,
	separator = true,
	maxValue,
	minValue,
	hint = "",
	onValueChange,
	...props
}: InputProps & CurrencyInputProps) {
	const [rawValue, setRawValue] = useState<string>((props.value as string) || "")
	const [currencySymbol, setCurrencySymbol] = useState<string>("")
	const inputRef = useRef<HTMLInputElement>(null)

	const allowDecimals = decimals > 0
	const decimalsLimit = Math.max(0, decimals)

	const [detectedDecimalSep, detectedGroupSep] = useDetectSeparators(locale)
	const effectiveDecimalSep = decimalSeparator || detectedDecimalSep
	const effectiveGroupSep = groupSeparator || detectedGroupSep

	const formatter = useMemo(
		() =>
			new Intl.NumberFormat(locale, {
				style: "currency",
				currency: currency.toUpperCase(),
				minimumFractionDigits: allowDecimals ? Math.min(decimalsLimit, 20) : 0,
				maximumFractionDigits: allowDecimals ? Math.min(decimalsLimit, 20) : 0,
				useGrouping: separator,
			}),
		[locale, currency, allowDecimals, decimalsLimit, separator]
	)

	// strip symbol from formatted value
	const formatCurrency = (value: number): string => {
		const formatted = formatter.format(value)
		return formatted.replace(currencySymbol, "").trim()
	}

	const peekNumber = (value: string): number | null => {
		if (!value || value === "-" || value === effectiveDecimalSep) return null
		let clean = value.replace(new RegExp(`\\${effectiveGroupSep}`, "g"), "")
		if (effectiveDecimalSep !== ".") {
			clean = clean.replace(new RegExp(`\\${effectiveDecimalSep}`, "g"), ".")
		}
		clean = clean.replace(/[^\d.-]/g, "")
		const parts = clean.split(".")
		if (parts.length > 2) clean = `${parts[0]}.${parts.slice(1).join("")}`
		const num = parseFloat(clean)
		return isNaN(num) ? null : num
	}

	const parseValue = (value: string): number | null => {
		const num = peekNumber(value)
		if (num == null) return null
		if (maxValue !== undefined && num > maxValue) return maxValue
		if (minValue !== undefined && num < minValue) return minValue
		return num
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.ctrlKey || e.metaKey) return
		const allowedNav = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"]
		if (allowedNav.includes(e.key)) return
		const isDigit = /\d/.test(e.key)
		const isDecimal = allowDecimals && e.key === effectiveDecimalSep
		if (!isDigit && !isDecimal) {
			e.preventDefault()
			return
		}
		const input = inputRef.current!
		const { value, selectionStart = 0, selectionEnd = 0 } = input
		const nextRaw = value.slice(0, selectionStart!) + e.key + value.slice(selectionEnd!)
		const peek = peekNumber(nextRaw)
		if (peek !== null && maxValue !== undefined && peek > maxValue) {
			e.preventDefault()
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newValue = e.target.value
		if (!allowDecimals) {
			newValue = newValue.replace(/[^\d-]/g, "")
		} else {
			const parts = newValue.split(effectiveDecimalSep)
			if (parts.length > 2) newValue = `${parts[0]}${effectiveDecimalSep}${parts.slice(1).join("")}`
			if (parts[1]?.length > decimalsLimit) {
				parts[1] = parts[1].slice(0, decimalsLimit)
				newValue = parts.join(effectiveDecimalSep)
			}
		}

		const isTypingFraction = allowDecimals && (newValue.endsWith(effectiveDecimalSep) || new RegExp(`\\${effectiveDecimalSep}\\d*$`).test(newValue))

		let displayValue: string
		if (!isTypingFraction && separator) {
			const num = peekNumber(newValue)
			if (num != null) {
				const parts = formatter.formatToParts(num)
				const intAndGroup = parts
					.filter((p) => p.type === "integer" || p.type === "group")
					.map((p) => p.value)
					.join("")
				const frac = newValue.includes(effectiveDecimalSep) ? effectiveDecimalSep + newValue.split(effectiveDecimalSep)[1] : ""
				displayValue = intAndGroup + frac
			} else {
				displayValue = newValue
			}
		} else {
			displayValue = newValue
		}

		setRawValue(displayValue)
		props.onChange?.({
			...e,
			target: { ...e.target, value: displayValue },
		} as React.ChangeEvent<HTMLInputElement>)
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!inputRef.current) return
		if (!rawValue) {
			setRawValue("")
			inputRef.current.value = ""
			onValueChange?.(null, props.name)
			props.onBlur?.(e)
			return
		}
		const num = parseValue(rawValue)
		if (num == null) {
			setRawValue("")
			inputRef.current.value = ""
			onValueChange?.(null, props.name)
		} else {
			// strip symbol from final value
			const out = separator ? formatCurrency(num) : num.toFixed(allowDecimals ? decimalsLimit : 0)
			inputRef.current.value = out
			setRawValue(out)
			onValueChange?.(num, props.name)
		}
		props.onBlur?.(e)
	}

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		if (inputRef.current) inputRef.current.value = rawValue
		props.onFocus?.(e)
	}

	const preventFocus = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const currencyLead = (
		<div onMouseDown={preventFocus} onClick={preventFocus} className="pointer-events-auto flex items-center justify-center">
			<span className={cn("text-text-tertiary text-sm uppercase", { "cursor-not-allowed": props.disabled })}>{currencySymbol}</span>
		</div>
	)

	const wrappedTrail = props.end ? (
		<div onMouseDown={preventFocus} onClick={preventFocus} className="pointer-events-auto">
			{props.end}
		</div>
	) : (
		<div onMouseDown={preventFocus} onClick={preventFocus} className="pointer-events-auto flex items-center justify-center">
			<span className={cn("text-text-tertiary text-sm uppercase", { "cursor-not-allowed": props.disabled })}>{currency}</span>
		</div>
	)

	useEffect(() => {
		setRawValue((props.value as string) || "")
		try {
			// Always use en-US for symbol detection to get standard symbols
			const parts = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: currency.toUpperCase(),
			}).formatToParts(0)
			const symbol = parts.find((p) => p.type === "currency")?.value || ""
			setCurrencySymbol(symbol)
		} catch {
			setCurrencySymbol(currency.toUpperCase())
		}
	}, [currency, locale])

	return (
		<Input
			value={rawValue}
			ref={inputRef}
			start={currencyLead}
			end={wrappedTrail}
			hint={hint}
			onKeyDown={handleKeyDown}
			onChange={handleChange}
			onBlur={handleBlur}
			onFocus={handleFocus}
			{...props}
		/>
	)
}

function useDetectSeparators(locale: string): [string, string] {
	const [decimalSep, setDecimalSep] = useState<string>(".")
	const [groupSep, setGroupSep] = useState<string>(",")
	useEffect(() => {
		const parts = new Intl.NumberFormat(locale).formatToParts(1234.5)
		setDecimalSep(parts.find((p) => p.type === "decimal")?.value || ".")
		setGroupSep(parts.find((p) => p.type === "group")?.value || ",")
	}, [locale])
	return [decimalSep, groupSep]
}

export { CurrencyInput }
export type { CurrencyInputProps }
