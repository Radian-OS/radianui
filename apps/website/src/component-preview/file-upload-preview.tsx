import { useState } from "react"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import FileUpload from "@/registry/ui/file-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type MaxSizeOptions = "5" | "10" | "30" | "50" | "70" | "90"
export type MaxFileOptions = "1" | "2" | "3" | "4" | "5" | "6"

const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const maxSizeOptions = ["5", "10", "30", "50", "70", "90"]
const maxFileOptions = ["1", "2", "3", "4", "5", "6"]
const sizes = ["28", "32", "36", "40", "44", "48"]

const FileUploadPreview = () => {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [maxSize, setMaxSize] = useState<MaxSizeOptions>("50")
	const [variant, setVariant] = useState("input")
	const [disabled, setDisabled] = useState<boolean>(false)
	const [label, setLabel] = useState<boolean>(true)
	const [format, setFormat] = useState<string>("image/*")
	const [maxFile, setMaxFile] = useState<MaxFileOptions>("4")
	const [size, setSize] = useState<SizeOptions>("36")
	const [hint, setHint] = useState<boolean>(false)

	const formatDescriptionMap: Record<string, string> = {
		"image/*": "JPG, PNG, GIF or other image files",
		"application/*,text/*": "PDF, DOCX, TXT or other document files",
		"audio/*": "MP3, WAV or other audio files",
		"video/*": "MP4, MOV or other video files",
		"*": "Any file type",
	}

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
									<DropdownGroup selectionMode="single" selectedValues={[variant]} onSelectedChange={(values) => setVariant(values[0])} minSelectionCount={1}>
										<DropdownItem value="input">Input</DropdownItem>
										<DropdownItem value="container">Container</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Accept</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[format]} onSelectedChange={(values) => setFormat(values[0])} minSelectionCount={1}>
										<DropdownItem value="image/*">Image</DropdownItem>
										<DropdownItem value="application/*,text/*">Document</DropdownItem>
										<DropdownItem value="audio/*">Audio</DropdownItem>
										<DropdownItem value="video/*">Video</DropdownItem>
										<DropdownItem value="*">All</DropdownItem>
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
								<DropdownSubTrigger>Hint</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(hint)]} onSelectedChange={(values) => setHint(values[0] === "true")} minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
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
									<DropdownGroup selectionMode="single" selectedValues={[String(disabled)]} onSelectedChange={(values) => setDisabled(values[0] === "true")} minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Max size (mb)</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[maxSize]} onSelectedChange={(values) => setMaxSize(values[0] as MaxSizeOptions)} minSelectionCount={1}>
										{maxSizeOptions.map((maxOption) => (
											<DropdownItem value={maxOption} key={maxOption}>
												{maxOption}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Max files</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[maxFile]} onSelectedChange={(values) => setMaxFile(values[0] as MaxFileOptions)} minSelectionCount={1}>
										{maxFileOptions.map((maxFileOption) => (
											<DropdownItem value={maxFileOption} key={maxFileOption}>
												{maxFileOption}
											</DropdownItem>
										))}
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
						title="Drag and drop files to upload"
						description={formatDescriptionMap[format]}
						hint={hint ? "Hint text to help the user with input" : ""}
						variant={variant}
						sizes={size}
						className="pb-14"
						accept={format}
						label={label ? "File" : undefined}
						rounded={rounded}
						maxSize={Number(maxSize)}
						disabled={disabled}
						maxFiles={Number(maxFile)}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<FileUpload
	title="Drag and drop files to upload"
	description="${formatDescriptionMap[format]}"
	sizes="${size}"
	variant="${variant}"
	accept="${format}"
	label="${label ? "File" : ""}"
	rounded="${rounded}"
	maxSize={${maxSize}}
	disabled={${disabled}}
	maxFiles={${maxFile}}
	${hint ? `hint="Hint text to help the user with input"` : ""}

/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default FileUploadPreview
