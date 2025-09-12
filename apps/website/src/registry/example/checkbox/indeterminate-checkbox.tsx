import React from "react"
import { EyeIcon, Minus, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function IndeterminateCheckboxExample() {
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
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex items-center space-x-2">
						<Checkbox id="indeterminate" icon={<Minus />} />
						<Label htmlFor="indeterminate">Indeterminate Checkbox</Label>
					</div>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="indeterminate-checkbox.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Checkbox icon={<Minus />}>
	Indeterminate Checkbox
</Checkbox>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
