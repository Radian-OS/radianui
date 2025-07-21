import { useState } from "react"
import { EyeIcon, RotateCw, Settings, SquareTerminal } from "lucide-react"
import { Fade, FadeDirection } from "@/registry/animated/fade"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FadePreview = () => {
	// State used to re-render the component
	const [counter, setCounter] = useState(0)

	const [direction, setDirection] = useState<FadeDirection>("up")

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
				<div className="flex gap-2">
					<div className="flex gap-1">
						<Button variant="outline" color="neutral" iconOnly onClick={() => setCounter((prev) => prev + 1)}>
							<RotateCw />
						</Button>
					</div>
					<Dropdown>
						<DropdownTrigger asChild>
							<Button variant="outline" color="neutral" size="36" iconOnly>
								<Settings />
							</Button>
						</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownGroup>
								<DropdownSub>
									<DropdownSubTrigger>Direction</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											minSelectionCount={1}
											selectedValues={[direction]}
											onSelectedChange={(values) => setDirection(values[0] as FadeDirection)}>
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
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Fade key={counter} direction={direction}>
						<span className="text-2xl font-medium">Animated Component</span>
					</Fade>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<FadeDown>
    <span className="text-2xl font-medium">Animated Component</span>
</FadeDown>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default FadePreview
