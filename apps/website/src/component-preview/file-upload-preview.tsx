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
import FileUpload from "@/registry/ui/file-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type MaxSizeOptions = "5" | "10" | "30" | "50" | "70" | "90"

const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const maxSizeOptions = ["5", "10", "30", "50", "70", "90"]

const FileUploadPreview = () => {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [maxSize, setMaxSize] = useState<MaxSizeOptions>("50")
	const [variant, setVariant] = useState("input")
	const [disabled, setDisabled] = useState<boolean>(false)
	const [label, setLabel] = useState<boolean>(true)
	const [format, setFormat] = useState("image")
	const [file, setFile] = useState<boolean>(true)

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent>
							<DropdownSub>
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[variant]}
										onSelectedChange={(values) => setVariant(values[0])}
										minSelectionCount={1}>
										<DropdownItem value="input">Input</DropdownItem>
										<DropdownItem value="container">Container</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>File format</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[format]}
										onSelectedChange={(values) => setFormat(values[0])}
										minSelectionCount={1}>
										<DropdownItem value="image">Image</DropdownItem>
										<DropdownItem value="all">All</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
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
								<DropdownSubTrigger>Maximum file size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[maxSize]}
										onSelectedChange={(values) => setMaxSize(values[0] as MaxSizeOptions)}
										minSelectionCount={1}>
										{maxSizeOptions.map((maxOption) => (
											<DropdownItem value={maxOption} key={maxOption}>
												{maxOption}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>File</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(file)]}
										onSelectedChange={(values) => setFile(values[0] === "true")}
										minSelectionCount={1}>
										<DropdownItem value="false">Single</DropdownItem>
										<DropdownItem value="true">Multiple</DropdownItem>
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
				<div className={`flex h-[420px] justify-center ${variant === "input" ? "items-center" : "pt-24"} overflow-auto rounded-xl border`}>
					<FileUpload
						variant={variant}
						className="pb-14"
						format={format}
						label={label ? "File" : undefined}
						rounded={rounded}
						maxSize={Number(maxSize)}
						multiple={file}
						disabled={disabled}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<FileUpload
	variant="${variant}"
	format="${format}"
	label="${label ? "File" : ""}"
	rounded="${rounded}"
	maxSize={${maxSize}}
	multiple={${file}}
	disabled={${disabled}}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default FileUploadPreview
