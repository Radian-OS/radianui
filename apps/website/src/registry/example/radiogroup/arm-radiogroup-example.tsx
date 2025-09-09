import React from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Label } from "@/registry/ui/label"
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
					<div className="bg-bg flex min-w-80 flex-col gap-3 rounded-md border p-4 shadow-sm">
						<Label className="text-sm font-medium">Select Your ARM Chip</Label>
						<RadioGroup defaultValue="m3_max" className="gap-4">
							<div className="flex items-center gap-2">
								<RadioGroupItem value="m3" id="m3" aria-invalid={true} />
								<Label htmlFor="m3">M3</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="m3_pro" id="m3_pro" />
								<Label htmlFor="m3_pro">M3 Pro</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="m3_max" id="m3_max" />
								<Label htmlFor="m3_max">M3 Max</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="m4" id="m4" />
								<Label htmlFor="m4">M4</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="m4_pro" id="m4_pro" />
								<Label htmlFor="m4_pro">M4 Pro</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="m4_max" id="m4_max" disabled />
								<Label htmlFor="m4_max">M4 Max (Out of Stock)</Label>
							</div>
						</RadioGroup>
					</div>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="arm-radiogroup-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="bg-bg min-w-80 rounded-md border p-4 shadow-sm">
	<RadioGroup defaultValue="m3_max" label="Select Your ARM Chip" className="gap-4">
			<div className="flex items-center gap-2">
			<RadioGroupItem value="m3" id="m3" />
			<Label htmlFor="m3">M3</Label>
		</div>
		<div className="flex items-center gap-2">
			<RadioGroupItem value="m3_pro" id="m3_pro" />
			<Label htmlFor="m3_pro">M3 Pro</Label>
		</div>
		<div className="flex items-center gap-2">
			<RadioGroupItem value="m3_max" id="m3_max" />
			<Label htmlFor="m3_max">M3 Max</Label>
		</div>
		<div className="flex items-center gap-2">
			<RadioGroupItem value="m4" id="m4" />
			<Label htmlFor="m4">M4</Label>
		</div>
		<div className="flex items-center gap-2">
			<RadioGroupItem value="m4_pro" id="m4_pro" />
			<Label htmlFor="m4_pro">M4 Pro</Label>
		</div>
		<div className="flex items-center gap-2">
			<RadioGroupItem value="m4_max" id="m4_max" disabled />
			<Label htmlFor="m4_max">M4 Max (Out of Stock)</Label>
		</div>
		</div>
	</RadioGroup>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
