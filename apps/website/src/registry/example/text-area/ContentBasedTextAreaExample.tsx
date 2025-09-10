import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { TextArea } from "@/registry/ui/text-area"

export default function ContentBasedTextAreaExample() {
	return (
		<Tabs variant={"outline-ghost"} defaultValue="preview" className="mb-10">
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<TextArea placeholder="Type your message" className="field-sizing-content w-100 max-h-60" resizable={false} />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="content-based-text-area-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<TextArea placeholder="Type your message" className="field-sizing-content w-112 max-h-60" 
	resizable={false} />`}
				/>
			</TabsContent>
		</Tabs>
	)
}
