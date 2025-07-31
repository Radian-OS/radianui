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
	fullname: string
	email: string
	subject: string
	message: string
}

interface FieldErrors {
	fullname?: string
	email?: string
	subject?: string
	message?: string
}

// Schema definitions moved outside component to prevent recreation
const fieldSchemas = {
	fullname: z.object({
		fullname: z
			.string()
			.min(1, "Full name is required")
			.min(3, "Full name must be at least 3 characters long")
			.max(50, "Full name must not exceed 50 characters")
			.regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
	}),
	email: z.object({
		email: z.string().min(1, "Email is required").email("Invalid email address").max(100, "Email must not exceed 100 characters"),
	}),
	subject: z.object({
		subject: z.string().min(1, "Subject is required").min(3, "Subject must be at least 3 characters long").max(100, "Subject must not exceed 100 characters"),
	}),
	message: z.object({
		message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters long").max(1000, "Message must not exceed 1000 characters"),
	}),
} as const

const FormExample2 = () => {
	const [formData, setFormData] = useState<FormData>({
		fullname: "",
		email: "",
		subject: "",
		message: "",
	})
	const [errors, setErrors] = useState<FieldErrors>({})

	// Field validation handlers using lookup object instead of if-else
	const fieldValidators = useMemo(
		() => ({
			fullname: (value: string) => {
				const result = fieldSchemas.fullname.safeParse({ fullname: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.fullname?.[0]
			},
			email: (value: string) => {
				const result = fieldSchemas.email.safeParse({ email: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.email?.[0]
			},
			subject: (value: string) => {
				const result = fieldSchemas.subject.safeParse({ subject: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.subject?.[0]
			},
			message: (value: string) => {
				const result = fieldSchemas.message.safeParse({ message: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.message?.[0]
			},
		}),
		[]
	)

	// Updated change handler - validate each field as it changes
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
					title: "Contact detail!",
					variant: "inverse",
					description: JSON.stringify(allData, null, 2),
					icon: <CircleUser />,
					closable: false,
				})

				// Reset form after successful submission
				setFormData({
					fullname: "",
					email: "",
					subject: "",
					message: "",
				})
				setErrors({})
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
							placeholder="Enter your full name"
							hasError={!!errors.fullname}
							hint={errors.fullname}
						/>

						{/* Email */}
						<Input
							name="email"
							id="email"
							type="email"
							start={<Mail />}
							label="Email Address *"
							className="w-full"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter your email address"
							hasError={!!errors.email}
							hint={errors.email}
						/>

						{/* Subject */}
						<Input
							name="subject"
							id="subject"
							label="Subject *"
							start={<MessageCircle />}
							className="w-full"
							value={formData.subject}
							onChange={handleChange}
							placeholder="What is this regarding?"
							hasError={!!errors.subject}
							hint={errors.subject}
						/>

						{/* Message */}
						<TextArea
							label="Message *"
							name="message"
							id="message"
							value={formData.message}
							onChange={handleChange}
							placeholder="Tell us more about your inquiry... (minimum 10 characters)"
							hasError={!!errors.message}
							hint={errors.message}
							rows={6}
						/>

						{/* Character count for message */}
						<div className="text-right text-sm text-gray-500">{formData.message.length}/1000 characters</div>

						<Button type="submit" className="w-full">
							Send Message
						</Button>
					</form>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="contact-form-with-validation.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default FormExample2
