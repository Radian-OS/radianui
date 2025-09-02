import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import { DatePicker } from "@/registry/ui/date-picker"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownRadioGroup,
	DropdownRadioItem,
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
	const [doubleCalendar, setDoubleCalendar] = useState<boolean>(false)
	const [footer, setFooter] = useState<boolean>(false)
	const [typeable, setTypeable] = useState<boolean>(false)

	const [label, setLabel] = useState<boolean>(true)
	const [hasError, setHasError] = useState<boolean>(false)
	const [hint, setHint] = useState<boolean>(false)

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
						<DropdownGroup title="input">
							<DropdownSub>
								<DropdownSubTrigger>Rounded</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={rounded} onValueChange={(value) => setRounded(value as RoundedOptions)}>
										{roundedOptions.map((roundedOption) => (
											<DropdownRadioItem value={roundedOption} key={roundedOption} onSelect={(e) => e.preventDefault()}>
												{roundedOption}
											</DropdownRadioItem>
										))}
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as SizeOptions)}>
										{sizes.map((size) => (
											<DropdownRadioItem value={size} key={size} onSelect={(e) => e.preventDefault()}>
												{size}
											</DropdownRadioItem>
										))}
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Label</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={String(label)} onValueChange={(value) => setLabel(value === "true")}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Disabled</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={String(disabled)} onValueChange={(value) => setDisabled(value === "true")}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Has error</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={String(hasError)} onValueChange={(value) => setHasError(value === "true")}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Hint</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={String(hint)} onValueChange={(value) => setHint(value === "true")}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownGroup>

						<DropdownGroup title="date picker">
							<DropdownSub>
								<DropdownSubTrigger>Mode</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={mode} onValueChange={(value) => setMode(value as DatePickerModes)}>
										{!typeable && (
											<>
												<DropdownRadioItem value="single" onSelect={(e) => e.preventDefault()}>
													Single
												</DropdownRadioItem>
												<DropdownRadioItem value="multiple" onSelect={(e) => e.preventDefault()}>
													Multiple
												</DropdownRadioItem>
											</>
										)}
										<DropdownRadioItem value="range" onSelect={(e) => e.preventDefault()}>
											Range
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Dual calendar</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={String(doubleCalendar)} onValueChange={(value) => setDoubleCalendar(value === "true")}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
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
							<DropdownSub>
								<DropdownSubTrigger>Typeable</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={String(typeable)} onValueChange={(value) => setTypeable(value === "true")}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownGroup>
					</DropdownContent>
				</Dropdown>
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
						dual={doubleCalendar}
						typeable={typeable}
						size={size}
						footer={
							footer && (
								<div className="flex gap-2 p-3">
									<Button variant="outline">Cancel</Button>
									<Button>Apply</Button>
								</div>
							)
						}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="date-picker.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<DatePicker
    mode="${mode}"
    placeholder="Select Date"
    disabled={${disabled}}
    dual={${doubleCalendar}}
    size="${size}"
    rounded="${rounded}"
    typeable={${typeable}}
	hasError={${hasError}}
	${hint ? `hint="Hint text to help the user with input"` : ""}
    footer=${
			footer
				? `{
       		<div className="p-3 flex gap-2">
            	<Button variant="outline">Cancel</Button>
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
