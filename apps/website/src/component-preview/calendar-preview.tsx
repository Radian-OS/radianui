import { useState } from "react"
import { Button } from "@/registry/ui/button"
import Calendar from "@/registry/ui/calendar"
import { CodeArea } from "@/registry/ui/code"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type DatePickerModes = "single" | "multiple" | "range"

const CalendarPreview = () => {
	const [mode, setMode] = useState<DatePickerModes>("range")
	const [doubleCalendar, setDoubleCalendar] = useState<boolean>(false)
	const [showTime, setShowTime] = useState<boolean>(false)
	const [showShortcut, setShowShortCut] = useState<boolean>(false)
	const [footer, setFooter] = useState<boolean>(false)

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent>
							<DropdownSub>
								<DropdownSubTrigger>Selection Mode</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[mode]}
										onSelectedChange={(values) => setMode(values[0] as DatePickerModes)}
										minSelectionCount={1}>
										<DropdownItem value="single">Single</DropdownItem>
										<DropdownItem value="multiple">Multiple</DropdownItem>
										<DropdownItem value="range">Range</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Dual Calendar</DropdownSubTrigger>
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
								<DropdownSubTrigger>Show Shortcut</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(showShortcut)]}
										onSelectedChange={(values) => setShowShortCut(values[0] === "true")}
										minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Footer</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(footer)]}
										onSelectedChange={(values) => setFooter(values[0] === "true")}
										minSelectionCount={1}>
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
				<div
					className={`flex h-[420px] flex-col ${doubleCalendar && showShortcut ? "" : "items-center"} justify-center overflow-auto rounded-xl border px-10`}>
					{mode === "single" && (
						<Calendar
							showShortcut={showShortcut}
							mode={"single"}
							footer={
								footer && (
									<div className="flex gap-2 p-3">
										<Button variant="neutral-outline">Cancel</Button>
										<Button>Apply</Button>
									</div>
								)
							}
							showTime={showTime}
							dualCalendar={doubleCalendar}
							showOutsideDays
						/>
					)}
					{mode === "multiple" && (
						<Calendar
							showShortcut={showShortcut}
							mode={"multiple"}
							showTime={showTime}
							footer={
								footer && (
									<div className="flex gap-2 p-3">
										<Button variant="neutral-outline">Cancel</Button>
										<Button>Apply</Button>
									</div>
								)
							}
							dualCalendar={doubleCalendar}
							showOutsideDays
						/>
					)}
					{mode === "range" && (
						<Calendar
							showShortcut={showShortcut}
							mode={"range"}
							footer={
								footer && (
									<div className="flex gap-2 p-3">
										<Button variant="neutral-outline">Cancel</Button>
										<Button>Apply</Button>
									</div>
								)
							}
							showTime={showTime}
							dualCalendar={doubleCalendar}
							showOutsideDays
						/>
					)}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`  
<Calendar
    mode="${mode}"
    dualCalendar=${doubleCalendar}
    showTime=${showTime}
    showShortcut=${showShortcut}
    footer=${
			footer &&
			`{
            <div className="p-3 flex gap-2">
                <Button variant="neutral-outline">Cancel</Button>
                <Button>Apply</Button>
            </div>
            }`
		}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default CalendarPreview
