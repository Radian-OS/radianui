"use client"

import React from "react"
import { CircleUserRound, Volume2, VolumeX } from "lucide-react"
import Calendar from "@/registry/ui/calendar"
import { CurrencyInput } from "@/registry/ui/currency"
import DateInput from "@/registry/ui/date-input"
import DatePicker, { DatePickerModes } from "@/registry/ui/date-picker"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import FileUpload from "@/registry/ui/file-upload"
import { Input, RoundedOptions, SizeOptions } from "@/registry/ui/input"
import OTPInput from "@/registry/ui/input-otp"
// import NumberInput from "@/registry/ui/number"
import { Password } from "@/registry/ui/password"
import SearchInput from "@/registry/ui/search"
import { Select, SelectGroup, SelectItem } from "@/registry/ui/select"
import Slider from "@/registry/ui/slider"
import Switch from "@/registry/ui/switch"
import { TextArea } from "@/registry/ui/text-area"
import TimePicker from "@/registry/ui/time-picker"

const roundedOptions = ["sm", "square", "full"]
const sizes = ["32", "36", "40", "44", "48", "56"]
const intervalOptions = ["15", "30", "60"]
const selectionModes = ["single", "multiple"]
const calendarSelectionModes = ["single", "multiple", "range"]
const booleanOptions = ["true", "false"]
const navigatorStyles = ["button", "selector"] as const

const page = () => {
	return (
		<div className="text-text px-[6rem] py-[3rem]">
			<h4 className="font-heading text-text mb-6 text-[2rem] font-bold">Input</h4>

			<div className="flex flex-col gap-[40px]">
				<InputComp />
				<PasswordComp />
				<SearchInputComp />
				<NumberComp />
				<CurrencyComp />
				<OTPComp />
				<TimeComp />
				<DateInputComp />
				<DatePickerComp />
				<FileUploadComp />
				<SliderComp />
				<SwitchComp />
				<TextAreaComp />
				<SelectComp />
				<CalendarComp />
			</div>
		</div>
	)
}

type Props = {
	rounded: RoundedOptions
	setRounded: (value: RoundedOptions) => void
	size: SizeOptions
	setSize: (value: SizeOptions) => void
	disabled: boolean
	setDisabled: (value: boolean) => void
	label: boolean
	setLabel: (value: boolean) => void
}
const CommonProperty = ({ rounded, setRounded, size, setSize, disabled, setDisabled, label, setLabel }: Props) => {
	return (
		<React.Fragment>
			<DropdownSub>
				<DropdownSubTrigger>Rounded</DropdownSubTrigger>
				<DropdownSubContent>
					<DropdownGroup
						selectionMode="single"
						selectedValues={[rounded]}
						onSelectedChange={(values) => setRounded(values[0] as RoundedOptions)}
						minSelectionCount={1}>
						{roundedOptions.map((roundedOption) => (
							<DropdownItem value={roundedOption} key={roundedOption}>
								{roundedOption}
							</DropdownItem>
						))}
					</DropdownGroup>
				</DropdownSubContent>
			</DropdownSub>
			<DropdownSub>
				<DropdownSubTrigger>Size</DropdownSubTrigger>
				<DropdownSubContent>
					<DropdownGroup
						selectionMode="single"
						selectedValues={[size]}
						onSelectedChange={(values) => setSize(values[0] as SizeOptions)}
						minSelectionCount={1}>
						{sizes.map((size) => (
							<DropdownItem value={size} key={size}>
								{size}
							</DropdownItem>
						))}
					</DropdownGroup>
				</DropdownSubContent>
			</DropdownSub>
			<DropdownSub>
				<DropdownSubTrigger>Label</DropdownSubTrigger>
				<DropdownSubContent>
					<DropdownGroup
						selectionMode="single"
						selectedValues={[String(label)]}
						onSelectedChange={(values) => setLabel(values[0] === "true")}
						minSelectionCount={1}>
						{booleanOptions.map((val) => (
							<DropdownItem value={val} key={val}>
								{val}
							</DropdownItem>
						))}
					</DropdownGroup>
				</DropdownSubContent>
			</DropdownSub>
			<DropdownSub>
				<DropdownSubTrigger>Disabled</DropdownSubTrigger>
				<DropdownSubContent>
					<DropdownGroup
						selectionMode="single"
						selectedValues={[String(disabled)]}
						onSelectedChange={(values) => setDisabled(values[0] === "true")}
						minSelectionCount={1}>
						{booleanOptions.map((option) => (
							<DropdownItem key={option} value={option}>
								{option}
							</DropdownItem>
						))}
					</DropdownGroup>
				</DropdownSubContent>
			</DropdownSub>
		</React.Fragment>
	)
}

