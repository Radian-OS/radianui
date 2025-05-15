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
import ProgressBar from "@/registry/ui/progress-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type ProgressOptions = "0" | "25" | "50" | "75" | "100"
const sizes: ProgressOptions[] = ["0", "25", "50", "75", "100"]
const booleanOptions = ["true", "false"]

const ProgressBarPreview = () => {
	const [progress, setProgress] = useState<ProgressOptions>("50")
	const [hasError, setHasError] = useState<boolean>(false)
	const [label, setLabel] = useState<boolean>(true)
	const [hint, setHint] = useState<boolean>(true)

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent>
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
								<DropdownSubTrigger>Progress</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[progress]}
										onSelectedChange={(values) => setProgress(values[0] as ProgressOptions)}
										minSelectionCount={1}>
										{sizes.map((size) => (
											<DropdownItem value={size} key={size}>
												{size}%
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Hint</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(hint)]}
										onSelectedChange={(values) => setHint(values[0] === "true")}
										minSelectionCount={1}>
										<DropdownItem value="true">Yes</DropdownItem>
										<DropdownItem value="false">No</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>HasError</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(hasError)]}
										onSelectedChange={(values) => setHasError(values[0] === "true")}
										minSelectionCount={1}>
										<DropdownItem value="true">Yes</DropdownItem>
										<DropdownItem value="false">No</DropdownItem>
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
					<ProgressBar
						label={label ? "ProgressBar" : undefined}
						hasError={hasError}
						hint={hint ? "Hint" : undefined}
						className="w-80"
						value={Number(progress)}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<ProgressBar 
	value={${Number(progress)}}
	label="${label ? "ProgressBar" : undefined}"
	hasError={${hasError}}
	hint="Description"
/>
					`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default ProgressBarPreview
