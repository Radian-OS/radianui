"use client"

import { useState } from "react"
import { ListFilter, RefreshCcw } from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownLabel,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Input } from "@/registry/ui/input"
import { Slider, SliderThumb } from "@/registry/ui/slider"

const MIN_PRICE = 0
const MAX_PRICE = 30000
const DEFAULT_RANGE: [number, number] = [5000, 10000]

const quickSelectOptions = [
	{ value: "under-5000", label: "Under $5000", range: [0, 5000] },
	{ value: "5000-10000", label: "$5,000 - $10,000", range: DEFAULT_RANGE },
	{ value: "10000-15000", label: "$10,000 - $15,000", range: [10000, 15000] },
	{ value: "15000-20000", label: "$15,000 - $20,000", range: [15000, 20000] },
	{ value: "25000-30000", label: "$25,000 - $30,000", range: [25000, 30000] },
] as const

const radioIndicator = (
	<span className="border-alpha bg-bg group-data-[state=checked]:border-primary group-data-[state=checked]:bg-primary absolute start-2 flex size-5 items-center justify-center rounded-full border transition-colors">
		<span className="bg-bg size-2 rounded-full opacity-0 transition-opacity group-data-[state=checked]:opacity-100" />
	</span>
)

function formatCurrency(value: number) {
	return `$${value.toLocaleString("en-US")}`
}

function findQuickSelectValue(range: [number, number]) {
	return (
		quickSelectOptions.find(
			(option) => option.range[0] === range[0] && option.range[1] === range[1]
		)?.value ?? ""
	)
}

export default function DropdownWithRadioExample() {
	const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_RANGE)
	const [quickSelect, setQuickSelect] = useState("5000-10000")

	function updatePriceRange(range: [number, number]) {
		setPriceRange(range)
		setQuickSelect(findQuickSelectValue(range))
	}

	function resetPriceRange() {
		updatePriceRange(DEFAULT_RANGE)
	}

	function handleQuickSelect(value: string) {
		const option = quickSelectOptions.find((option) => option.value === value)
		if (!option) return

		setPriceRange([option.range[0], option.range[1]])
		setQuickSelect(value)
	}

	function handleMinimumInput(value: string) {
		const price = Number(value.replace(/[^\d]/g, ""))
		if (Number.isNaN(price)) return

		updatePriceRange([Math.min(price, priceRange[1]), priceRange[1]])
	}

	return (
		<Dropdown indicatorPosition="left" indicator={radioIndicator}>
			<DropdownTrigger asChild>
				<Button variant="outline" color="neutral">
					Filter Settings <ListFilter className="text-fg-secondary" />
				</Button>
			</DropdownTrigger>
			<DropdownContent className="w-80 gap-0 p-4">
				<DropdownLabel className="flex items-center justify-between px-0 py-0 text-[11px] font-medium tracking-[0.08em]">
					FILTER BY PRICE RANGE
					<button
						type="button"
						aria-label="Reset price range"
						onClick={resetPriceRange}
						className="text-fg-tertiary hover:text-fg transition-colors">
						<RefreshCcw size={16} />
					</button>
				</DropdownLabel>

				<div className="mt-4 flex flex-col gap-3">
					<p className="text-fg text-sm font-medium">Price Range</p>
					<Slider
						min={MIN_PRICE}
						max={MAX_PRICE}
						step={500}
						value={priceRange}
						onValueChange={(value) =>
							updatePriceRange([value[0] ?? MIN_PRICE, value[1] ?? MAX_PRICE])
						}
						className="w-full"
						classNames={{
							sliderTrack: "h-1.5 bg-fill2",
							sliderRange: "bg-primary",
						}}>
						<SliderThumb />
						<SliderThumb />
					</Slider>
					<div className="text-fg-tertiary flex items-center justify-between text-sm font-medium">
						<span>{formatCurrency(priceRange[0])}</span>
						<span>{formatCurrency(priceRange[1])}</span>
					</div>
					<Input
						size="36"
						value={`$${priceRange[0]}`}
						onChange={(event) => handleMinimumInput(event.target.value)}
					/>
				</div>

				<DropdownLabel className="mt-8 flex items-center justify-between px-0 py-0 text-[11px] font-medium tracking-[0.08em]">
					QUICK SELECT
					<button
						type="button"
						aria-label="Reset quick select"
						onClick={resetPriceRange}
						className="text-fg-tertiary hover:text-fg transition-colors">
						<RefreshCcw size={16} />
					</button>
				</DropdownLabel>

				<DropdownRadioGroup
					value={quickSelect}
					onValueChange={handleQuickSelect}
					className="mt-3 flex flex-col gap-0.5">
					{quickSelectOptions.map((option) => (
						<DropdownRadioItem
							key={option.value}
							value={option.value}
							onSelect={(event) => event.preventDefault()}
							className="data-[state=checked]:bg-fill1 data-[state=checked]:hover:bg-fill1 data-[state=checked]:focus:bg-fill1 group rounded-md">
							{option.label}
						</DropdownRadioItem>
					))}
				</DropdownRadioGroup>
			</DropdownContent>
		</Dropdown>
	)
}
