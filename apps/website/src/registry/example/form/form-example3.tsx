import React, { useCallback, useMemo, useState } from "react"
import { CircleUser, CreditCard, EyeIcon, Lock, MapPin, SquareTerminal, Tag, User } from "lucide-react"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { showToast } from "@/registry/ui/toast"

interface FormData {
	fullname: string
	email: string
	streetAddress: string
	city: string
	state: string
	zipCode: string
	billingStreetAddress: string
	billingCity: string
	billingState: string
	billingZipCode: string
	cardNumber: string
	expirationDate: string
	cvv: string
	promoCode: string
}

interface FieldErrors {
	fullname?: string
	email?: string
	streetAddress?: string
	city?: string
	state?: string
	zipCode?: string
	billingStreetAddress?: string
	billingCity?: string
	billingState?: string
	billingZipCode?: string
	cardNumber?: string
	expirationDate?: string
	cvv?: string
	promoCode?: string
}

// Schema definitions moved outside component to prevent recreation
const fieldSchemas = {
	fullname: z.object({
		fullname: z.string().min(3, "Full name must be at least 3 characters long"),
	}),
	email: z.object({
		email: z.string().email("Invalid email address"),
	}),
	streetAddress: z.object({
		streetAddress: z.string().min(5, "Street address must be at least 5 characters long"),
	}),
	city: z.object({
		city: z.string().min(2, "City must be at least 2 characters long"),
	}),
	state: z.object({
		state: z.string().min(2, "State must be at least 2 characters long"),
	}),
	zipCode: z.object({
		zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
	}),
	billingStreetAddress: z.object({
		billingStreetAddress: z.string().min(5, "Billing street address must be at least 5 characters long"),
	}),
	billingCity: z.object({
		billingCity: z.string().min(2, "Billing city must be at least 2 characters long"),
	}),
	billingState: z.object({
		billingState: z.string().min(2, "Billing state must be at least 2 characters long"),
	}),
	billingZipCode: z.object({
		billingZipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid billing ZIP code format"),
	}),
	cardNumber: z.object({
		cardNumber: z.string().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Invalid card number format"),
	}),
	expirationDate: z.object({
		expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date format (MM/YY)"),
	}),
	cvv: z.object({
		cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
	}),
	promoCode: z.object({
		promoCode: z.string().optional(),
	}),
} as const

