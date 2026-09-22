import { z } from "zod"

export const checkoutFormSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	cardName: z.string().min(2, "Name on card is required"),
	cardNumber: z
		.string()
		.min(16, "Card number must be 16 digits")
		.max(19, "Card number is too long"),
	expiryDate: z
		.string()
		.min(4, "Expiry date is required")
		.regex(
			/^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
			"Enter a valid expiry date (MM/YY)"
		),
	cvv: z
		.string()
		.min(3, "CVV must be 3 or 4 digits")
		.max(4, "CVV must be 3 or 4 digits"),
	billingAddress: z.string().min(3, "Address is required"),
	city: z.string().min(2, "City is required"),
	zipCode: z.string().min(3, "ZIP Code is required"),
	country: z.string().min(1, "Please select a country"),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>

export const DEFAULT_CHECKOUT_VALUES: CheckoutFormValues = {
	email: "",
	cardName: "",
	cardNumber: "",
	expiryDate: "",
	cvv: "",
	billingAddress: "",
	city: "",
	zipCode: "",
	country: "",
}

export const COUNTRIES = [
	{ value: "us", label: "United States" },
	{ value: "ca", label: "Canada" },
	{ value: "gb", label: "United Kingdom" },
	{ value: "au", label: "Australia" },
	{ value: "de", label: "Germany" },
	{ value: "fr", label: "France" },
	{ value: "jp", label: "Japan" },
]
