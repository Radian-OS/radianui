import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { TextArea } from "@/registry/ui/text-area"

const TextAreaPreview = () => {
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border p-6">
					<div className="w-full max-w-md space-y-6">
						<TextArea placeholder="Type your message here..." />
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="text-area.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
import { TextArea } from "@/components/ui/text-area"

const TextAreaPreview = () => {
	return (
		<TextArea placeholder="Type your message here..." />
	)
}

export default TextAreaPreview
 `}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default TextAreaPreview
