import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import type { InputProps } from "./input"

type CurrencyInputProps = {
	currency?: string
}

function CurrencyInput({ currency = "usd", ...props }: InputProps & CurrencyInputProps) {
	const [rawValue, setRawValue] = useState<string>(props.value as string)
	const [currencySymbol, setCurrencySymbol] = useState<string>("")
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setRawValue(props.value as string)
		const formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency.toUpperCase(),
		})
		const symbol = formatter.formatToParts(12345)[0].value
		setCurrencySymbol(symbol)
	}, [props.value, currency])

	const formatCurrency = (value: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency.toUpperCase(),
		}).format(value)

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && inputRef.current) {
			inputRef.current.blur()
		}
	}

	const handleBlur = () => {
		if (!inputRef.current) return

		if (!props.value || props.value === "") {
			setRawValue("")
			inputRef.current.value = ""
			return
		}

		try {
			const numValue = parseFloat(props.value as string)
			if (isNaN(numValue)) {
				setRawValue("")
				inputRef.current.value = ""
				return
			}

			setRawValue(props.value as string)
			// strip out the extra symbol
			const formattedValue = formatCurrency(numValue).replace(currencySymbol, "").trim()
			inputRef.current.value = formattedValue
		} catch (e) {
			// If parsing fails, just keep the raw value
			setRawValue("")
			inputRef.current.value = ""
			console.log(e)
		}
	}

	const handleFocus = () => {
		if (inputRef.current) {
			inputRef.current.value = rawValue || ""
		}
	}

	// Prevent the input from focusing when the icon is clicked
	const preventFocus = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}

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

	// Wrap the trail prop in a div that prevents focus propagation
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
			onKeyUp={handleKeyPress}
			onBlur={handleBlur}
			onFocus={handleFocus}
			{...props}
		/>
	)
}

export { CurrencyInput }
