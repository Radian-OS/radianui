import { EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { ChangingText } from "@/registry/animated/changing-text"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownSub, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const ChangingTextPreview = () => {
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

					<DropdownContent className="min-w-20">
						<DropdownGroup>
							<DropdownSub></DropdownSub>
						</DropdownGroup>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<span className="w-100 flex items-center gap-1.5 text-3xl font-medium">
						UI library for
						<ChangingText texts={["Developers", "Designers"]} />
					</span>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="changing-text.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<span className="w-100 flex items-center gap-1.5 text-3xl font-medium">
    UI library for
    <ChangingText texts={["Developers", "Designers"]} />
</span>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default ChangingTextPreview
