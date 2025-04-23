import React from "react"
import { Minus } from "lucide-react"
import { Checkbox } from "@/registry/ui/checkbox"
import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function IndeterminateCheckboxExample() {
	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<Checkbox icon={<Minus />}>Indeterminate Checkbox</Checkbox>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-105"
					code={`<Checkbox icon={<Minus />}>
	Indeterminate Checkbox
</Checkbox>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
