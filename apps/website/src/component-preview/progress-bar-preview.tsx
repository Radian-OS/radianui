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

export type SizeOptions = "10" | "20" | "30" | "40" | "50" | "60" | "70" | "80" | "90" | "100"
const sizes: SizeOptions[] = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]

const ProgressBarPreview = () => {
	const [progress, setProgress] = useState<SizeOptions>("50")

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent>
							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[progress]}
										onSelectedChange={(values) => setProgress(values[0] as SizeOptions)}
										minSelectionCount={1}>
										{sizes.map((size) => (
											<DropdownItem value={size} key={size}>
												{size}
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<ProgressBar className="w-80" value={Number(progress)} />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers className="h-[420px]" code={` <ProgressBar value={${Number(progress)}} /> `} />
			</TabsContent>
		</Tabs>
	)
}

export default ProgressBarPreview