const SearchInputComp = () => {
	const [searchValue, setSearchValue] = React.useState("")
	const [size, setSize] = React.useState<SizeOptions>("40")
	const [rounded, setRounded] = React.useState<RoundedOptions>("sm")
	const [disabled, setDisabled] = React.useState(false)
	const [label, setLabel] = React.useState(true)
	const [searchResults, setSearchResults] = React.useState<{ id: string; title: string }[]>([])

	React.useEffect(() => {
		const fetchResults = async () => {
			try {
				const results = await fetch("https://dummyjson.com/products/search?q=" + searchValue)
				const data = await results.json()
				if (data.products.length > 0) setSearchResults(data.products)
			} catch (err) {
				console.log(err)
			}
		}
		fetchResults()
	}, [searchValue])

	const handleSearchChange = (value: string) => {
		setSearchValue(value)
	}

	const renderSearchResults = () => {
		if (searchResults.length == 0) return <div className="px-[12px] py-[10px]">Not Found</div>

		const items = searchResults.map((result) => (
			<div
				key={result.id}
				className="hover:bg-border outline-hidden relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-[0.625rem] py-[0.375rem] text-sm font-normal [&_svg]:shrink-0">
				<p>{result.title}</p>
			</div>
		))

		return <div className="px-[8px] py-[6px]">{items}</div>
	}

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Search</h6>

			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<CommonProperty
						rounded={rounded}
						setRounded={setRounded}
						size={size}
						setSize={setSize}
						disabled={disabled}
						setDisabled={setDisabled}
						label={label}
						setLabel={setLabel}
					/>
				</DropdownContent>
			</Dropdown>

			<div className="border-stroke bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				<SearchInput
					label={label ? "Search" : undefined}
					size={size}
					rounded={rounded}
					disabled={disabled}
					onChange={(e) => handleSearchChange(e.target.value)}
					value={searchValue}
					id="search-input"
					renderSearchResults={renderSearchResults}
					// classNames={{ base: "w-[320px]", searchResults: "w-[320px]" }}
					className="w-80"
				/>
			</div>
		</div>
	)
}

const PasswordComp = () => {
	const [size, setSize] = React.useState<SizeOptions>("40")
	const [rounded, setRounded] = React.useState<RoundedOptions>("sm")
	const [disabled, setDisabled] = React.useState(false)
	const [label, setLabel] = React.useState(true)
	const [hasError, setHasError] = React.useState<boolean>(false)

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Password</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<CommonProperty
						rounded={rounded}
						setRounded={setRounded}
						size={size}
						setSize={setSize}
						disabled={disabled}
						setDisabled={setDisabled}
						label={label}
						setLabel={setLabel}
					/>
					<DropdownSub>
						<DropdownSubTrigger>HasError</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(hasError)]}
								onSelectedChange={(values) => setHasError(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>
			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				<Password
					label={label ? "Password" : undefined} // Conditionally render label
					size={size}
					rounded={rounded}
					disabled={disabled}
					hint={"Some error occured"}
					hasError={hasError}
					className="w-80"
					placeholder="Enter your password here"
				/>
			</div>
		</div>
	)
}

