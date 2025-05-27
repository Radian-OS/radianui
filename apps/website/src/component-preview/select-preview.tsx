import { useState } from "react"
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
import { Select, SelectGroup, SelectItem } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const sizes = ["28", "32", "36", "40", "44", "48"]

const SelectPreview = () => {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [size, setSize] = useState<SizeOptions>("36")
	const [searchable, setSearchable] = useState<string>("false")
	const [selectionMode, setSelectionMode] = useState<string>("single")
	const [minSelectionCount, setMinSelectionCount] = useState<number>(0)
	const [label, setLabel] = useState(true)
	const [disabled, setDisabled] = useState(false)

	const [selectedValues, setSelectedValues] = useState<string[]>([])

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
									<DropdownGroup
										selectionMode="single"
										selectedValues={[rounded]}
										onSelectedChange={(values) => setRounded(values[0] as RoundedOptions)}
										minSelectionCount={1}>
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
									<DropdownGroup
										selectionMode="single"
										selectedValues={[size]}
										onSelectedChange={(values) => setSize(values[0] as SizeOptions)}
										minSelectionCount={1}>
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
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(label)]}
										onSelectedChange={(values) => setLabel(values[0] === "true")}
										minSelectionCount={1}>
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
										selectedValues={[searchable]}
										onSelectedChange={(values) => setSearchable(values[0])}
										minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Selection Mode</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[selectionMode]}
										onSelectedChange={(values) => setSelectionMode(values[0])}
										minSelectionCount={1}>
										<DropdownItem value="single">Single</DropdownItem>
										<DropdownItem value="multiple">Multiple</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Select
						label={label ? "Choose your favourite framework" : undefined}
						placeholder="Pick an option"
						rounded={rounded}
						size={size}
						disabled={disabled}
						isSearchable={searchable === "true"}
						selectionMode={selectionMode as "single" | "multiple"}
						minSelectionCount={minSelectionCount}
						selectedValues={selectedValues}
						onSelectedChange={setSelectedValues}
						className="w-80">
						<SelectGroup label="Backend Frameworks">
							<SelectItem value="node-js">Node.js (Express)</SelectItem>
							<SelectItem value="django">Django (Python)</SelectItem>
							<SelectItem value="rails">Rails (Ruby)</SelectItem>
							<SelectItem value="laravel">Laravel (PHP)</SelectItem>
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
					code={` <Select
                        label={label ? "Choose your favourite framework" : undefined}
                        placeholder="Pick an option"
                        rounded={rounded as RoundedOptions}
                        size={size as SizeOptions}
                        disabled={disabled}
                        isSearchable={searchable === "true"}
                        selectionMode={selectionMode as "single" | "multiple"}
                        minSelectionCount={minSelectionCount}
                        selectedValues={selectedValues}
                        onSelectedChange={setSelectedValues}
                        className="w-80">
                        <SelectGroup label="Backend Frameworks">
                            <SelectItem value="node-js">Node.js (Express)</SelectItem>
                            <SelectItem value="django">Django (Python)</SelectItem>
                            <SelectItem value="rails">Rails (Ruby)</SelectItem>
                            <SelectItem value="laravel">Laravel (PHP)</SelectItem>
                            <SelectItem value="spring">Spring Boot (Java)</SelectItem>
                        </SelectGroup>
                        <SelectGroup label="Mobile Frameworks">
                            <SelectItem value="react-native">React Native</SelectItem>
                            <SelectItem value="flutter">Flutter</SelectItem>
                            <SelectItem value="swiftui">SwiftUI</SelectItem>
                            <SelectItem value="kotlin-compose">Kotlin Compose</SelectItem>
                            <SelectItem value="xamarin">Xamarin</SelectItem>
                        </SelectGroup>
                    </Select> `}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SelectPreview
