import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Input } from "@/registry/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FileUploadExample = () => {
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
				<div className={`flex h-[420px] items-center justify-center overflow-auto rounded-xl border`}>
					<Input className="w-80" type="file" />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="file-upload-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import { Input } from "@/components/ui/input"

export default function FileInputExample () {
  return (    						
        <Input className="w-80" type="file" />
  );
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default FileUploadExample
