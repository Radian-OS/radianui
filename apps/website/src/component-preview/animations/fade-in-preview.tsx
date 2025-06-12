import { useState } from "react"
import { RotateCw } from "lucide-react"
import { FadeIn, FadeInDirection } from "@/registry/animated/fade-in"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FadeInPreview = () => {
	// State used to re-render the component
	const [counter, setCounter] = useState(0)

	const [direction, setDirection] = useState<FadeInDirection>("up")

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownGroup>
								<DropdownSub>
									<DropdownSubTrigger>Direction</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											minSelectionCount={1}
											selectedValues={[direction]}
											onSelectedChange={(values) => setDirection(values[0] as FadeInDirection)}>
											<DropdownItem value="up">Up</DropdownItem>
											<DropdownItem value="left">Left</DropdownItem>
											<DropdownItem value="right">Right</DropdownItem>
											<DropdownItem value="down">Down</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</div>
				<div className="flex gap-1">
					<Button variant="neutral-outline" isIcon onClick={() => setCounter((prev) => prev + 1)}>
						<RotateCw />
					</Button>
					<TabsList>
						<TabsTrigger value="preview">Preview</TabsTrigger>
						<TabsTrigger value="code">Code</TabsTrigger>
					</TabsList>
				</div>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<FadeIn key={counter} direction={direction}>
						<h1 className="text-2xl font-medium">Animated Component</h1>
					</FadeIn>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<FadeDown>
    <h1 className="text-2xl font-medium">Animated Component</h1>
</FadeDown>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default FadeInPreview
