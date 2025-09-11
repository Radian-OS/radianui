import React from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radiogroup"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

function DisabledRadiogroupExample() {
	return (
		<Tabs defaultValue="preview" className="mb-10">
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
					<div className="bg-bg flex min-w-80 flex-col gap-3 rounded-md border p-4 shadow-sm">
						<Label className="text-sm font-medium">Select Your ARM Chip</Label>
						<RadioGroup defaultValue="m4" className="gap-4" disabled>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="m3" id="11" />
								<Label htmlFor="11">M3</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="m3_pro" id="12" />
								<Label htmlFor="12">M3 Pro</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="m3_max" id="13" />
								<Label htmlFor="13">M3 Max</Label>
							</div>
						</RadioGroup>
					</div>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="disabled-radiogroup-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="bg-bg min-w-80 rounded-md border p-4 shadow-sm">
	<RadioGroup defaultValue="m4" label="Select Your ARM Chip" className="gap-4" disabled>
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

export default DisabledRadiogroupExample