const CalendarComp = () => {
	const [mode, setMode] = React.useState<(typeof calendarSelectionModes)[number]>("single")
	const [doubleCalendar, setDoubleCalendar] = React.useState<boolean>(false)
	const [navigatorStyle, setNavigatorStyle] = React.useState<(typeof navigatorStyles)[number]>("button")

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Calendar</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<DropdownSub>
						<DropdownSubTrigger>Selection Mode</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[mode]}
								onSelectedChange={(values) => setMode(values[0] as (typeof calendarSelectionModes)[number])}
								minSelectionCount={1}>
								{calendarSelectionModes.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Double Calendar</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(doubleCalendar)]}
								onSelectedChange={(values) => setDoubleCalendar(values[0] === "true")}
								minSelectionCount={1}>
								{booleanOptions.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Navigator Style</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[navigatorStyle]}
								onSelectedChange={(values) => setNavigatorStyle(values[0] as (typeof navigatorStyles)[number])}
								minSelectionCount={1}>
								{navigatorStyles.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>

			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				{mode === "single" && <Calendar mode={"single"} dualCalendar={doubleCalendar} navigatorStyle={navigatorStyle} showOutsideDays />}
				{mode === "multiple" && <Calendar mode={"multiple"} dualCalendar={doubleCalendar} navigatorStyle={navigatorStyle} showOutsideDays />}
				{mode === "range" && <Calendar mode={"range"} dualCalendar={doubleCalendar} navigatorStyle={navigatorStyle} showOutsideDays />}
			</div>
		</div>
	)
}

const DateInputComp = () => {
	const [rounded, setRounded] = React.useState<RoundedOptions>("sm")
	const [size, setSize] = React.useState<SizeOptions>("40")
	const [disabled, setDisabled] = React.useState<boolean>(false)
	const [label, setLabel] = React.useState<boolean>(true)

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Date Input</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<CommonProperty
						rounded={rounded}
						setRounded={setRounded}
						size={size}
						setSize={setSize}
						disabled={disabled}
						setDisabled={setDisabled}
						label={label}
						setLabel={setLabel}
					/>
				</DropdownContent>
			</Dropdown>
			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				<DateInput rounded={rounded} size={size} disabled={disabled} label={label ? "Enter date below" : undefined} />
			</div>
		</div>
	)
}

const TimeComp = () => {
	const [rounded, setRounded] = React.useState<RoundedOptions>("sm")
	const [size, setSize] = React.useState<SizeOptions>("40")
	const [disabled, setDisabled] = React.useState<boolean>(false)
	const [is24Hour, setIs24Hour] = React.useState<boolean>(false)
	const [label, setLabel] = React.useState<boolean>(true)
	const [interval, setInterval] = React.useState<number>(15)

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Time Picker</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<CommonProperty
						rounded={rounded}
						setRounded={setRounded}
						size={size}
						setSize={setSize}
						disabled={disabled}
						setDisabled={setDisabled}
						label={label}
						setLabel={setLabel}
					/>
					<DropdownSub>
						<DropdownSubTrigger>24 Hour Mode</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(is24Hour)]}
								onSelectedChange={(values) => setIs24Hour(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>

					<DropdownSub>
						<DropdownSubTrigger>Interval</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(interval)]}
								onSelectedChange={(values) => setInterval(Number(values[0]))}
								minSelectionCount={1}>
								{intervalOptions.map((option) => (
									<DropdownItem key={option} value={option}>
										{`${option} min`}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>

			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				<TimePicker
					label="Label here"
					rounded={rounded as RoundedOptions}
					size={size as SizeOptions}
					disabled={disabled}
					is24Hour={is24Hour}
					interval={interval}
					placeholder="Select time"
					className="w-80"
				/>
			</div>
		</div>
	)
}

const NumberComp = () => {
	const [rounded, setRounded] = React.useState<RoundedOptions>("sm")
	const [size, setSize] = React.useState<SizeOptions>("40")
	const [disabled, setDisabled] = React.useState<boolean>(false)
	const [hasError, setHasError] = React.useState<boolean>(false)
	const [showStepper, setShowStepper] = React.useState<boolean>(true)
	const [label, setLabel] = React.useState<boolean>(true)

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Number</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<CommonProperty
						rounded={rounded}
						setRounded={setRounded}
						size={size}
						setSize={setSize}
						disabled={disabled}
						setDisabled={setDisabled}
						label={label}
						setLabel={setLabel}
					/>
					<DropdownSub>
						<DropdownSubTrigger>HasError</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(hasError)]}
								onSelectedChange={(values) => setHasError(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Show Stepper</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(showStepper)]}
								onSelectedChange={(values) => setShowStepper(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>
			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				{/* <NumberInput
					className="w-80"
					rounded={rounded}
					size={size}
					disabled={disabled}
					label={label ? "Enter how many items to order" : undefined}
					placeholder="Type in digits"
					hasError={hasError}
					hint={hasError ? "There is an error" : undefined}
					showStepper={showStepper}
				/> */}
			</div>
		</div>
	)
}

