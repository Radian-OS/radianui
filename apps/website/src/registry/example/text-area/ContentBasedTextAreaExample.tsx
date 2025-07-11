import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { TextArea } from "@/registry/ui/text-area"

export default function ContentBasedTextAreaExample() {
	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3"></div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<TextArea placeholder="Type your message" className="field-sizing-content w-112 max-h-60" resizable={false} />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<TextArea placeholder="Type your message" className="field-sizing-content w-112 max-h-60" 
	resizable={false} />`}
				/>
			</TabsContent>
		</Tabs>
	)
}
