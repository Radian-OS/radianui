import { EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { GradientText } from "@/registry/animated/gradient-text"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownSub, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const GradientTextPreview = () => {
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
					<p className="text-5xl font-semibold">
						Turn bold ideas into beautiful and dynamic <GradientText>user interfaces</GradientText>
					</p>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="gradient-text.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<p className="text-6xl font-semibold">
	Turn bold ideas into beautiful, responsive, and dynamic <GradientText>user interfaces</GradientText>
</p>
					`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default GradientTextPreview
