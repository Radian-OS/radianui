import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import type { InputProps } from "./input"

type CurrencyInputProps = {
	currency?: string
	locale?: string
	allowDecimals?: boolean
	decimalsLimit?: number
	decimalSeparator?: string
	groupSeparator?: string
	maxValue?: number
	minValue?: number
	onValueChange?: (value: number | null, name?: string) => void
}

function CurrencyInput({
	currency = "usd",
	locale = "en-US",
	allowDecimals = true,
	decimalsLimit = 2,
	decimalSeparator,
	groupSeparator,
	maxValue,
	minValue,
	onValueChange,
	...props
}: InputProps & CurrencyInputProps) {
	const [rawValue, setRawValue] = useState<string>((props.value as string) || "")
	const [currencySymbol, setCurrencySymbol] = useState<string>("")
	const inputRef = useRef<HTMLInputElement>(null)

	const [detectedDecimalSep, detectedGroupSep] = useDetectSeparators(locale)
	const effectiveDecimalSep = decimalSeparator || detectedDecimalSep
	const effectiveGroupSep = groupSeparator || detectedGroupSep

	// New: pure parse (no clamping)
	const peekNumber = (value: string): number | null => {
		if (!value || value === "-" || value === effectiveDecimalSep) return null
		let clean = value.replace(new RegExp(`\\${effectiveGroupSep}`, "g"), "")
		if (effectiveDecimalSep !== ".") clean = clean.replace(new RegExp(`\\${effectiveDecimalSep}`, "g"), ".")
		clean = clean.replace(/[^\d.-]/g, "")
		const parts = clean.split(".")
		if (parts.length > 2) clean = `${parts[0]}.${parts.slice(1).join("")}`
		const num = parseFloat(clean)
		return isNaN(num) ? null : num
	}

	// Your existing formatter + clamping
	const formatCurrency = (value: number): string => {
		let v = value
		if (maxValue !== undefined && v > maxValue) v = maxValue
		if (minValue !== undefined && v < minValue) v = minValue
		const formatted = new Intl.NumberFormat(locale, {
			style: "currency",
			currency: currency.toUpperCase(),
			minimumFractionDigits: allowDecimals ? Math.min(decimalsLimit, 20) : 0,
			maximumFractionDigits: allowDecimals ? Math.min(decimalsLimit, 20) : 0,
		}).format(v)
		return formatted.replace(currencySymbol, "").trim()
	}

	// Your existing clamping parser for onBlur/onValueChange
	const parseValue = (value: string): number | null => {
		const num = peekNumber(value)
		if (num == null) return null
		if (maxValue !== undefined && num > maxValue) return maxValue
		if (minValue !== undefined && num < minValue) return minValue
		return num
	}

	// BLOCK keystrokes above maxValue
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const allowedNav = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"]
		if (allowedNav.includes(e.key)) return

		const isDigit = /\d/.test(e.key)
		const isDecimal = allowDecimals && e.key === effectiveDecimalSep
		if (!isDigit && !isDecimal) {
			e.preventDefault()
			return
		}

		const input = inputRef.current!
		const { value } = input
		const selectionStart = input.selectionStart ?? 0
		const selectionEnd = input.selectionEnd ?? 0

		// Build what text would become
		const nextRaw = value.slice(0, selectionStart) + e.key + value.slice(selectionEnd)

		// If numeric peek is above max, block. Otherwise allow.
		const peek = peekNumber(nextRaw)
		if (peek !== null && maxValue !== undefined && peek > maxValue) {
			e.preventDefault()
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newValue = e.target.value

		// strip illegal chars
		if (!allowDecimals) {
			newValue = newValue.replace(/[^\d-]/g, "")
		} else {
			const parts = newValue.split(effectiveDecimalSep)
			if (parts.length > 2) {
				newValue = `${parts[0]}${effectiveDecimalSep}${parts.slice(1).join("")}`
			}
			if (parts[1]?.length > decimalsLimit) {
				parts[1] = parts[1].slice(0, decimalsLimit)
				newValue = parts.join(effectiveDecimalSep)
			}
		}

		const isTypingFraction = allowDecimals && (newValue.endsWith(effectiveDecimalSep) || new RegExp(`\\${effectiveDecimalSep}\\d*$`).test(newValue))

		// grouping logic (unchanged)
		let displayValue: string
		if (isTypingFraction) {
			displayValue = newValue
		} else {
			const stripped = newValue.replace(new RegExp(`\\${effectiveGroupSep}`, "g"), "")
			const [intPart, fracPart] = stripped.split(effectiveDecimalSep)
			const withGroups = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, effectiveGroupSep)
			displayValue = fracPart != null ? `${withGroups}${effectiveDecimalSep}${fracPart}` : withGroups
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
			const out = formatCurrency(num)
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
	const wrappedTrail = props.trail ? (
		<div onMouseDown={preventFocus} onClick={preventFocus} className="pointer-events-auto">
			{props.trail}
		</div>
	) : (
		<div onMouseDown={preventFocus} onClick={preventFocus} className="pointer-events-auto flex items-center justify-center">
			<span className={cn("text-text-tertiary text-sm uppercase", { "cursor-not-allowed": props.disabled })}>{currency}</span>
		</div>
	)

	useEffect(() => {
		setRawValue((props.value as string) || "")
		try {
			const formatter = new Intl.NumberFormat(locale, {
				style: "currency",
				currency: currency.toUpperCase(),
			})
			const parts = formatter.formatToParts(0)
			const symbol = parts.find((p) => p.type === "currency")?.value || ""
			setCurrencySymbol(symbol)
		} catch {
			setCurrencySymbol(currency.toUpperCase())
		}
	}, [props.value, currency, locale])

	return (
		<Input
			value={rawValue}
			ref={inputRef}
			lead={currencyLead}
			trail={wrappedTrail}
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
