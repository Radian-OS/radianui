import { useState } from "react"
import { Clock } from "lucide-react"
import { CodeArea } from "@/registry/ui/code-area"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import TimePicker from "@/registry/ui/time-picker"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const sizes = ["28", "32", "36", "40", "44", "48"]

const TimePickerPreview = () => {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<boolean>(false)
	const [label, setLabel] = useState<boolean>(true)

	const [is24Hour, setIs24Hour] = useState<boolean>(false)
	const [interval, setInterval] = useState<number>(15)

	const intervalOptions = ["15", "30", "60"]

	const [leadIcon, setLeadIcon] = useState<boolean>(false)

	const sizeHeightMapping: Record<number, string> = {
		28: "h-4 w-4",
		32: "h-5 w-5",
		36: "h-5 w-5",
		40: "h-5 w-5",
		44: "h-6 w-6",
		48: "h-6 w-6",
	}

	const iconClass = sizeHeightMapping[size] ?? ""

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent>
							<DropdownSub>
								<DropdownSubTrigger>Rounded</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[rounded]} onSelectedChange={(values) => setRounded(values[0] as RoundedOptions)} minSelectionCount={1}>
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
									<DropdownGroup selectionMode="single" selectedValues={[size]} onSelectedChange={(values) => setSize(values[0] as SizeOptions)} minSelectionCount={1}>
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
									<DropdownGroup selectionMode="single" selectedValues={[String(label)]} onSelectedChange={(values) => setLabel(values[0] === "true")} minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Disabled</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(disabled)]} onSelectedChange={(values) => setDisabled(values[0] === "true")} minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>24 Hour Mode</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(is24Hour)]} onSelectedChange={(values) => setIs24Hour(values[0] === "true")} minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Interval</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(interval)]} onSelectedChange={(values) => setInterval(Number(values[0]))} minSelectionCount={1}>
										{intervalOptions.map((option) => (
											<DropdownItem key={option} value={option}>
												{`${option} min`}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Lead</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(leadIcon)]} onSelectedChange={(values) => setLeadIcon(values[0] === "true")} minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<TimePicker
						label={label ? "Time Picker" : undefined}
						rounded={rounded as RoundedOptions}
						size={size as SizeOptions}
						lead={leadIcon ? <Clock className={iconClass} /> : null}
						disabled={disabled}
						is24Hour={is24Hour}
						interval={interval}
						placeholder="Select time"
						classNames={{ base: "w-[320px] flex" }}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<TimePicker
    label="${label}"
    rounded="${rounded}"
    size={${size}}
    disabled={${disabled}}
    is24Hour={${is24Hour}}
    interval={${interval}}
    placeholder="Select time"
    classNames={{ base: "w-[320px] flex" }}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default TimePickerPreview
