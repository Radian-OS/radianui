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
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const booleanOptions = ["true", "false"]

const FileUploadPreview = () => {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [variant, setVariant] = useState("default")
	const [disabled, setDisabled] = useState<boolean>(false)
	const [label, setLabel] = useState<boolean>(true)
	const [format, setFormat] = useState("image")

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
										<DropdownItem value="default">Default</DropdownItem>
										<DropdownItem value="box">Box</DropdownItem>
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
										{booleanOptions.map((val) => (
											<DropdownItem value={val} key={val}>
												{val}
											</DropdownItem>
										))}
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
										{booleanOptions.map((option) => (
											<DropdownItem key={option} value={option}>
												{option}
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
				<div className={`flex h-[420px] justify-center ${variant === "default" ? "items-center" : "pt-24"} overflow-auto rounded-xl border`}>
					<FileUpload
						variant={variant}
						className="pb-14"
						format={format}
						// label={label ? "Label" : undefined}
						// rounded={rounded}
						// value={file}
						// onChange={setFile}
						// dropzoneClassName="h-[12.5rem]"
						// multiple
						// disabled={disabled}
						// url="https://679b5e2633d3168463239af9.mockapi.io/photo"
						// headers={{ "Content-Type": "application/json" }}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={` <FileUpload
                        label=${label ? "Label" : ""}
                        rounded="${rounded}"
                        value={file}
                        onChange={setFile}
                        dropzoneClassName="h-[12.5rem]"
                        multiple
                        disabled={${disabled}}
                        url="http://localhost:8000/upload"
                    />`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default FileUploadPreview
