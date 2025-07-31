import React, { useCallback, useMemo, useState } from "react"
import { CircleUser, EyeIcon, Mail, MessageCircle, SquareTerminal, User } from "lucide-react"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { TextArea } from "@/registry/ui/text-area"
import { Toaster, showToast } from "@/registry/ui/toast"

interface FormData {
	username: string
	password: string
	phoneno: string
	fullname: string
	email: string
	confirmPassword: string
}

interface FieldErrors {
	username?: string
	password?: string
	phoneno?: string
	fullname?: string
	email?: string
	confirmPassword?: string
}

// Schema definitions moved outside component to prevent recreation
const fieldSchemas = {
	username: z.object({
		username: z.string().min(3, "Username must be at least 3 characters long"),
	}),
	password: z.object({
		password: z.string().min(8, "Password must be at least 8 characters long"),
	}),
	fullname: z.object({
		fullname: z.string().min(3, "Full name must be at least 3 characters long"),
	}),
	email: z.object({
		email: z.string().email("Invalid email address"),
	}),
	confirmPassword: z.object({
		confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
	}),
} as const

const FormExample2 = () => {
	const [formData, setFormData] = useState<FormData>({
		username: "",
		password: "",
		phoneno: "",
		fullname: "",
		email: "",
		confirmPassword: "",
	})
	const [errors, setErrors] = useState<FieldErrors>({})

	// Field validation handlers using lookup object instead of if-else
	const fieldValidators = useMemo(
		() => ({
			username: (value: string) => {
				const result = fieldSchemas.username.safeParse({ username: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.username?.[0]
			},
			password: (value: string) => {
				const result = fieldSchemas.password.safeParse({ password: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.password?.[0]
			},
			fullname: (value: string) => {
				const result = fieldSchemas.fullname.safeParse({ fullname: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.fullname?.[0]
			},
			email: (value: string) => {
				const result = fieldSchemas.email.safeParse({ email: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.email?.[0]
			},
		}),
		[]
	)

	// Updated change handler - validate each field as it changes
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target

			setFormData((prev) => ({ ...prev, [name]: value }))

			// Validate the field if it has a validator
			const fieldName = name as keyof typeof fieldValidators
			if (fieldValidators[fieldName]) {
				const error = fieldValidators[fieldName](value)
				setErrors((prev) => ({ ...prev, [fieldName]: error }))
			}
		},
		[fieldValidators]
	)

	// Updated submit handler to validate all fields
	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault()

			const newErrors: FieldErrors = {}
			let hasErrors = false

			// Validate all fields
			Object.keys(fieldValidators).forEach((fieldName) => {
				const field = fieldName as keyof typeof fieldValidators
				const value = formData[field] as string
				const error = fieldValidators[field](value)
				if (error) {
					newErrors[field] = error
					hasErrors = true
				}
			})

			setErrors(newErrors)

			if (!hasErrors) {
				// All validation passed - show success toast with all data
				const allData = {
					...formData,
				}

				showToast({
					title: "Form Submitted Successfully!",
					variant: "inverse",
					description: JSON.stringify(allData, null, 2),
					icon: <CircleUser />,
					closable: false,
				})
			}
		},
		[formData, fieldValidators]
	)

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
			</div>

			<TabsContent value="preview">
				<div className="flex items-center justify-center overflow-auto rounded-xl border p-10">
					<Toaster position="bottom-right" />
					<form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6">
						<div>
							<h1 className="text-center text-3xl font-bold">Get In Touch</h1>
							<p className="text-center text-lg">Send us a message and we&apos;ll respond as soon as possible.</p>
						</div>
						{/* Full Name */}
						<Input
							name="fullname"
							id="fullname"
							start={<User />}
							label="Full Name *"
							className="w-full"
							value={formData.fullname}
							onChange={handleChange}
							placeholder="Enter full name"
							hasError={!!errors.fullname}
							hint={errors.fullname}
						/>

						<Input
							name="email"
							id="email"
							start={<Mail />}
							label="Email Address *"
							className="w-full"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter email address"
							hasError={!!errors.email}
							hint={errors.email}
						/>

						<Input
							name="subject"
							id="subject"
							label="Subject *"
							start={<MessageCircle />}
							className="w-full"
							value={formData.username}
							onChange={handleChange}
							placeholder="Enter username"
							hasError={!!errors.username}
							hint={errors.username}
						/>
						<TextArea
							label="Message *"
							name="textarea"
							// value={formData.textarea}
							// onChange={handleTextAreaChange}
							placeholder="Tell us more about your inquiry..."
							// hasError={!!errors.textarea}
							// hint={errors.textarea}
						/>

						<Button type="submit" className="bg-success w-full">
							Submit
						</Button>
					</form>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="form-preview-all-fields.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default FormExample2
