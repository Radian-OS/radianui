import React, { useCallback, useMemo, useState } from "react"
import { CircleUser, EyeIcon, SquareTerminal } from "lucide-react"
import { Value } from "react-phone-number-input"
import * as RPNInput from "react-phone-number-input"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Input } from "@/registry/ui/input"
import { Password } from "@/registry/ui/password"
import { PhoneNumber } from "@/registry/ui/phone-number"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
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

const FormExample1 = () => {
	const [formData, setFormData] = useState<FormData>({
		username: "",
		password: "",
		phoneno: "",
		fullname: "",
		email: "",
		confirmPassword: "",
	})
	const [errors, setErrors] = useState<FieldErrors>({})

	const [phoneValue, setPhoneValue] = useState<Value>()
	const [selectedCountry, setSelectedCountry] = useState<RPNInput.Country>("US")

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

	const handlePhoneChange = useCallback((value: Value) => {
		setPhoneValue(value)
		setFormData((prev) => ({ ...prev, phoneno: value || "" }))

		// Clear phone error when user starts typing
		if (value && value.length > 0) {
			setErrors((prev) => ({ ...prev, phoneno: undefined }))
		}
	}, [])

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

			// Validate fields without validators
			if (!phoneValue || phoneValue.length === 0) {
				newErrors.phoneno = "Please enter a valid phone number"
				hasErrors = true
			}

			setErrors(newErrors)

			if (!hasErrors) {
				// All validation passed - show success toast with all data
				const allData = {
					...formData,
					phoneNumber: phoneValue,
					country: selectedCountry,
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
		[formData, phoneValue, selectedCountry, fieldValidators]
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
							<h1 className="text-center text-3xl font-bold">Create Your Account</h1>
							<p className="text-center text-lg">Join us today and get started with your journey</p>
						</div>

						{/* Full Name */}
						<Input name="fullname" id="fullname" className="w-full" value={formData.fullname} onChange={handleChange} placeholder="Enter full name" />

						<Input name="email" id="email" className="w-full" value={formData.email} onChange={handleChange} placeholder="Enter email address" />

						<Input name="username" id="username" className="w-full" value={formData.username} onChange={handleChange} placeholder="Enter username" />

						{/* Phone Number (Optional) */}
						<PhoneNumber
							label="Phone Number"
							value={phoneValue}
							onChange={handlePhoneChange}
							country={selectedCountry}
							onCountryChange={(c) => setSelectedCountry(c || "US")}
							international
							countryCallingCodeEditable
							showTrigger
							countryDropdown
							hasError={!!errors.phoneno}
							hint={errors.phoneno}
						/>

						<Password name="password" id="password" className="w-full" placeholder="Enter password" onChange={handleChange} value={formData.password} />

						<Password name="confirmPassword" id="confirmPassword" className="w-full" placeholder="Enter password" onChange={handleChange} value={formData.confirmPassword} />

						<Checkbox>Accept Terms & Conditions</Checkbox>

						<Button type="submit" className="w-full">
							Submit All Fields
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

export default FormExample1
