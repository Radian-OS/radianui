import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Pointer } from "@/registry/animated/pointer"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownSub, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const InfiniteScrollPreview = () => {
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
					<div className="w-100 bg-fill2 mx-auto flex h-80 items-center justify-center rounded-lg p-2">
						<span>Hover over here</span>
						<Pointer />
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="pointer.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="mx-auto size-60 rounded-md bg-pink-400 p-2">
	<span>Hover over here</span>
	<Pointer />
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default InfiniteScrollPreview
