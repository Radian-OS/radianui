"use client"

import React from "react"
import { BellOff, BellRing } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { CurrencyInput } from "../ui/currency-amount"
import DatePicker from "../ui/date-picker"
import { Divider } from "../ui/divider"
import FileUpload from "../ui/file-upload"
import { Input, type RoundedOptions, type SizeOptions } from "../ui/input"
import { InputOtp } from "../ui/input-otp"
import { Password } from "../ui/password"
import { ProgressBar } from "../ui/progress-bar"
import SearchInput from "../ui/search"
import { Select, SelectItem } from "../ui/select"
import Slider from "../ui/slider"
import { TextArea } from "../ui/text-area"
import TimePicker from "../ui/time-picker"

const sizes = ["32", "36", "40", "44", "48", "56"] as const

const InputExample = () => {
	const [size, setSize] = React.useState<SizeOptions>("40")
	const [rounded, setRounded] = React.useState<RoundedOptions>("md")
	// const [phone, setPhone] = React.useState("")
	const [query, setQuery] = React.useState("")
	const [searchResults, setSearchResults] = React.useState<{ id: string; title: string }[]>([])
	const [currency, setCurrency] = React.useState("")
	// const [file, setFile] = React.useState<File[]>([])
	const [input, setInput] = React.useState<string>("")

	const [progress, setProgress] = React.useState<number>(50)
	const [sliderValue, setSliderValue] = React.useState<number[]>([10, 40])

	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(50), 400)
		return () => clearTimeout(timer)
	}, [])

	React.useEffect(() => {
		const fetchResults = async () => {
			try {
				const results = await fetch("https://dummyjson.com/products/search?q=" + query)
				const data = await results.json()
				if (data.products.length > 0) setSearchResults(data.products)
			} catch (err) {
				console.log(err)
			}
		}
		fetchResults()
	}, [query])

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
		<div className="mb-20 mt-4 flex max-w-[25rem] flex-col gap-2">
			<div className="flex flex-col gap-4 md:flex-row">
				<div>
					<Select placeholder="Size" selectedValues={[size]} onSelectedChange={(values) => setSize(values[0] as SizeOptions)} label="Size">
						{sizes.map((sizeOption) => (
							<SelectItem key={sizeOption} value={sizeOption}>
								{sizeOption}
							</SelectItem>
						))}
					</Select>
				</div>

				<div>
					<Select label="Roundness" placeholder="Select Radius" selectedValues={[rounded]} onSelectedChange={([value]) => setRounded(value as RoundedOptions)}>
						<SelectItem value="square">Square</SelectItem>
						<SelectItem value="rounded">Rounded</SelectItem>
						<SelectItem value="full">Full</SelectItem>
					</Select>
				</div>
			</div>

			<Select placeholder="Select" size={size} rounded={rounded}>
				<SelectItem value="1">1</SelectItem>
			</Select>

			<Input label="Username" placeholder="Controlled Input" size={size} rounded={rounded} value={input} onChange={(e) => setInput(e.target.value)} />
			<Input placeholder="Disabled" disabled={true} size={size} rounded={rounded} />
			<Input placeholder="With error" hint="Invalid username" hasError={true} size={size} rounded={rounded} />

			<Divider spacing="4" />

			<Input label="Email" placeholder="Placeholder here" type="email" size={size} rounded={rounded} />

			<Divider spacing="4" />

			<Password label="Password" placeholder="Password here" size={size} rounded={rounded} />
			<Password placeholder="Disabled" disabled={true} size={size} rounded={rounded} />
			<Password hint="The input field has an error" hasError={true} size={size} rounded={rounded} />

			<Divider spacing="4" />
			{/* 
			<NumberInput label="Number" placeholder="Placeholder" showStepper={false} size={size} rounded={rounded} /> */}
			<Input label="Enter URL" placeholder="Placeholder here" type="url" size={size} rounded={rounded} />

			<Divider spacing="4" />

			<SearchInput
				label="Search"
				placeholder="Search"
				size={size}
				rounded={rounded}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				renderSearchResults={renderSearchResults}
				className="w-80"
			/>

			<Divider spacing="4" />

			<TextArea placeholder="Hello test" rows={10} resizable={true} className="font-medium" />

			<Divider spacing="4" />

			{/* <span>{phone}</span> */}
			{/* <PhoneNumber defaultCountryCode="NP" onValueChange={setPhone} size={size} rounded={rounded} /> */}

			<Divider spacing="4" />

			<CurrencyInput
				value={currency}
				onChange={(e) => {
					console.log(e.target.value)
					setCurrency(e.target.value)
				}}
				size={size}
				rounded={rounded}
				currency="JPY"
			/>
			<InputOtp size={"56"} label="Enter 6 digit number" length={8} placeholder="467856" />

			<TimePicker interval={25} placeholder="Select Time" className="w-[10rem]" size={size} rounded={rounded} />

			<TimePicker is24Hour={true} placeholder="Select Time" className="w-[10rem]" size={size} rounded={rounded} />

			<TimePicker placeholder="Select Time" className="w-[10rem]" size={size} rounded={rounded} minTime="00:05" allowEmptySelection={false} />

			<Calendar mode={"single"} />
			<Calendar mode={"multiple"} />
			<Calendar mode={"range"} />

			<div className="flex flex-col gap-3">
				<DatePicker placeholder="Default datepicker" navigatorStyle="selector" />
				<DatePicker triggerClassName="w-[10rem]" navigatorStyle="selector" mode="single" placeholder="Single Date" />
				<DatePicker placeholder="Range with 2 months" triggerClassName="w-[15rem]" mode="range" dual={true} showDateRangeShortcut={true} />
			</div>
			<FileUpload
			// value={file}
			// onChange={setFile}
			// dropzoneClassName="h-[12.5rem]"
			// multiple
			// url="https://679b5e2633d3168463239af9.mockapi.io/photo"
			// url="http://localhost:8000/upload"
			// headers={{ "Content-Type": "application/json" }}
			/>

			<ProgressBar value={progress} />

			<div className="my-4 flex w-full flex-col gap-4">
				<Slider label="Test label" start={<BellOff size={20} />} end={<BellRing size={20} />} />

				<Slider value={sliderValue} onValueChange={setSliderValue} />

				<Slider withInput={true} min={-50} max={50} />

				<Slider defaultValue={[550, 1000]} min={500} max={1200} />

				<Slider showSteppers={true} />

				{/* <Slider showSteppers={true} step={20} /> */}

				<Slider
					step={20}
					marks={[
						{ value: 0, label: "0%" },
						{ value: 20, label: "20%" },
						{ value: 40, label: "40%" },
						{ value: 60, label: "60%" },
						{ value: 80, label: "80%" },
						{ value: 100, label: "100%" },
					]}
				/>

				{/* <Slider
					defaultValue={[20, 60]}
					step={20}
					marks={[
						{ value: 0, label: "0%" },
						{ value: 20, label: "20%" },
						{ value: 40, label: "40%" },
						{ value: 60, label: "60%" },
						{ value: 80, label: "80%" },
						{ value: 100, label: "100%" },
					]}
				/> */}
				<Slider className="my-2" disabled={true} defaultValue={[50]} label="Disabled slider" />

				<div className="flex h-64 gap-5">
					<Slider orientation="vertical" />
					<Slider start={<BellOff size={20} />} end={<BellRing size={20} />} orientation="vertical" />

					<Slider
						label="Vertical Label"
						orientation="vertical"
						step={20}
						marks={[
							{ value: 0, label: "0%" },
							{ value: 20, label: "20%" },
							{ value: 40, label: "40%" },
							{ value: 60, label: "60%" },
							{ value: 80, label: "80%" },
							{ value: 100, label: "100%" },
						]}
					/>
				</div>
			</div>
		</div>
	)
}

export default InputExample
