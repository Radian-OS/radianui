import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Divider } from "@/registry/ui/divider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const DividerExamplePreview = () => {
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
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-x-auto rounded-xl border px-10">
					<Divider className="flex-1" />
					<span className="text-fg-tertiary px-4 text-sm">OR</span>
					<Divider className="flex-1" />
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="divider.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="flex h-[420px] items-center justify-center overflow-x-auto rounded-xl border px-10">
<Divider className="flex-1" />
<span className="text-fg-tertiary px-4 text-sm">OR</span>
<Divider className="flex-1" />
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default DividerExamplePreview
