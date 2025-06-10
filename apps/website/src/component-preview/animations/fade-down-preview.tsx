import { useState } from "react"
import { FadeDown } from "@/registry/animated/fade-down"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownSub, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FadeDownPreview = () => {
	// State used to re-render the component
	const [, setCounter] = useState(0)
	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownGroup>
								<DropdownSub></DropdownSub>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</div>
				<Button onClick={() => setCounter((prev) => prev + 1)}>Re-render</Button>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<FadeDown>
						<h1 className="text-2xl font-medium">Animated Component</h1>
					</FadeDown>
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

export default FadeDownPreview
