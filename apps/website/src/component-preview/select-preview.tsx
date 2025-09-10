import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
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
import { Select, SelectContent, SelectDivider, SelectGroup, SelectItem, SelectLabel } from "@/registry/ui/select"
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
						<DropdownGroup title="Input Variants">
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
						</DropdownGroup>

						<DropdownGroup title="Select Properties">
							<DropdownSub>
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={String(variant)} onValueChange={(value) => setVariant(value as VariantOptions)}>
										<DropdownRadioItem value="input" onSelect={(e) => e.preventDefault()}>
											Input
										</DropdownRadioItem>
										<DropdownRadioItem value="button" onSelect={(e) => e.preventDefault()}>
											Button
										</DropdownRadioItem>
										<DropdownRadioItem value="tags" onSelect={(e) => e.preventDefault()}>
											Tags
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
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
								<DropdownSubTrigger>Searchable</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={String(searchable)} onValueChange={(value) => setSearchable(value === "true")}>
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
								<DropdownSubTrigger>Selection Mode</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={selectionMode} onValueChange={(value) => setSelectionMode(value)}>
										<DropdownRadioItem value="single" onSelect={(e) => e.preventDefault()}>
											Single
										</DropdownRadioItem>
										<DropdownRadioItem value="multiple" onSelect={(e) => e.preventDefault()}>
											Multiple
										</DropdownRadioItem>
									</DropdownRadioGroup>
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
									<DropdownRadioGroup value={String(leadIcon)} onValueChange={(value) => setLeadIcon(value === "true")}>
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
								<DropdownSubTrigger>Start Content</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={String(startContent)} onValueChange={(value) => setStartContent(value === "true")}>
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
								<DropdownSubTrigger>End Content</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={String(endContent)} onValueChange={(value) => setEndContent(value === "true")}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
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

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Select indicatorPosition="right">
						<SelectContent className="max-h-96">
							<SelectGroup>
								<SelectLabel>Backend Frameworks</SelectLabel>
								<SelectItem value="node-js">Node.js (Express)</SelectItem>
								<SelectItem value="django">Django (Python)</SelectItem>
								<SelectItem value="rails">Rails (Ruby)</SelectItem>
								<SelectItem disabled value="laravel">
									Laravel (PHP)
								</SelectItem>
								<SelectItem value="spring">Spring Boot (Java)</SelectItem>
							</SelectGroup>
							<SelectDivider />
							<SelectGroup>
								<SelectLabel>Mobile Frameworks</SelectLabel>
								<SelectItem value="react-native">React Native</SelectItem>
								<SelectItem value="flutter">Flutter</SelectItem>
								<SelectItem value="swiftui">SwiftUI</SelectItem>
								<SelectItem value="kotlin-compose">Kotlin Compose</SelectItem>
								<SelectItem value="xamarin">Xamarin</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="select.tsx"
					showLineNumber
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
		<SelectItem 
		${startContent ? `startContent={<Box className="${iconClass}" />}` : ""}
		${endContent ? `endContent={<Box className="${iconClass}" />}` : ""}
		value="node-js">Node.js (Express)</SelectItem>
		<SelectItem 
		${startContent ? `startContent={<Box className="${iconClass}" />}` : ""}
		${endContent ? `endContent={<Box className="${iconClass}" />}` : ""}
		value="django">Django (Python)</SelectItem>
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
