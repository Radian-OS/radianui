import React from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import { CodeArea } from "@/registry/ui/code-area"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radiogroup"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function ARMRadiogroupExample() {
	return (
		<Tabs defaultValue="preview" variant="outline-ghost" className="mb-10">
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
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="bg-bg-base min-w-80 rounded-md border p-4 shadow-sm">
						<RadioGroup defaultValue="m3_max" label="Select Your ARM Chip" className="gap-4">
							<RadioGroupItem value="m3">M3</RadioGroupItem>
							<RadioGroupItem value="m3_pro">M3 Pro</RadioGroupItem>
							<RadioGroupItem value="m3_max">M3 Max</RadioGroupItem>
							<RadioGroupItem value="m4">M4</RadioGroupItem>
							<RadioGroupItem value="m4_pro">M4 Pro</RadioGroupItem>
							<RadioGroupItem value="m4_max" disabled>
								M4 Max (Out of Stock)
							</RadioGroupItem>
						</RadioGroup>
					</div>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-105"
					code={`<div className="bg-bg-base min-w-80 rounded-md border p-4 shadow-sm">
	<RadioGroup defaultValue="m3_max" label="Select Your ARM Chip" className="gap-4">
		<RadioGroupItem value="m3">M3</RadioGroupItem>
		<RadioGroupItem value="m3_pro">M3 Pro</RadioGroupItem>
		<RadioGroupItem value="m3_max">M3 Max</RadioGroupItem>
		<RadioGroupItem value="m4">M4</RadioGroupItem>
		<RadioGroupItem value="m4_pro">M4 Pro</RadioGroupItem>
		<RadioGroupItem value="m4_max" disabled>
			M4 Max (Out of Stock)
		</RadioGroupItem>
	</RadioGroup>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
