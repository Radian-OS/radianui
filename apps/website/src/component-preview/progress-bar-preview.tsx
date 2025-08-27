import { useState } from "react"

import { EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { ProgressBar } from "@/registry/ui/progress-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type ProgressOptions = "0" | "25" | "50" | "75" | "100"
const sizes: ProgressOptions[] = ["0", "25", "50", "75", "100"]

const ProgressBarPreview = () => {
	const [progress, setProgress] = useState<ProgressOptions>("50")
	const [label, setLabel] = useState<boolean>(true)
	const [hint, setHint] = useState<boolean>(false)
	const [valueLabel, setValueLabel] = useState<boolean>(true)

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
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[String(label)]} onSelectedChange={(values) => setLabel(values[0] === "true")} minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Value label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[String(valueLabel)]}
									onSelectedChange={(values) => setValueLabel(values[0] === "true")}
									minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Progress</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[progress]} onSelectedChange={(values) => setProgress(values[0] as ProgressOptions)} minSelectionCount={1}>
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
								<DropdownGroup selectionMode="single" selectedValues={[String(hint)]} onSelectedChange={(values) => setHint(values[0] === "true")} minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<ProgressBar label={label ? "Progress Bar" : undefined} hint={hint ? "Progress Bar" : undefined} valueLabel={valueLabel} value={Number(progress)} />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="progress-bar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<ProgressBar 
	value={${Number(progress)}}
	label="${label ? "ProgressBar" : undefined}"
	valueLabel={${valueLabel}}
	${hint ? `hint="Progress Bar"` : ""}
/>
					`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default ProgressBarPreview
