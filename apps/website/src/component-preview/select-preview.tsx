import { useState } from "react"
import { Box, CircleUserRound } from "lucide-react"
import { CodeArea } from "@/registry/ui/code"
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
import { Select, SelectGroup, SelectItem } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type VariantOptions = "input" | "button" | "tags"
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const sizes = ["28", "32", "36", "40", "44", "48"]

const SelectPreview = () => {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [size, setSize] = useState<SizeOptions>("36")
	const [searchable, setSearchable] = useState<boolean>(false)
	const [selectionMode, setSelectionMode] = useState<string>("single")
	// const [minSelectionCount, setMinSelectionCount] = useState<number>(0)
	const [label, setLabel] = useState(true)
	const [disabled, setDisabled] = useState(false)
	const [variant, setVariant] = useState<VariantOptions>("input")

	const [selectedValues, setSelectedValues] = useState<string[]>([])

	// const [trailIcon, setTrailIcon] = useState<boolean>(false)
	const [leadIcon, setLeadIcon] = useState<boolean>(false)

	const [hasError, setHasError] = useState<boolean>(false)
	const [hint, setHint] = useState<boolean>(false)

	const [startContent, setStartContent] = useState<boolean>(false)
	const [endContent, setEndContent] = useState<boolean>(false)

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
							<DropdownGroup title="Input Variants">
								<DropdownSub>
									<DropdownSubTrigger>Hint</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup selectionMode="single" selectedValues={[String(hint)]} onSelectedChange={(values) => setHint(values[0] === "true")} minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
								<DropdownSub>
									<DropdownSubTrigger>Has error</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											selectedValues={[String(hasError)]}
											onSelectedChange={(values) => setHasError(values[0] === "true")}
											minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
							</DropdownGroup>

							<DropdownDivider />

							<DropdownGroup title="Select Properties">
								<DropdownSub>
									<DropdownSubTrigger>Variant</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											selectedValues={[String(variant)]}
											onSelectedChange={(values) => setVariant(values[0] as VariantOptions)}
											minSelectionCount={1}>
											<DropdownItem value="input">Input</DropdownItem>
											<DropdownItem value="button">Button</DropdownItem>
											<DropdownItem value="tags">Tags</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
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
										<DropdownGroup
											selectionMode="single"
											selectedValues={[String(disabled)]}
											onSelectedChange={(values) => setDisabled(values[0] === "true")}
											minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
								<DropdownSub>
									<DropdownSubTrigger>Searchable</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											selectedValues={[String(searchable)]}
											onSelectedChange={(values) => setSearchable(values[0] === "true")}
											minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>Selection Mode</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup selectionMode="single" selectedValues={[selectionMode]} onSelectedChange={(values) => setSelectionMode(values[0])} minSelectionCount={1}>
											<DropdownItem value="single">Single</DropdownItem>
											<DropdownItem value="multiple">Multiple</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
								{/* 
							<DropdownSub>
								<DropdownSubTrigger>Trail</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(trailIcon)]}
										onSelectedChange={(values) => setTrailIcon(values[0] === "true")}
										minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub> */}
								<DropdownSub>
									<DropdownSubTrigger>Lead</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											selectedValues={[String(leadIcon)]}
											onSelectedChange={(values) => setLeadIcon(values[0] === "true")}
											minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>Start Content</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											selectedValues={[String(startContent)]}
											onSelectedChange={(values) => setStartContent(values[0] === "true")}
											minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>End Content</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											selectedValues={[String(endContent)]}
											onSelectedChange={(values) => setEndContent(values[0] === "true")}
											minSelectionCount={1}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								{/* <DropdownSub>
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
							</DropdownSub> */}
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
					<Select
						label={label ? "Choose your favourite framework" : undefined}
						placeholder="Pick an option"
						variants={variant}
						rounded={rounded}
						lead={leadIcon ? <CircleUserRound className={iconClass} /> : null}
						// trail={trailIcon ? <CircleUserRound className={iconClass} /> : null}
						size={size}
						disabled={disabled}
						isSearchable={searchable}
						selectionMode={selectionMode as "single" | "multiple"}
						// minSelectionCount={minSelectionCount}
						selectedValues={selectedValues}
						onSelectedChange={setSelectedValues}
						hasError={hasError}
						hint={hint ? "Hint text to help the user with input" : ""}
						className="w-80">
						<SelectGroup label="Backend Frameworks">
							<SelectItem startContent={startContent ? <Box className={iconClass} /> : null} endContent={endContent ? <Box className={iconClass} /> : null} value="node-js">
								Node.js (Express)
							</SelectItem>
							<SelectItem startContent={startContent ? <Box className={iconClass} /> : null} endContent={endContent ? <Box className={iconClass} /> : null} value="django">
								Django (Python)
							</SelectItem>
							<SelectItem value="rails">Rails (Ruby)</SelectItem>
							<SelectItem disabled value="laravel">
								Laravel (PHP)
							</SelectItem>
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
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`const [selectedValues, setSelectedValues] = useState<string[]>([])
						
<Select
	label="${label ? "Choose your favourite framework" : undefined}"
	placeholder="Pick an option"
	variants="${variant}"
	rounded="${rounded}"
	size="${size}"
	${hint ? `hint="Hint text to help the user with input"` : ""}
	hasError={${hasError}}
	disabled={${disabled}}
	isSearchable={${searchable}}
	selectionMode="${selectionMode}"
	${leadIcon ? `lead={<CircleUserRound className="${iconClass}" />}` : ""}
	selectedValues={selectedValues}
	onSelectedChange={setSelectedValues}
	className="w-80">
	<SelectGroup label="Backend Frameworks">
		<SelectItem value="node-js">Node.js (Express)</SelectItem>
		<SelectItem value="django">Django (Python)</SelectItem>
		<SelectItem value="rails">Rails (Ruby)</SelectItem>
		<SelectItem disabled value="laravel">Laravel (PHP)</SelectItem>
		<SelectItem value="spring">Spring Boot (Java)</SelectItem>
	</SelectGroup>
	<SelectGroup label="Mobile Frameworks">
		<SelectItem value="react-native">React Native</SelectItem>
		<SelectItem value="flutter">Flutter</SelectItem>
		<SelectItem value="swiftui">SwiftUI</SelectItem>
		<SelectItem value="kotlin-compose">Kotlin Compose</SelectItem>
		<SelectItem value="xamarin">Xamarin</SelectItem>
	</SelectGroup>
</Select>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SelectPreview