const FormExample3 = () => {
	const [formData, setFormData] = useState<FormData>({
		fullname: "",
		email: "",
		streetAddress: "",
		city: "",
		state: "",
		zipCode: "",
		billingStreetAddress: "",
		billingCity: "",
		billingState: "",
		billingZipCode: "",
		cardNumber: "",
		expirationDate: "",
		cvv: "",
		promoCode: "",
	})
	// const [errors, setErrors] = useState<FieldErrors>({})
	const [sameAsShipping, setSameAsShipping] = useState(false)

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
			streetAddress: (value: string) => {
				const result = fieldSchemas.streetAddress.safeParse({ streetAddress: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.streetAddress?.[0]
			},
			city: (value: string) => {
				const result = fieldSchemas.city.safeParse({ city: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.city?.[0]
			},
			state: (value: string) => {
				const result = fieldSchemas.state.safeParse({ state: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.state?.[0]
			},
			zipCode: (value: string) => {
				const result = fieldSchemas.zipCode.safeParse({ zipCode: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.zipCode?.[0]
			},
			billingStreetAddress: (value: string) => {
				const result = fieldSchemas.billingStreetAddress.safeParse({ billingStreetAddress: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.billingStreetAddress?.[0]
			},
			billingCity: (value: string) => {
				const result = fieldSchemas.billingCity.safeParse({ billingCity: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.billingCity?.[0]
			},
			billingState: (value: string) => {
				const result = fieldSchemas.billingState.safeParse({ billingState: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.billingState?.[0]
			},
			billingZipCode: (value: string) => {
				const result = fieldSchemas.billingZipCode.safeParse({ billingZipCode: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.billingZipCode?.[0]
			},
			cardNumber: (value: string) => {
				const result = fieldSchemas.cardNumber.safeParse({ cardNumber: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.cardNumber?.[0]
			},
			expirationDate: (value: string) => {
				const result = fieldSchemas.expirationDate.safeParse({ expirationDate: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.expirationDate?.[0]
			},
			cvv: (value: string) => {
				const result = fieldSchemas.cvv.safeParse({ cvv: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.cvv?.[0]
			},
			promoCode: (value: string) => {
				const result = fieldSchemas.promoCode.safeParse({ promoCode: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.promoCode?.[0]
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
				// const error = fieldValidators[fieldName](value)
				// setErrors((prev) => ({ ...prev, [fieldName]: error }))
			}
		},
		[fieldValidators]
	)

	// Handle checkbox change
	const handleCheckboxChange = useCallback((checked: boolean) => {
		setSameAsShipping(checked)

		// If same as shipping is checked, copy shipping data to billing
		if (checked) {
			setFormData((prev) => ({
				...prev,
				billingStreetAddress: prev.streetAddress,
				billingCity: prev.city,
				billingState: prev.state,
				billingZipCode: prev.zipCode,
			}))

			// Clear billing errors when copying from shipping
			// setErrors((prev) => ({
			// 	...prev,
			// 	billingStreetAddress: undefined,
			// 	billingCity: undefined,
			// 	billingState: undefined,
			// 	billingZipCode: undefined,
			// }))
		}
	}, [])

	// Updated submit handler to validate all fields
	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault()

			const newErrors: FieldErrors = {}
			let hasErrors = false

			// Required fields that should always be validated
			const requiredFields = ["fullname", "email", "streetAddress", "city", "state", "zipCode", "cardNumber", "expirationDate", "cvv"] as const

			// Add billing fields to validation if not using same as shipping
			const fieldsToValidate = sameAsShipping ? requiredFields : ([...requiredFields, "billingStreetAddress", "billingCity", "billingState", "billingZipCode"] as const)

			// Validate all required fields
			fieldsToValidate.forEach((fieldName) => {
				const field = fieldName as keyof typeof fieldValidators
				const value = formData[field] as string
				const error = fieldValidators[field](value)
				if (error) {
					newErrors[field] = error
					hasErrors = true
				}
			})

			// setErrors(newErrors)

			if (!hasErrors) {
				// All validation passed - show success toast with all data
				const submissionData = {
					...formData,
					sameAsShipping,
				}

				showToast({
					title: "Form Submitted Successfully!",
					variant: "inverse",
					description: JSON.stringify(submissionData, null, 2),
					icon: <CircleUser />,
					closable: false,
				})
			}
		},
		[formData, fieldValidators, sameAsShipping]
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
					<form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6">
						<div>
							<h1 className="text-center text-3xl font-bold">Secure Checkout</h1>
							<p className="text-center text-lg">Complete your order with our secure payment system</p>
						</div>

						{/* Contact Information */}
						<div className="space-y-4">
							<h3 className="flex items-center text-lg font-semibold">
								<User className="mr-2 h-5 w-5" />
								Contact Information
							</h3>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<Input name="fullname" className="w-full" value={formData.fullname} onChange={handleChange} placeholder="Enter full name" />

								<Input name="email" className="w-full" value={formData.email} onChange={handleChange} placeholder="Enter email address" />
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
								<Input name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="New Road" />

								<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
									<Input name="city" className="w-full" value={formData.city} onChange={handleChange} placeholder="Kathmandu" />

									<Input name="state" className="w-full" value={formData.state} onChange={handleChange} placeholder="KTM" />

									<Input name="zipCode" className="w-full" value={formData.zipCode} onChange={handleChange} placeholder="44600" />
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
									<Checkbox checked={sameAsShipping} onCheckedChange={handleCheckboxChange} />
									<Label htmlFor="sameAsShipping">Same as shipping address</Label>
								</div>
							</div>

							{!sameAsShipping && (
								<div className="grid grid-cols-1 gap-4">
									<Input name="billingStreetAddress" className="w-full" value={formData.billingStreetAddress} onChange={handleChange} placeholder="New Road" />

									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										<Input name="billingCity" className="w-full" value={formData.billingCity} onChange={handleChange} placeholder="Kathmandu" />

										<Input name="billingState" className="w-full" value={formData.billingState} onChange={handleChange} placeholder="KTM" />

										<Input name="billingZipCode" className="w-full" value={formData.billingZipCode} onChange={handleChange} placeholder="44600" />
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
								<Input name="cardNumber" className="w-full" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" />

								<div className="grid grid-cols-2 gap-4">
									<Input name="expirationDate" className="w-full" value={formData.expirationDate} onChange={handleChange} placeholder="MM/YY" />

									<Input name="cvv" className="w-full" value={formData.cvv} onChange={handleChange} placeholder="123" />
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

							<Input name="promoCode" className="w-full" value={formData.promoCode} onChange={handleChange} placeholder="Enter promo code" />
						</div>

						{/* Submit Button */}
						<Button type="submit" className="w-full">
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
