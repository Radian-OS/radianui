import React, { useCallback, useMemo, useState } from "react"
import { CircleUser, CreditCard, EyeIcon, Lock, MapPin, SquareTerminal, Tag, User } from "lucide-react"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
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

const FormExample3 = () => {
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
							<h1 className="text-center text-3xl font-bold">Secure Checkout</h1>
							<p className="text-center text-lg">Complete your order with our secure payment system</p>
						</div>

						{/* Full Name */}
						<div className="space-y-4">
							<h3 className="flex items-center text-lg font-semibold">
								<User className="mr-2 h-5 w-5" />
								Contact Information
							</h3>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<Input
									label="Full Name *"
									className="w-full"
									value={formData.fullname}
									onChange={handleChange}
									placeholder="Enter full name"
									hasError={!!errors.fullname}
									hint={errors.fullname}
								/>

								<Input
									label="Email Address *"
									className="w-full"
									value={formData.email}
									onChange={handleChange}
									placeholder="Enter email address"
									hasError={!!errors.email}
									hint={errors.email}
								/>
							</div>
						</div>

						<Divider />

						{/* Shipping Address */}
						<div className="space-y-4">
							<h3 className="flex items-center text-lg font-semibold">
								<MapPin className="mr-2 h-5 w-5" />
								Shipping Address
							</h3>

							<div className="grid grid-cols-1 gap-4">
								<Input
									label="Street Address *"
									className="w-full"
									value={formData.email}
									onChange={handleChange}
									placeholder="New Road"
									hasError={!!errors.email}
									hint={errors.email}
								/>

								<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
									<Input label="City *" className="w-full" value={formData.email} onChange={handleChange} placeholder="Kathmandu" hasError={!!errors.email} hint={errors.email} />

									<Input label="State *" className="w-full" value={formData.email} onChange={handleChange} placeholder="KTM" hasError={!!errors.email} hint={errors.email} />

									<Input label="ZIP Code *" className="w-full" value={formData.email} onChange={handleChange} placeholder="44600" hasError={!!errors.email} hint={errors.email} />
								</div>
							</div>
						</div>

						<Divider />

						{/* Billing Address */}
						<div className="mt-6 space-y-4">
							<div className="flex items-center justify-between">
								<h3 className="flex items-center text-lg font-semibold">
									<CreditCard className="mr-2 h-5 w-5" />
									Billing Address
								</h3>
								<div className="flex items-center space-x-2">
									<Checkbox>Same as shipping address</Checkbox>
								</div>
							</div>

							{false && (
								<div className="grid grid-cols-1 gap-4">
									<Input
										label="Street Address *"
										className="w-full"
										value={formData.email}
										onChange={handleChange}
										placeholder="New Road"
										hasError={!!errors.email}
										hint={errors.email}
									/>

									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										<Input label="City *" className="w-full" value={formData.email} onChange={handleChange} placeholder="Kathmandu" hasError={!!errors.email} hint={errors.email} />

										<Input label="State *" className="w-full" value={formData.email} onChange={handleChange} placeholder="KTM" hasError={!!errors.email} hint={errors.email} />

										<Input label="ZIP Code *" className="w-full" value={formData.email} onChange={handleChange} placeholder="44600" hasError={!!errors.email} hint={errors.email} />
									</div>
								</div>
							)}
						</div>

						<Divider />

						{/* Payment Information */}
						<div className="space-y-4">
							<h3 className="flex items-center text-lg font-semibold">
								<Lock className="mr-2 h-5 w-5" />
								Payment Information
							</h3>

							<div className="grid grid-cols-1 gap-4">
								<Input
									label="Card Number *"
									className="w-full"
									value={formData.email}
									onChange={handleChange}
									placeholder="1234 5678 9012 3456"
									hasError={!!errors.email}
									hint={errors.email}
								/>

								<div className="grid grid-cols-2 gap-4">
									<Input
										label="Expiration Date *"
										className="w-full"
										value={formData.email}
										onChange={handleChange}
										placeholder="MM/YY"
										hasError={!!errors.email}
										hint={errors.email}
									/>

									<Input label="CVV *" className="w-full" value={formData.email} onChange={handleChange} placeholder="123" hasError={!!errors.email} hint={errors.email} />
								</div>
							</div>
						</div>

						<Divider />

						{/* Promo Code */}
						<div className="space-y-4">
							<h3 className="flex items-center text-lg font-semibold">
								<Tag className="mr-2 h-5 w-5" />
								Promo Code <span className="text-sm font-normal text-gray-500">(optional)</span>
							</h3>

							<div className="flex gap-2">
								<Input className="w-full" value={formData.email} onChange={handleChange} placeholder="Enter promo code" hasError={!!errors.email} hint={errors.email} />
								<Button type="button" size="40" variant="outline">
									Apply
								</Button>
							</div>
							{false && <p className="text-sm font-medium text-green-600">✓ Promo code applied successfully!</p>}
						</div>

						{/* Submit Button */}
						<Button type="submit" className="bg-primary w-full transform rounded-lg px-4 py-4 font-semibold transition duration-200 ease-in-out hover:scale-105">
							Place Order / Pay Now
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

export default FormExample3
