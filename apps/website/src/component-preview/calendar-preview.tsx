import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type DatePickerModes = "single" | "multiple" | "range"

const CalendarPreview = () => {
	const [mode, setMode] = useState<DatePickerModes>("single")
	const [totalCalendar, setTotalCalendar] = useState<number>(1)
	const [selectedSingle, setSelectedSingle] = useState<Date | undefined>(undefined)

	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent>
						<DropdownSub>
							<DropdownSubTrigger>Selection</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={mode} onValueChange={(value) => setMode(value as DatePickerModes)}>
									<DropdownRadioItem value="single" onSelect={(e) => e.preventDefault()}>
										Single
									</DropdownRadioItem>
									<DropdownRadioItem value="multiple" onSelect={(e) => e.preventDefault()}>
										Multiple
									</DropdownRadioItem>
									<DropdownRadioItem value="range" onSelect={(e) => e.preventDefault()}>
										Range
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Number of Months</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(totalCalendar)} onValueChange={(value) => setTotalCalendar(Number(value))}>
									<DropdownRadioItem value="1" onSelect={(e) => e.preventDefault()}>
										1
									</DropdownRadioItem>
									<DropdownRadioItem value="2" onSelect={(e) => e.preventDefault()}>
										2
									</DropdownRadioItem>
									<DropdownRadioItem value="3" onSelect={(e) => e.preventDefault()}>
										3
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className={`flex h-[420px] flex-col ${totalCalendar === 3 ? "" : "items-center"} justify-center overflow-auto rounded-xl border px-10`}>
					{mode === "single" && <Calendar mode="single" selected={selectedSingle} onSelect={setSelectedSingle} numberOfMonths={totalCalendar} />}
					{mode === "multiple" && <Calendar mode="multiple" numberOfMonths={totalCalendar} />}
					{mode === "range" && <Calendar mode="range" numberOfMonths={totalCalendar} />}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="calendar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Calendar
    mode="${mode}"
	numberOfMonths={${totalCalendar}}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default CalendarPreview