const InputComp = () => {
	const [rounded, setRounded] = React.useState<RoundedOptions>("sm")
	const [size, setSize] = React.useState<SizeOptions>("40")
	const [disabled, setDisabled] = React.useState<boolean>(false)
	const [suffixIcon, setSuffixIcon] = React.useState<boolean>(false)
	const [prefixIcon, setPrefixIcon] = React.useState<boolean>(false)
	const [hasError, setHasError] = React.useState<boolean>(false)
	const [label, setLabel] = React.useState<boolean>(true)
	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Input</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<CommonProperty
						rounded={rounded}
						setRounded={setRounded}
						size={size}
						setSize={setSize}
						disabled={disabled}
						setDisabled={setDisabled}
						label={label}
						setLabel={setLabel}
					/>
					<DropdownSub>
						<DropdownSubTrigger>SuffixIcon</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(suffixIcon)]}
								onSelectedChange={(values) => setSuffixIcon(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>PrefixIcon</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(prefixIcon)]}
								onSelectedChange={(values) => setPrefixIcon(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>HasError</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(hasError)]}
								onSelectedChange={(values) => setHasError(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>
			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				<Input
					className="w-80"
					rounded={rounded}
					size={size}
					disabled={disabled}
					label={label ? "Username" : undefined}
					placeholder="Enter your username here"
					lead={prefixIcon ? <CircleUserRound /> : null}
					trail={suffixIcon ? <CircleUserRound /> : null}
					hasError={hasError}
					hint={hasError ? "There is an error" : undefined}
				/>
			</div>
		</div>
	)
}

const DatePickerComp = () => {
	const [rounded, setRounded] = React.useState<RoundedOptions>("sm")
	const [size, setSize] = React.useState<SizeOptions>("40")
	const [disabled, setDisabled] = React.useState<boolean>(false)
	const [label, setLabel] = React.useState<boolean>(true)
	const [mode, setMode] = React.useState<DatePickerModes>("single")
	const [showDateRangeShortcut, setShowDateRangeShortcut] = React.useState<boolean>(false)
	const [doubleCalendar, setDoubleCalendar] = React.useState<boolean>(false)
	const [navigatorStyle, setNavigatorStyle] = React.useState<"button" | "selector">("button")

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Date Picker</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<CommonProperty
						rounded={rounded}
						setRounded={setRounded}
						size={size}
						setSize={setSize}
						disabled={disabled}
						setDisabled={setDisabled}
						label={label}
						setLabel={setLabel}
					/>
					<DropdownSub>
						<DropdownSubTrigger>mode</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[mode]}
								onSelectedChange={(values) => setMode(values[0] as DatePickerModes)}
								minSelectionCount={1}>
								<DropdownItem value="single">Single</DropdownItem>
								<DropdownItem value="multiple">Multiple</DropdownItem>
								<DropdownItem value="range">Range</DropdownItem>
								<DropdownItem value="time">Time</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>showDateRangeShortcut</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(showDateRangeShortcut)]}
								onSelectedChange={(values) => setShowDateRangeShortcut(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>doubleCalendar</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(doubleCalendar)]}
								onSelectedChange={(values) => setDoubleCalendar(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>navigatorStyle</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[navigatorStyle]}
								onSelectedChange={(values) => setNavigatorStyle(values[0] as "button" | "selector")}
								minSelectionCount={1}>
								<DropdownItem value="button">Button</DropdownItem>
								<DropdownItem value="selector">Selector</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>

			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				<DatePicker
					mode={mode}
					placeholder="Select Date"
					triggerClassName="w-[320px]"
					showDateRangeShortcut={showDateRangeShortcut}
					disabled={disabled}
					dualCalendar={doubleCalendar}
					navigatorStyle={navigatorStyle}
					size={size}
					rounded={rounded}
				/>
			</div>
		</div>
	)
}

