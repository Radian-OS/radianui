"use client"

import React from "react"
import { ListFilter, RotateCcw } from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Input } from "@/registry/ui/input"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { Slider, SliderThumb } from "@/registry/ui/slider"

const DEFAULT_PRICE_RANGE = [5000, 10000]
const DEFAULT_QUICK_SELECT = "10000"

const quickSelectOptions = [
	{
		value: "5000",
		range: [0, 5000],
	},
	{
		value: "10000",
		range: [5000, 10000],
	},
	{
		value: "15000",
		range: [10000, 15000],
	},
	{
		value: "20000",
		range: [15000, 20000],
	},
	{
		value: "30000",
		range: [25000, 30000],
	},
]

const formatPrice = (value: number) => `$${value}`

const parsePrice = (value: string) => {
	const digits = value.replace(/\D/g, "")

	return digits ? Number(digits) : null
}

const getMatchingQuickSelect = (range: number[]) =>
	quickSelectOptions.find(
		(option) => option.range[0] === range[0] && option.range[1] === range[1]
	)?.value ?? ""

const DropdownWithRadioExample = () => {
	const [priceRange, setPriceRange] = React.useState(DEFAULT_PRICE_RANGE)
	const [inputValue, setInputValue] = React.useState(
		formatPrice(DEFAULT_PRICE_RANGE[0])
	)
	const [quickSelect, setQuickSelect] = React.useState(DEFAULT_QUICK_SELECT)

	const updatePriceRange = (range: number[]) => {
		setPriceRange(range)
		setInputValue(formatPrice(range[0]))
		setQuickSelect(getMatchingQuickSelect(range))
	}

	const handleQuickSelect = (value: string) => {
		const selectedOption = quickSelectOptions.find(
			(option) => option.value === value
		)

		if (!selectedOption) return

		setQuickSelect(value)
		setPriceRange(selectedOption.range)
		setInputValue(formatPrice(selectedOption.range[0]))
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		const price = parsePrice(value)

		setInputValue(value)

		if (price === null) {
			setQuickSelect("")
			return
		}

		const lowerPrice = Math.min(Math.max(price, 0), 30000)
		const upperPrice = Math.max(lowerPrice, priceRange[1])
		const nextRange = [lowerPrice, upperPrice]

		setPriceRange(nextRange)
		setQuickSelect(getMatchingQuickSelect(nextRange))
	}

	const resetPriceRange = () => {
		updatePriceRange(DEFAULT_PRICE_RANGE)
	}

	const handleResetKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
		if (event.key !== "Enter" && event.key !== " ") return

		event.preventDefault()
		resetPriceRange()
	}

	return (
		<Dropdown>
			<DropdownTrigger asChild>
				<Button color="neutral" variant="outline">
					Filter Settings <ListFilter className="text-fg-secondary" />
				</Button>
			</DropdownTrigger>
			<DropdownContent className="w-80">
				<DropdownLabel className="flex items-center justify-between">
					<span className="uppercase">Filter by Price range</span>
					<RotateCcw
						aria-label="Reset price range"
						className="size-4"
						onClick={resetPriceRange}
						onKeyDown={handleResetKeyDown}
						role="button"
						tabIndex={0}
					/>
				</DropdownLabel>
				<section className="flex flex-col items-center justify-between gap-4 px-2 pb-3 pt-2">
					<div className="flex flex-col gap-3">
						<span className="text-sm font-medium">Price Range</span>
						<div className="flex flex-col gap-2">
							<Slider
								className="w-73"
								max={30000}
								step={500}
								value={priceRange}
								onValueChange={updatePriceRange}>
								<SliderThumb />
								<SliderThumb />
							</Slider>
							<div className="flex justify-between">
								<span className="text-fg-tertiary text-sm font-medium">
									{formatPrice(priceRange[0])}
								</span>
								<span className="text-fg-tertiary text-sm font-medium">
									{formatPrice(priceRange[1])}
								</span>
							</div>
						</div>
						<Input
							value={inputValue}
							onChange={handleInputChange}
							onBlur={() => setInputValue(formatPrice(priceRange[0]))}
							onKeyDown={(event) => event.stopPropagation()}
						/>
					</div>
				</section>
				<DropdownDivider />
				<DropdownLabel className="flex items-center justify-between">
					<span>Quick Select</span>
					<RotateCcw
						aria-label="Reset quick select"
						className="size-4"
						onClick={resetPriceRange}
						onKeyDown={handleResetKeyDown}
						role="button"
						tabIndex={0}
					/>
				</DropdownLabel>
				<RadioGroup value={quickSelect} onValueChange={handleQuickSelect}>
					<DropdownItem
						onSelect={(event) => {
							event.preventDefault()
							handleQuickSelect("5000")
						}}>
						<RadioGroupItem value="5000" />
						Under $5000
					</DropdownItem>
					<DropdownItem
						onSelect={(event) => {
							event.preventDefault()
							handleQuickSelect("10000")
						}}>
						<RadioGroupItem value="10000" />
						$5,000 - $10,000
					</DropdownItem>
					<DropdownItem
						onSelect={(event) => {
							event.preventDefault()
							handleQuickSelect("15000")
						}}>
						<RadioGroupItem value="15000" />
						$10,000 - $15,000
					</DropdownItem>
					<DropdownItem
						onSelect={(event) => {
							event.preventDefault()
							handleQuickSelect("20000")
						}}>
						<RadioGroupItem value="20000" />
						$15,000 - $20,000
					</DropdownItem>
					<DropdownItem
						onSelect={(event) => {
							event.preventDefault()
							handleQuickSelect("30000")
						}}>
						<RadioGroupItem value="30000" />
						$25,000 - $30,000
					</DropdownItem>
				</RadioGroup>
			</DropdownContent>
		</Dropdown>
	)
}

export default DropdownWithRadioExample
