import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { TextReveal } from "@/registry/animated/text-reveal"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownSub, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const AnimatedListPreview = () => {
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
				<div className="flex min-h-[200vh] w-full p-10">
					<TextReveal>Components that adapt to your workflow</TextReveal>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="text-reveal.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="relative size-60 rounded-lg border">
	<h1>Content here</h1>
	
	<BorderBeam size={150} />
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default AnimatedListPreview
