import { useEffect, useRef, useState } from "react"
import { Input, InputProps } from "./input"

type CurrencyInputProps = {
	currency?: string
}

function CurrencyInput({ currency = "usd", ...props }: InputProps & CurrencyInputProps) {
	const [rawValue, setRawValue] = useState<string>(props.value as string)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setRawValue(props.value as string)
	}, [props.value])

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency,
		}).format(value)
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && inputRef.current) {
			inputRef.current.blur()
		}
	}

	const handleBlur = () => {
		if (inputRef.current) {
			if (props.value === "") {
				setRawValue("")
				inputRef.current.value = ""
			} else {
				const numValue = parseFloat(props.value as string)
				setRawValue(props.value as string)
				const formattedValue = formatCurrency(numValue)
				inputRef.current.value = formattedValue
			}
		}
	}

	const handleFocus = () => {
		if (inputRef.current) {
			inputRef.current.value = rawValue
		}
	}

	return (
		<Input
			ref={inputRef}
			trial={<span className="uppercase">{currency}</span>}
			onKeyUp={handleKeyPress}
			onBlur={handleBlur}
			onFocus={handleFocus}
			{...props}
		/>
	)
}

export { CurrencyInput }