const FileUploadComp = () => {
	const [disabled, setDisabled] = React.useState<string>("false")
	const [rounded, setRounded] = React.useState<"rounded" | "square">("rounded")
	const [label, setLabel] = React.useState(true)

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">File Upload</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<DropdownSub>
						<DropdownSubTrigger>Rounded</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[rounded]}
								onSelectedChange={(values) => setRounded(values[0] as "rounded" | "square")}
								minSelectionCount={1}>
								{["rounded", "square"].map((roundedOption) => (
									<DropdownItem value={roundedOption} key={roundedOption}>
										{roundedOption}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Label</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(label)]}
								onSelectedChange={(values) => setLabel(values[0] === "true")}
								minSelectionCount={1}>
								{booleanOptions.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Disabled</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[disabled]}
								onSelectedChange={(values) => setDisabled(values[0])}
								minSelectionCount={1}>
								{booleanOptions.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>
			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				<FileUpload
				// label={label ? "Label here" : undefined}
				// rounded="lg"
				// value={file}
				// onChange={setFile}
				// dropzoneClassName="h-[12.5rem]"
				// multiple
				// disabled={disabled === "true"}
				// url="https://679b5e2633d3168463239af9.mockapi.io/photo"
				// url="http://localhost:8000/upload"
				// headers={{ "Content-Type": "application/json" }}
				/>
			</div>
		</div>
	)
}

const SliderComp = () => {
	const [withInput, setWithInput] = React.useState<boolean>(false)
	const [showSteppers, setShowSteppers] = React.useState<boolean>(false)
	const [showMarks, setShowMarks] = React.useState(false)
	const [startContent, setStartContent] = React.useState(false)
	const [endContent, setEndContent] = React.useState(false)
	const [showTooltip, setShowTooltip] = React.useState(true)
	const [label, setLabel] = React.useState(true)
	const [disabled, setDisabled] = React.useState(false)
	const [orientation, setOrientation] = React.useState<"horizontal" | "vertical">("horizontal")

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Slider</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<DropdownSub>
						<DropdownSubTrigger>Label</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(label)]}
								onSelectedChange={(values) => setLabel(values[0] === "true")}
								minSelectionCount={1}>
								{booleanOptions.map((val) => (
									<DropdownItem value={val} key={val}>
										{val}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Disabled</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(disabled)]}
								onSelectedChange={(values) => setDisabled(values[0] === "true")}
								minSelectionCount={1}>
								{booleanOptions.map((val) => (
									<DropdownItem value={val} key={val}>
										{val}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>withInput</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(withInput)]}
								onSelectedChange={(values) => setWithInput(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>showSteppers</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(showSteppers)]}
								onSelectedChange={(values) => setShowSteppers(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Show Marks</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(showMarks)]}
								onSelectedChange={(values) => setShowMarks(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>prefixIcon</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(startContent)]}
								onSelectedChange={(values) => setStartContent(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>suffixIcon</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(endContent)]}
								onSelectedChange={(values) => setEndContent(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Orientation</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[orientation]}
								onSelectedChange={(values) => setOrientation(values[0] as "horizontal" | "vertical")}
								minSelectionCount={1}>
								<DropdownItem value="horizontal">Horizontal</DropdownItem>
								<DropdownItem value="vertical">Vertical</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>showTooltip</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(showTooltip)]}
								onSelectedChange={(values) => setShowTooltip(values[0] === "true")}
								minSelectionCount={1}>
								{booleanOptions.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>
			<div className="border-border bg-bg-base flex h-[300px] w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[2rem]">
				<Slider
					label={label ? "Select volume label" : undefined}
					disabled={disabled}
					className="w-80"
					withInput={withInput}
					showSteppers={showSteppers}
					showTooltip={showTooltip}
					marks={
						showMarks
							? [
									{ value: 0, label: "0%" },
									{ value: 20, label: "20%" },
									{ value: 40, label: "40%" },
									{ value: 60, label: "60%" },
									{ value: 80, label: "80%" },
									{ value: 100, label: "100%" },
								]
							: undefined
					}
					leadIcon={startContent ? <VolumeX /> : undefined}
					trailIcon={endContent ? <Volume2 /> : undefined}
					orientation={orientation}
				/>
			</div>
		</div>
	)
}

