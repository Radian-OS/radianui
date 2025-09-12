import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Spinner } from "@/registry/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function ColorSpinnerExample() {
	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-start">
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
				<div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border px-10">
					<Spinner variant="activity" color="var(--color-primary)" />
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="color-spinner-example.tsx"
					showLineNumber
					className="h-105"
					code={`
import { Spinner } from "@/components/ui/spinner"

export default function ColorSpinnerExample() {
	return (
		<Spinner variant="activity" color="var(--color-primary)" />
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
