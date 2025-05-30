import { useState } from "react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import DatePicker from "@/registry/ui/date-picker"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownGroup,
	DropdownItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type DatePickerModes = "single" | "multiple" | "range" | "time"
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const sizes = ["28", "32", "36", "40", "44", "48"]

const DatePickerPreview = () => {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<boolean>(false)
	const [mode, setMode] = useState<DatePickerModes>("range")
	const [showDateRangeShortcut, setShowDateRangeShortcut] = useState<boolean>(false)
	const [doubleCalendar, setDoubleCalendar] = useState<boolean>(false)
	const [showTime, setShowTime] = useState<boolean>(false)
	const [footer, setFooter] = useState<boolean>(false)
	const [typeable, setTypeable] = useState<boolean>(false)

	const [label, setLabel] = useState<boolean>(true)
	const [hasError, setHasError] = useState<boolean>(false)
	const [hint, setHint] = useState<boolean>(false)

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent>
							<DropdownGroup title="input">
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
							</DropdownGroup>
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
								<DropdownSubTrigger>Has error</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(hasError)]} onSelectedChange={(values) => setHasError(values[0] === "true")} minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Hint</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(hint)]} onSelectedChange={(values) => setHint(values[0] === "true")} minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownDivider />

							<DropdownGroup title="date picker">
								<DropdownSub>
									<DropdownSubTrigger>Mode</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup selectionMode="single" selectedValues={[mode]} onSelectedChange={(values) => setMode(values[0] as DatePickerModes)} minSelectionCount={1}>
											{!typeable && (
												<>
													<DropdownItem value="single">Single</DropdownItem>
													<DropdownItem value="multiple">Multiple</DropdownItem>
												</>
											)}
											<DropdownItem value="range">Range</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
								<DropdownSub>
									<DropdownSubTrigger>Show shortcut</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											selectedValues={[String(showDateRangeShortcut)]}
											onSelectedChange={(values) => setShowDateRangeShortcut(values[0] === "true")}
											minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
								<DropdownSub>
									<DropdownSubTrigger>Dual calendar</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											selectedValues={[String(doubleCalendar)]}
											onSelectedChange={(values) => setDoubleCalendar(values[0] === "true")}
											minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
								<DropdownSub>
									<DropdownSubTrigger>Time</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											selectedValues={[String(showTime)]}
											onSelectedChange={(values) => setShowTime(values[0] === "true")}
											minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
								<DropdownSub>
									<DropdownSubTrigger>Footer</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup selectionMode="single" selectedValues={[String(footer)]} onSelectedChange={(values) => setFooter(values[0] === "true")} minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
								<DropdownSub>
									<DropdownSubTrigger>Typeable</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											selectedValues={[String(typeable)]}
											onSelectedChange={(values) => setTypeable(values[0] === "true")}
											minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<DatePicker
						mode={mode}
						label={label ? "Date picker" : undefined}
						hasError={hasError}
						hint={hint ? "Hint text to help the user with input" : ""}
						disabled={disabled}
						triggerClassName="w-[320px]"
						showDateRangeShortcut={showDateRangeShortcut}
						dualCalendar={doubleCalendar}
						showTime={showTime}
						typeable={typeable}
						size={size}
						rounded={rounded}
						footer={
							footer && (
								<div className="flex gap-2 p-3">
									<Button variant="neutral-outline">Cancel</Button>
									<Button>Apply</Button>
								</div>
							)
						}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<DatePicker
    mode="${mode}"
    placeholder="Select Date"
    showDateRangeShortcut={${showDateRangeShortcut}}
    disabled={${disabled}}
    dualCalendar={${doubleCalendar}}
    showTime={${showTime}}
    size="${size}"
    rounded="${rounded}"
    typeable={${typeable}}
	hasError={${hasError}}
	${hint ? `hint="Hint text to help the user with input"` : ""}
    footer=${
			footer
				? `{
       		<div className="p-3 flex gap-2">
            	<Button variant="neutral-outline">Cancel</Button>
            	<Button>Apply</Button>
        	</div>
		}`
				: `{false}`
		}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default DatePickerPreview