const SwitchComp = () => {
	const [size, setSize] = React.useState<"20" | "24" | undefined>("24")
	const [disabled, setDisabled] = React.useState(false)
	const [label, setLabel] = React.useState(true)
	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Switch</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<DropdownSub>
						<DropdownSubTrigger>Size</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[size as string]}
								onSelectedChange={(values) => setSize(values[0] as "20" | "24" | undefined)}
								minSelectionCount={1}>
								<DropdownItem value="20">20</DropdownItem>
								<DropdownItem value="24">24</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Disabled</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(disabled)]}
								onSelectedChange={(values) => setDisabled(values[0] === "true")}
								minSelectionCount={1}>
								{booleanOptions.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Label</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(label)]}
								onSelectedChange={(values) => setLabel(values[0] === "true")}
								minSelectionCount={1}>
								{booleanOptions.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>
			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[2rem]">
				<Switch size={size} disabled={disabled}>
					{label ? "Enable notifications" : undefined}
				</Switch>
			</div>
		</div>
	)
}

const TextAreaComp = () => {
	const [resizable, setResizable] = React.useState<boolean>(true)
	const [rows, setRows] = React.useState(4)
	const [rounded, setRounded] = React.useState<"rounded" | "square">("rounded")
	const [label, setLabel] = React.useState(true)
	const [disabled, setDisabled] = React.useState(false)
	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Textarea</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<DropdownSub>
						<DropdownSubTrigger>Rounded</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[rounded]}
								onSelectedChange={(values) => setRounded(values[0] as "rounded" | "square")}
								minSelectionCount={1}>
								{["rounded", "square"].map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Label</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(label)]}
								onSelectedChange={(values) => setLabel(values[0] === "true")}
								minSelectionCount={1}>
								{booleanOptions.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Disabled</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(disabled)]}
								onSelectedChange={(values) => setDisabled(values[0] === "true")}
								minSelectionCount={1}>
								{booleanOptions.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Rows</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(rows)]}
								onSelectedChange={(values) => setRows(parseInt(values[0]))}
								minSelectionCount={1}>
								<DropdownItem value="4">4</DropdownItem>
								<DropdownItem value="5">5</DropdownItem>
								<DropdownItem value="6">6</DropdownItem>
								<DropdownItem value="7">7</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
					<DropdownSub>
						<DropdownSubTrigger>Resizable</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(resizable)]}
								onSelectedChange={(values) => setResizable(values[0] === "true")}
								minSelectionCount={1}>
								<DropdownItem value="true">Yes</DropdownItem>
								<DropdownItem value="false">No</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>
			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[2rem]">
				<TextArea label={label ? "Label here" : undefined} disabled={disabled} rounded={rounded} resizable={resizable} rows={rows} className="w-80" />
			</div>
		</div>
	)
}

const CurrencyComp = () => {
	const [size, setSize] = React.useState<SizeOptions>("40")
	const [rounded, setRounded] = React.useState<RoundedOptions>("sm")
	const [disabled, setDisabled] = React.useState<boolean>(false)
	const [label, setLabel] = React.useState<boolean>(true)

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Currency Input</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<CommonProperty
						rounded={rounded}
						setRounded={setRounded}
						size={size}
						setSize={setSize}
						disabled={disabled}
						setDisabled={setDisabled}
						label={label}
						setLabel={setLabel}
					/>
				</DropdownContent>
			</Dropdown>

			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				<CurrencyInput
					disabled={disabled}
					size={size}
					placeholder="Enter price here"
					className="w-[320px]"
					label={label ? "Price" : undefined}
					rounded={rounded}
				/>
			</div>
		</div>
	)
}

