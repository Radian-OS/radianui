import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type DatePickerModes = "single" | "multiple" | "range"

const FooterCalendarPreview = () => {
	const [mode, setMode] = useState<DatePickerModes>("range")
	const [footer, setFooter] = useState<boolean>(false)

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
							<DropdownSubTrigger>Footer</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(footer)} onValueChange={(value) => setFooter(value === "true")}>
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
					{mode === "single" && (
						<Calendar
							mode={"single"}
							footer={
								footer && (
									<div className="flex gap-2 p-3">
										<Button variant="outline">Cancel</Button>
										<Button>Apply</Button>
									</div>
								)
							}
							showOutsideDays
						/>
					)}
					{mode === "multiple" && (
						<Calendar
							mode={"multiple"}
							footer={
								footer && (
									<div className="flex gap-2 p-3">
										<Button variant="outline">Cancel</Button>
										<Button>Apply</Button>
									</div>
								)
							}
							showOutsideDays
						/>
					)}
					{mode === "range" && (
						<Calendar
							mode={"range"}
							footer={
								footer && (
									<div className="flex gap-2 p-3">
										<Button variant="outline">Cancel</Button>
										<Button>Apply</Button>
									</div>
								)
							}
							showOutsideDays
						/>
					)}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="calendar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Calendar
    mode="${mode}"
	${footer ? 'footer={\n			<div className="flex gap-2 p-3">\n				<Button variant="outline">Cancel</Button>\n				<Button>Apply</Button>\n			</div>}' : ""}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default FooterCalendarPreview
