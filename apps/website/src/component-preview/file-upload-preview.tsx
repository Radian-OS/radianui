import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { FileUpload, FileWithPreview } from "@/registry/ui/file-upload"
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
	const [hasError, setHasError] = useState<boolean>(false)

	const formatDescriptionMap: Record<string, string> = {
		"image/*": "JPG, PNG, GIF or other image files",
		"application/*,text/*": "PDF, DOCX, TXT or other document files",
		"audio/*": "MP3, WAV or other audio files",
		"video/*": "MP4, MOV or other video files",
		"*": "Any file type",
	}

	const [files, setFiles] = useState<FileWithPreview[]>([])
	// console.log("Files:", files)

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
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value)}>
									<DropdownRadioItem value="input" onSelect={(e) => e.preventDefault()}>
										Input
									</DropdownRadioItem>
									<DropdownRadioItem value="container" onSelect={(e) => e.preventDefault()}>
										Container
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Accept</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={format} onValueChange={(value) => setFormat(value)}>
									<DropdownRadioItem value="image/*" onSelect={(e) => e.preventDefault()}>
										Image
									</DropdownRadioItem>
									<DropdownRadioItem value="application/*,text/*" onSelect={(e) => e.preventDefault()}>
										Document
									</DropdownRadioItem>
									<DropdownRadioItem value="audio/*" onSelect={(e) => e.preventDefault()}>
										Audio
									</DropdownRadioItem>
									<DropdownRadioItem value="video/*" onSelect={(e) => e.preventDefault()}>
										Video
									</DropdownRadioItem>
									<DropdownRadioItem value="*" onSelect={(e) => e.preventDefault()}>
										All
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
							<DropdownSubTrigger>Max size (mb)</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={maxSize} onValueChange={(value) => setMaxSize(value as MaxSizeOptions)}>
									{maxSizeOptions.map((maxOption) => (
										<DropdownRadioItem value={maxOption} key={maxOption} onSelect={(e) => e.preventDefault()}>
											{maxOption}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Max files</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={maxFile} onValueChange={(value) => setMaxFile(value as MaxFileOptions)}>
									{maxFileOptions.map((maxFileOption) => (
										<DropdownRadioItem value={maxFileOption} key={maxFileOption} onSelect={(e) => e.preventDefault()}>
											{maxFileOption}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className={`flex h-[420px] justify-center ${variant === "input" ? "items-center" : "pt-24"} overflow-auto rounded-xl border`}>
					<FileUpload
						title="Drag and drop files to upload"
						value={files}
						onChange={setFiles}
						description={formatDescriptionMap[format]}
						hint={hint ? "Hint text to help the user with input" : ""}
						variant={variant}
						sizes={size}
						className="w-80 pb-14"
						accept={format}
						label={label ? "File" : undefined}
						rounded={rounded}
						maxSize={Number(maxSize)}
						hasError={hasError}
						disabled={disabled}
						maxFiles={Number(maxFile)}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="file-upload.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<FileUpload
	title="Drag and drop files to upload"
	description="${formatDescriptionMap[format]}"
	sizes="${size}"
	className="w-80"
	variant="${variant}"
	accept="${format}"
	label="${label ? "File" : ""}"
	rounded="${rounded}"
	maxSize={${maxSize}}
	disabled={${disabled}}
	maxFiles={${maxFile}}
	${hint ? `hint="Hint text to help the user with input"` : ""}
	hasError={${hasError}}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default FileUploadPreview
