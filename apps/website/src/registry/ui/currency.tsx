import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import type { InputProps } from "./input"

type CurrencyInputProps = {
	/**
	 * Currency code (ISO 4217) for formatting
	 * @default "usd"
	 */
	currency?: string

	/**
	 * Locale for number formatting
	 * @default "en-US"
	 */
	locale?: string

	/**
	 * Allow decimal values
	 * @default true
	 */
	allowDecimals?: boolean

	/**
	 * Number of decimal places
	 * @default 2
	 */
	decimalsLimit?: number

	/**
	 * Decimal separator character
	 * @default "." for en-US
	 */
	decimalSeparator?: string

	/**
	 * Group separator character (thousands)
	 * @default "," for en-US
	 */
	groupSeparator?: string

	/**
	 * Maximum value allowed
	 */
	maxValue?: number

	/**
	 * Minimum value allowed
	 */
	minValue?: number

	/**
	 * Called when value changes with the raw numeric value
	 */
	onValueChange?: (value: number | null, name?: string) => void
}

function CurrencyInput({
	// Currency related props
	currency = "usd",
	locale = "en-US",
	allowDecimals = true,
	decimalsLimit = 2,
	decimalSeparator,
	groupSeparator,
	maxValue,
	minValue,
	hint = "",
	onValueChange,

	// Input props
	...props
}: InputProps & CurrencyInputProps) {
	// State variables
	const [rawValue, setRawValue] = useState<string>((props.value as string) || "")
	const [currencySymbol, setCurrencySymbol] = useState<string>("")
	const inputRef = useRef<HTMLInputElement>(null)

	// Detect locale settings if not explicitly provided
	const [detectedDecimalSep, detectedGroupSep] = useDetectSeparators(locale)

	// Use provided separators or detected ones
	const effectiveDecimalSep = decimalSeparator || detectedDecimalSep
	const effectiveGroupSep = groupSeparator || detectedGroupSep

	// Initialize currency symbol
	useEffect(() => {
		setRawValue((props.value as string) || "")

		try {
			// Get currency symbol from locale
			const formatter = new Intl.NumberFormat(locale, {
				style: "currency",
				currency: currency.toUpperCase(),
			})

			// Extract symbol from formatted parts
			const parts = formatter.formatToParts(0)
			const symbol = parts.find((part) => part.type === "currency")?.value || ""
			setCurrencySymbol(symbol)
		} catch (e) {
			console.error("Error setting up currency formatting:", e)
			setCurrencySymbol(currency.toUpperCase())
		}
	}, [props.value, currency, locale])

	// Format a numeric value to currency string
	const formatCurrency = (value: number): string => {
		try {
			if (isNaN(value)) return ""

			// Apply min/max constraints
			if (maxValue !== undefined && value > maxValue) value = maxValue
			if (minValue !== undefined && value < minValue) value = minValue

			// Format with Intl
			const formatted = new Intl.NumberFormat(locale, {
				style: "currency",
				currency: currency.toUpperCase(),
				minimumFractionDigits: allowDecimals ? Math.min(decimalsLimit, 20) : 0,
				maximumFractionDigits: allowDecimals ? Math.min(decimalsLimit, 20) : 0,
			}).format(value)

			// Remove currency symbol to keep it outside the input
			return formatted.replace(currencySymbol, "").trim()
		} catch (e) {
			console.error("Error formatting currency:", e)
			return ""
		}
	}

	// Parse a string value to number, handling separators
	const parseValue = (value: string): number | null => {
		if (!value) return null

		try {
			// Remove currency symbol and group separators
			let cleanValue = value.replace(new RegExp(`\\${effectiveGroupSep}`, "g"), "")

			// Replace decimal separator with dot for parsing
			if (effectiveDecimalSep !== ".") {
				cleanValue = cleanValue.replace(new RegExp(`\\${effectiveDecimalSep}`, "g"), ".")
			}

			// Remove any non-numeric chars except decimal point
			cleanValue = cleanValue.replace(/[^\d.-]/g, "")

			// Handle multiple decimal points
			const parts = cleanValue.split(".")
			if (parts.length > 2) {
				cleanValue = `${parts[0]}.${parts.slice(1).join("")}`
			}

			// Parse the clean value
			const numValue = parseFloat(cleanValue)

			// Apply min/max constraints
			if (!isNaN(numValue)) {
				if (maxValue !== undefined && numValue > maxValue) return maxValue
				if (minValue !== undefined && numValue < minValue) return minValue
				return numValue
			}

			return null
		} catch (e) {
			console.error("Error parsing currency value:", e)
			return null
		}
	}

	// Event Handlers
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Prevent non-numeric input if decimals not allowed
		if (!allowDecimals) {
			if (
				!/[\d-]/.test(e.key) &&
				e.key !== "Backspace" &&
				e.key !== "Delete" &&
				e.key !== "ArrowLeft" &&
				e.key !== "ArrowRight" &&
				e.key !== "Tab" &&
				e.key !== "Enter"
			) {
				e.preventDefault()
			}
		} else {
			// Allow decimal separator (but only one)
			if (e.key === effectiveDecimalSep && inputRef.current?.value.includes(effectiveDecimalSep)) {
				e.preventDefault()
			}

			// Allow only numeric input, decimal separator, and control keys
			if (
				!/[\d-]/.test(e.key) &&
				e.key !== effectiveDecimalSep &&
				e.key !== "Backspace" &&
				e.key !== "Delete" &&
				e.key !== "ArrowLeft" &&
				e.key !== "ArrowRight" &&
				e.key !== "Tab" &&
				e.key !== "Enter"
			) {
				e.preventDefault()
			}
		}

		// Handle Enter key
		if (e.key === "Enter" && inputRef.current) {
			inputRef.current.blur()
		}
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!inputRef.current) return

		try {
			// If empty, handle accordingly
			if (!rawValue || rawValue === "") {
				setRawValue("")
				inputRef.current.value = ""

				// Notify parent of empty value
				if (onValueChange) {
					onValueChange(null, props.name)
				}
				// Call original onBlur if provided
				if (props.onBlur) {
					props.onBlur(e)
				}
				return
			}

			// Parse and validate the value
			const numValue = parseValue(rawValue)
			if (numValue === null || isNaN(numValue)) {
				setRawValue("")
				inputRef.current.value = ""

				// Notify parent of invalid value
				if (onValueChange) {
					onValueChange(null, props.name)
				}
				// Call original onBlur if provided
				if (props.onBlur) {
					props.onBlur(e)
				}
				return
			}

			// Format the value for display
			const formattedValue = formatCurrency(numValue)
			inputRef.current.value = formattedValue

			// Update raw value for future edits
			setRawValue(numValue.toString())

			// Notify parent of value change
			if (onValueChange) {
				onValueChange(numValue, props.name)
			}

			// Call original onBlur if provided
			if (props.onBlur) {
				props.onBlur(e)
			}
		} catch (e2) {
			console.error("Error in handleBlur:", e2)
			setRawValue("")
			inputRef.current.value = ""

			// Notify parent of error
			if (onValueChange) {
				onValueChange(null, props.name)
			}
			// Call original onBlur if provided
			if (props.onBlur) {
				props.onBlur(e)
			}
		}
	}

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		if (inputRef.current) {
			// Show raw value for editing
			inputRef.current.value = rawValue || ""
		}

		// Call original onFocus if provided
		if (props.onFocus) {
			props.onFocus(e)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value

		// Validate input during typing
		let newValue = inputValue

		// Apply validation based on settings
		if (!allowDecimals) {
			// Only allow digits and negative sign
			newValue = newValue.replace(/[^\d-]/g, "")
		} else {
			// Allow one decimal separator
			const parts = newValue.split(effectiveDecimalSep)
			if (parts.length > 2) {
				newValue = `${parts[0]}${effectiveDecimalSep}${parts.slice(1).join("")}`
			}

			// Enforce decimals limit
			if (parts.length === 2 && decimalsLimit && parts[1].length > decimalsLimit) {
				parts[1] = parts[1].substring(0, decimalsLimit)
				newValue = parts.join(effectiveDecimalSep)
			}
		}

		// Update raw value state
		setRawValue(newValue)

		// Call original onChange if provided
		if (props.onChange) {
			// Create a synthetic event with our validated value
			const syntheticEvent = {
				...e,
				target: {
					...e.target,
					value: newValue,
				},
			}
			props.onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
		}
	}

	// Prevent the input from focusing when the currency elements are clicked
	const preventFocus = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}

	// Currency symbol at the start
	const currencyLead = (
		<div onMouseDown={preventFocus} onClick={preventFocus} className="pointer-events-auto flex items-center justify-center">
			<span
				className={cn("text-text-tertiary text-sm uppercase", {
					"cursor-not-allowed": props.disabled,
				})}>
				{currencySymbol}
			</span>
		</div>
	)

	// Currency code at the end
	const wrappedTrail = props.trail ? (
		<div onMouseDown={preventFocus} onClick={preventFocus} className="pointer-events-auto">
			{props.trail}
		</div>
	) : (
		<div onMouseDown={preventFocus} onClick={preventFocus} className="pointer-events-auto flex items-center justify-center">
			<span
				className={cn("text-text-tertiary text-sm uppercase", {
					"cursor-not-allowed": props.disabled,
				})}>
				{currency}
			</span>
		</div>
	)

	return (
		<Input
			className={cn("text-text-tertiary")}
			ref={inputRef}
			lead={currencyLead}
			trail={wrappedTrail}
			hint={hint}
			onKeyDown={handleKeyPress}
			onChange={handleChange}
			onBlur={handleBlur}
			onFocus={handleFocus}
			{...props}
		/>
	)
}

// Helper hook to detect decimal and group separators based on locale
function useDetectSeparators(locale: string): [string, string] {
	const [decimalSep, setDecimalSep] = useState<string>(".")
	const [groupSep, setGroupSep] = useState<string>(",")

	useEffect(() => {
		try {
			// Use 1234.5 to detect separators
			const parts = new Intl.NumberFormat(locale).formatToParts(1234.5)

			// Find decimal and group separators
			const decimal = parts.find((part) => part.type === "decimal")?.value || "."
			const group = parts.find((part) => part.type === "group")?.value || ","

			setDecimalSep(decimal)
			setGroupSep(group)
		} catch (e) {
			console.error("Error detecting separators:", e)
			// Fallback to US defaults
			setDecimalSep(".")
			setGroupSep(",")
		}
	}, [locale])

	return [decimalSep, groupSep]
}

export { CurrencyInput }
export type { CurrencyInputProps }
