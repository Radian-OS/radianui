import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Divider } from "@/registry/ui/divider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const DividerExamplePreview = () => {
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
			</div>
			<TabsContent value="preview">
				<div className={`flex h-[420px] items-center justify-center overflow-hidden rounded-xl border px-10`}>
					<Divider className="mr-4" />
					<span className="text-fg-tertiary">OR</span>
					<Divider className="ml-4" />
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="divider.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="flex h-[420px] items-center justify-center overflow-hidden rounded-xl border px-10">
<Divider className="mr-4" />
<span className="text-fg-tertiary" >OR</span>
<Divider className="ml-4" />
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default DividerExamplePreview
