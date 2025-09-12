import { useState } from "react"
import { EyeIcon, RotateCw, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { TypingText } from "@/registry/animated/typing-text"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownSub, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const TypingTextPreview = () => {
	const [counter, setCounter] = useState(0)

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
				<div className="flex gap-2">
					<div className="flex gap-1">
						<IconButton variant="outline" color="neutral" onClick={() => setCounter((prev) => prev + 1)}>
							<RotateCw />
						</IconButton>
					</div>
					<Dropdown>
						<DropdownTrigger asChild>
							<IconButton variant="outline" color="neutral" size="36">
								<Settings />
							</IconButton>
						</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownGroup>
								<DropdownSub></DropdownSub>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</div>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col justify-center overflow-auto rounded-xl border px-10 text-left">
					<p className="text-left text-4xl font-medium">Transform ideas into</p>
					<TypingText key={counter} className="text-left text-4xl font-medium" texts={["interactive and", "beautiful digital products"]} />
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="typing-text.tsx" showLineNumber className="h-[420px]" code={`<TypingText text="Build super awesome websites" className="text-4xl font-medium" />`} />
			</TabsContent>
		</Tabs>
	)
}

export default TypingTextPreview
