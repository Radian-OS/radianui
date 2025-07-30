import React from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownTrigger } from "@/registry/ui/dropdown"
import { FieldConfig } from "@/registry/ui/form"
import DynamicForm from "@/registry/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FormExample1 = () => {
	const eventRegistrationFields: FieldConfig[] = [
		{
			name: "participantName",
			label: "Participant Name",
			type: "text",
			required: true,
			placeholder: "Enter participant name",
			maxLength: 100,
		},
		{
			name: "eventType",
			label: "Event Category",
			type: "select",
			required: true,
			placeholder: "Choose event category",
			options: [
				{ value: "workshop", label: "Workshop" },
				{ value: "seminar", label: "Seminar" },
				{ value: "conference", label: "Conference" },
				{ value: "networking", label: "Networking Event" },
			],
		},
		{
			name: "eventDate",
			label: "Preferred Date",
			type: "date",
			required: true,
			showTime: false,
		},
	]

	const eventRegistrationSchema = z.object({
		participantName: z.string().min(1, "Participant name is required"),
		eventType: z.string().min(1, "Please select an event category"),
		eventDate: z.any().refine((val) => val !== null, "Please select a date"),
		specialRequests: z.string().optional(),
	})

	const eventRegistrationSections = [
		{
			title: "Registration Details",
			description: "Tell us about your participation",
			fields: ["participantName", "eventType", "eventDate"],
		},
	]

	const handleEventRegistrationSubmit = (data: z.infer<typeof eventRegistrationSchema>) => {
		alert(`Registration confirmed for ${data.participantName}!`)
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
						fields={eventRegistrationFields}
						schema={eventRegistrationSchema}
						sections={eventRegistrationSections}
						onSubmit={handleEventRegistrationSubmit}
						submitButtonText="Register for Event"
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

export default FormExample1
