import * as React from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

type Option = {
	value: string
	label: string
}

interface VirtualizedCommandProps {
	height: string
	options: Option[]
	placeholder: string
	selectedOption: string
	onSelectOption?: (option: string) => void
}

const options = Array.from({ length: 10_000 }).map((_, i) => (i + 1).toString())

export default function VirtualizedList() {
	const [open, setOpen] = React.useState(false)
	const [selectedOption, setSelectedOption] = React.useState("")

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-80 justify-between" color="neutral">
					{selectedOption ? `Item ${options.find((option) => option === selectedOption)}` : "Select Item"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-(--radix-popper-anchor-width) p-0">
				<VirtualizedCommand
					height="300px"
					options={options.map((option) => ({ value: option, label: `Item ${option}` }))}
					placeholder={"Search..."}
					selectedOption={selectedOption}
					onSelectOption={(currentValue) => {
						setSelectedOption(currentValue === selectedOption ? "" : currentValue)
						setOpen(false)
					}}
				/>
			</PopoverContent>
		</Popover>
	)
}

const VirtualizedCommand = ({ height, options, placeholder, selectedOption, onSelectOption }: VirtualizedCommandProps) => {
	const [filteredOptions, setFilteredOptions] = React.useState<Option[]>(options)
	const [focusedIndex, setFocusedIndex] = React.useState(0)
	const [isKeyboardNavActive, setIsKeyboardNavActive] = React.useState(false)

	const parentRef = React.useRef(null)

	const virtualizer = useVirtualizer({
		count: filteredOptions.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 35,
	})

	const virtualOptions = virtualizer.getVirtualItems()

	const handleSearch = (search: string) => {
		setIsKeyboardNavActive(false)
		setFilteredOptions(options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase() ?? [])))
	}

	React.useEffect(() => {
		if (selectedOption) {
			const option = filteredOptions.find((option) => option.value === selectedOption)
			if (option) {
				const index = filteredOptions.indexOf(option)
				setFocusedIndex(index)
				virtualizer.scrollToIndex(index, {
					align: "center",
				})
			}
		}
	}, [selectedOption, filteredOptions, virtualizer])

	return (
		<Command shouldFilter={false}>
			<CommandInput onValueChange={handleSearch} placeholder={placeholder} />
			<CommandList
				ref={parentRef}
				style={{
					height: height,
					width: "100%",
					overflow: "auto",
				}}
				onMouseDown={() => setIsKeyboardNavActive(false)}
				onMouseMove={() => setIsKeyboardNavActive(false)}>
				<CommandEmpty>No item found.</CommandEmpty>
				<CommandGroup>
					<div
						style={{
							height: `${virtualizer.getTotalSize()}px`,
							width: "100%",
							position: "relative",
						}}>
						{virtualOptions.map((virtualOption) => (
							<CommandItem
								key={filteredOptions[virtualOption.index].value}
								disabled={isKeyboardNavActive}
								className={cn(
									"absolute left-0 top-0 w-full bg-transparent",
									focusedIndex === virtualOption.index && "bg-accent text-accent-foreground",
									isKeyboardNavActive && focusedIndex !== virtualOption.index && "aria-selected:text-primary aria-selected:bg-transparent"
								)}
								style={{
									height: `${virtualOption.size}px`,
									transform: `translateY(${virtualOption.start}px)`,
								}}
								value={filteredOptions[virtualOption.index].value}
								onMouseEnter={() => !isKeyboardNavActive && setFocusedIndex(virtualOption.index)}
								onMouseLeave={() => !isKeyboardNavActive && setFocusedIndex(-1)}
								onSelect={onSelectOption}>
								{filteredOptions[virtualOption.index].label}
								<Check className={cn("ml-auto", selectedOption === filteredOptions[virtualOption.index].value ? "opacity-100" : "opacity-0")} />
							</CommandItem>
						))}
					</div>
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
