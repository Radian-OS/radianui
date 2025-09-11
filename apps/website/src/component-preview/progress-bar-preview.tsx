import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
							<DropdownSubTrigger>Value label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(valueLabel)} onValueChange={(value) => setValueLabel(value === "true")}>
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
							<DropdownSubTrigger>Progress</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={progress} onValueChange={(value) => setProgress(value as ProgressOptions)}>
									{sizes.map((size) => (
										<DropdownRadioItem value={size} key={size} onSelect={(e) => e.preventDefault()}>
											{size}%
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
