import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type DatePickerModes = "single" | "multiple" | "range"

const QuickSelectionCalendarPreview = () => {
	const [mode, setMode] = useState<DatePickerModes>("range")
	const [quickSelection, setquickSelection] = useState<boolean>(false)

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
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
							<DropdownSubTrigger>Quick Selection</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(quickSelection)} onValueChange={(value) => setquickSelection(value === "true")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className={`flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10`}>
					{mode === "single" && <Calendar quickSelection={quickSelection} mode={"single"} showOutsideDays />}
					{mode === "multiple" && <Calendar quickSelection={quickSelection} mode={"multiple"} showOutsideDays />}
					{mode === "range" && <Calendar quickSelection={quickSelection} mode={"range"} showOutsideDays />}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="calendar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Calendar
    mode="${mode}"
    quickSelection={${quickSelection}}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default QuickSelectionCalendarPreview
