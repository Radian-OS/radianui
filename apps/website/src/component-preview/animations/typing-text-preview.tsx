import { useState } from "react"
import { RotateCw } from "lucide-react"
import { TypingText } from "@/registry/animated/typing-text"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownSub, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const TypingTextPreview = () => {
	const [counter, setCounter] = useState(0)

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
				<div className="flex h-[420px] flex-col justify-center overflow-auto rounded-xl border px-10 text-left">
					<p className="text-left text-4xl font-medium">Transform ideas into</p>
					<TypingText className="text-left text-4xl font-medium" key={counter} text="interactive and beautiful digital products" />
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers className="h-[420px]" code={`<TypingText text="Build super awesome websites" className="text-4xl font-medium" />`} />
			</TabsContent>
		</Tabs>
	)
}

export default TypingTextPreview
