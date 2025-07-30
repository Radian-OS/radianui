import React from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownTrigger } from "@/registry/ui/dropdown"
import { FieldConfig } from "@/registry/ui/form"
import DynamicForm from "@/registry/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FormExample3 = () => {
	const advancedSettingsFields: FieldConfig[] = [
		{
			name: "budget",
			label: "Monthly Budget",
			type: "currency",
			required: true,
			currency: "USD",
			locale: "en-US",
			separator: true,
			min: 100,
			max: 10000,
			placeholder: "Enter your budget",
		},
		{
			name: "meetingTime",
			label: "Preferred Meeting Time",
			type: "time",
			required: true,
		},
		{
			name: "themeColor",
			label: "Brand Color",
			type: "color",
			size: "40",
		},
		{
			name: "documents",
			label: "Upload Documents",
			type: "file",
			accept: ".pdf,.doc,.docx",
			multiple: true,
		},
	]

	const advancedSettingsSchema = z.object({
		budget: z.string().min(1, "Budget is required"),
		meetingTime: z.any().refine((val) => val !== null, "Please select a meeting time"),
		themeColor: z.any().optional(),
		documents: z.array(z.any()).optional(),
	})

	const handleAdvancedSettingsSubmit = (data: z.infer<typeof advancedSettingsSchema>) => {
		// Handle form submission
		alert(`Settings saved successfully! ${data.budget} budget set.`)
	}

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent className="min-w-20"></DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<DynamicForm
						fields={advancedSettingsFields}
						schema={advancedSettingsSchema}
						onSubmit={handleAdvancedSettingsSubmit}
						submitButtonText="Save Settings"
						className="mx-auto max-w-md space-y-6"
					/>{" "}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="hover-card.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default FormExample3