const OTPComp = () => {
	const [size, setSize] = React.useState<SizeOptions>("40")
	const [disabled, setDisabled] = React.useState<boolean>(false)
	const [label, setLabel] = React.useState<boolean>(true)
	const [length, setLength] = React.useState<number>(6)
	const [variant, setVariant] = React.useState<"box" | "flat">("box")
	const [rounded, setRounded] = React.useState<RoundedOptions>("sm")

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">OTP Input</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<CommonProperty
						rounded={rounded}
						setRounded={setRounded}
						size={size}
						setSize={setSize}
						disabled={disabled}
						setDisabled={setDisabled}
						label={label}
						setLabel={setLabel}
					/>
					<DropdownSub>
						<DropdownSubTrigger>Variant</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[variant]}
								onSelectedChange={(values) => setVariant(values[0] as "box" | "flat")}
								minSelectionCount={1}>
								<DropdownItem value="box">Box</DropdownItem>
								<DropdownItem value="flat">Flat</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>

					<DropdownSub>
						<DropdownSubTrigger>Length</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(length)]}
								onSelectedChange={(values) => setLength(Number(values[0]))}
								minSelectionCount={1}>
								{[4, 5, 6, 8, 10].map((len) => (
									<DropdownItem key={len} value={String(len)}>
										{len}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>

			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				<OTPInput
					label={label ? "Label here" : undefined}
					disabled={disabled}
					length={length}
					variant={variant}
					rounded={rounded}
					size={size}
					className="w-[320px]"
					placeholder="Enter OTP"
				/>
			</div>
		</div>
	)
}

const SelectComp = () => {
	const [rounded, setRounded] = React.useState<RoundedOptions>("sm")
	const [size, setSize] = React.useState<SizeOptions>("40")
	const [disabled, setDisabled] = React.useState<boolean>(false)
	const [label, setLabel] = React.useState<boolean>(true)
	const [searchable, setSearchable] = React.useState<string>("false")
	const [selectionMode, setSelectionMode] = React.useState<string>("single")
	const [minSelectionCount, setMinSelectionCount] = React.useState<number>(0)

	const [selectedValues, setSelectedValues] = React.useState<string[]>([])

	return (
		<div className="flex flex-col gap-2">
			<h6 className="font-heading text-[20px] font-bold">Select</h6>
			<Dropdown>
				<DropdownTrigger>Properties</DropdownTrigger>
				<DropdownContent>
					<CommonProperty
						rounded={rounded}
						setRounded={setRounded}
						label={label}
						setLabel={setLabel}
						size={size}
						setSize={setSize}
						disabled={disabled}
						setDisabled={setDisabled}
					/>
					<DropdownSub>
						<DropdownSubTrigger>Searchable</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[searchable]}
								onSelectedChange={(values) => setSearchable(values[0])}
								minSelectionCount={1}>
								{booleanOptions.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>

					<DropdownSub>
						<DropdownSubTrigger>Selection Mode</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[selectionMode]}
								onSelectedChange={(values) => setSelectionMode(values[0])}
								minSelectionCount={1}>
								{selectionModes.map((option) => (
									<DropdownItem key={option} value={option}>
										{option}
									</DropdownItem>
								))}
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>

					<DropdownSub>
						<DropdownSubTrigger>Min Selection Count</DropdownSubTrigger>
						<DropdownSubContent>
							<DropdownGroup
								selectionMode="single"
								selectedValues={[String(minSelectionCount)]}
								onSelectedChange={(values) => setMinSelectionCount(Number(values[0]))}
								minSelectionCount={1}>
								<DropdownItem value="0">0</DropdownItem>
								<DropdownItem value="1">1</DropdownItem>
								<DropdownItem value="2">2</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>

			<div className="border-border bg-bg-base flex h-fit w-full items-center justify-center rounded-[0.5rem] border px-[2rem] py-[3rem]">
				<Select
					label={label ? "Choose your favourite framework" : undefined}
					placeholder="Pick an option"
					rounded={rounded as RoundedOptions}
					size={size as SizeOptions}
					disabled={disabled}
					isSearchable={searchable === "true"}
					selectionMode={selectionMode as "single" | "multiple"}
					minSelectionCount={minSelectionCount}
					selectedValues={selectedValues}
					onSelectedChange={setSelectedValues}
					className="w-80">
					<SelectGroup label="Backend Frameworks">
						<SelectItem value="node-js">Node.js (Express)</SelectItem>
						<SelectItem value="django">Django (Python)</SelectItem>
						<SelectItem value="rails">Rails (Ruby)</SelectItem>
						<SelectItem value="laravel">Laravel (PHP)</SelectItem>
						<SelectItem value="spring">Spring Boot (Java)</SelectItem>
					</SelectGroup>
					<SelectGroup label="Mobile Frameworks">
						<SelectItem value="react-native">React Native</SelectItem>
						<SelectItem value="flutter">Flutter</SelectItem>
						<SelectItem value="swiftui">SwiftUI</SelectItem>
						<SelectItem value="kotlin-compose">Kotlin Compose</SelectItem>
						<SelectItem value="xamarin">Xamarin</SelectItem>
					</SelectGroup>
				</Select>
			</div>
		</div>
	)
}

export default page
