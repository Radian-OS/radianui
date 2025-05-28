import React, { useId, useMemo } from "react"
import { ChevronDown, PhoneIcon } from "lucide-react"
import * as RPNInput from "react-phone-number-input"
import { getCountries, getCountryCallingCode } from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Input, InputProps } from "@/registry/ui/input"

type PhoneNumberPrimitiveProps = {
	value: string
	onChange: (value: string) => void
	country: RPNInput.Country
	onCountryChange: (country: RPNInput.Country) => void
	size?: InputProps["size"]
	showTrigger?: boolean
	className?: string // 👈 applies ONLY to the Input
}

const PhoneNumber: React.FC<PhoneNumberPrimitiveProps> = ({ value, onChange, country, onCountryChange, size, showTrigger = true, className }) => {
	const id = useId()
	const countries = useMemo(() => getCountries(), [])

	// 👇 Stable component that captures `className` via closure
	const InputWithClass = useMemo(() => {
		const Comp = React.forwardRef<HTMLInputElement, InputProps>(({ className: innerClassName, ...props }, ref) => (
			<Input
				ref={ref}
				data-slot="phone-input"
				size={size}
				className={cn(
					showTrigger && "rounded-l-none",
					className, // outer className from PhoneNumber props
					innerClassName // className passed from react-phone-number-input internally
				)}
				{...props}
			/>
		))
		Comp.displayName = "InputWithClass"
		return Comp
	}, [className, size, showTrigger])

	const trigger = showTrigger && (
		<Button
			variant="neutral-soft"
			size={size === "0" ? undefined : size}
			className="border-border-alpha flex items-center gap-1 rounded-r-none border border-r-0">
			<Flag country={country} />
			<span>{country ? `+${getCountryCallingCode(country)}` : ""}</span>
			{showTrigger && <ChevronDown className="text-text-disabled size-5" />}
		</Button>
	)

	return (
		<div className="flex gap-0">
			<Dropdown>
				<DropdownTrigger asChild>{trigger}</DropdownTrigger>
				<DropdownContent className="max-h-60 w-80 overflow-auto">
					<DropdownGroup selectionMode="single" selectedValues={[country]} onSelectedChange={(vals) => onCountryChange(vals[0] as RPNInput.Country)}>
						{countries.map((c) => (
							<DropdownItem key={c} value={c} icon={<Flag country={c} />} shortcut={`+${getCountryCallingCode(c)}`}>
								{new Intl.DisplayNames(["en"], { type: "region" }).of(c)}
							</DropdownItem>
						))}
					</DropdownGroup>
				</DropdownContent>
			</Dropdown>

			<RPNInput.default
				id={id}
				className="flex-1"
				country={country}
				value={value}
				onChange={(val) => typeof val === "string" && onChange(val)}
				onCountryChange={onCountryChange}
				flagComponent={() => null}
				countrySelectComponent={() => null}
				inputComponent={InputWithClass}
				placeholder="Enter phone number"
				size={size}
			/>
		</div>
	)
}

const Flag = ({ country }: { country?: RPNInput.Country }) => {
	if (!country) return <PhoneIcon className="text-text-disabled size-5" />
	const CountryFlag = flags[country]
	return <span className="w-8 overflow-hidden rounded-sm">{CountryFlag ? <CountryFlag title={country} /> : <ChevronDown className="size-5" />}</span>
}

export { PhoneNumber }
