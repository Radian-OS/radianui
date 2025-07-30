import React from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownTrigger } from "@/registry/ui/dropdown"
import { FieldConfig } from "@/registry/ui/form"
import DynamicForm from "@/registry/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FormExample2 = () => {
	const productFeedbackFields: FieldConfig[] = [
		{
			name: "product",
			label: "Product Used",
			type: "select",
			required: true,
			placeholder: "Select the product",
			options: [
				{ value: "mobile-app", label: "Mobile App" },
				{ value: "web-platform", label: "Web Platform" },
				{ value: "api-service", label: "API Service" },
				{ value: "desktop-app", label: "Desktop Application" },
			],
		},
		{
			name: "satisfaction",
			label: "Overall Satisfaction",
			type: "slider",
			required: true,
			min: 1,
			max: 10,
		},
		{
			name: "recommendationLikelihood",
			label: "How likely are you to recommend us?",
			type: "radio",
			required: true,
			options: [
				{ value: "very-likely", label: "Very Likely" },
				{ value: "likely", label: "Likely" },
				{ value: "neutral", label: "Neutral" },
			],
		},
		{
			name: "feedback",
			label: "Additional Feedback",
			type: "textarea",
			placeholder: "Please share your detailed feedback, suggestions, or any issues you encountered...",
			maxLength: 1000,
		},
	]

	const productFeedbackSchema = z.object({
		product: z.string().min(1, "Please select a product"),
		satisfaction: z.array(z.number()).min(1, "Please rate your satisfaction"),
		recommendationLikelihood: z.string().min(1, "Please select your recommendation likelihood"),
		feedback: z.string().optional(),
	})

	const productFeedbackSections = [
		{
			title: "Product Experience",
			description: "Rate your experience with our product",
			fields: ["product", "satisfaction", "recommendationLikelihood"],
		},
	]

	const handleProductFeedbackSubmit = (data: z.infer<typeof productFeedbackSchema>) => {
		// Handle form submission
		alert(`Your feedback for ${data.product} has been submitted!`)
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
						fields={productFeedbackFields}
						schema={productFeedbackSchema}
						sections={productFeedbackSections}
						onSubmit={handleProductFeedbackSubmit}
						submitButtonText="Submit Feedback"
						className="mx-auto max-w-lg space-y-6"
					/>{" "}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="hover-card.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default FormExample2
