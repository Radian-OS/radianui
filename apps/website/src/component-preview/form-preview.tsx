import React, { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { FieldConfig } from "@/registry/ui/form"
import DynamicForm from "@/registry/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Side = "top" | "bottom" | "left" | "right"

const FormPreview = () => {
	const [side, setSide] = useState<Side>("bottom")

	const registrationFields: FieldConfig[] = [
		{
			name: "username",
			label: "Username",
			type: "text",
			placeholder: "Choose a username",
			required: true,
		},
		{
			name: "email",
			label: "Email",
			type: "email",
			placeholder: "Enter your email",
			required: true,
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			placeholder: "Create a password",
			required: true,
		},
	]

	const registrationSchema = z.object({
		username: z
			.string()
			.min(1, "Username is required")
			.min(3, "Username must be at least 3 characters")
			.max(20, "Username must be less than 20 characters")
			.regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

		email: z.string().min(1, "Email is required").email("Please enter a valid email address"),

		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must be at least 8 characters")
			.regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
			.regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
			.regex(/(?=.*\d)/, "Password must contain at least one number"),
	})

	const handleLoginSubmit = (data: z.infer<typeof registrationSchema>) => {
		alert(`Registration successful! Welcome ${data.username}! Account created with email: ${data.email}`)
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
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Side</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setSide(Array.from(keys)[0] as Side)} minSelectionCount={1} selectedValues={[side]}>
									<DropdownItem value="top">Top</DropdownItem>
									<DropdownItem value="right">Right</DropdownItem>
									<DropdownItem value="bottom">Bottom</DropdownItem>
									<DropdownItem value="left">Left</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<DynamicForm fields={registrationFields} schema={registrationSchema} onSubmit={handleLoginSubmit} submitButtonText="Register" />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="hover-card.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default FormPreview
