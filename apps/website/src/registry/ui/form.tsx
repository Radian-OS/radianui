import { ChangeEvent, FocusEvent, FormEvent, useState } from "react"
import { z } from "zod"
import { Button } from "./button"
import { Input } from "./input"
import { Password } from "./password"

// Field configuration type
export interface FieldConfig {
	name: string
	label: string
	type: "text" | "password" | "email" | "number"
	placeholder?: string
	required?: boolean
}

// Generic form props
export interface DynamicFormProps<T extends Record<string, unknown>> {
	fields: FieldConfig[]
	schema: z.ZodSchema<T>
	initialData?: Partial<T>
	onSubmit: (data: T) => void
	submitButtonText?: string
	className?: string
}

// Type for Zod object schema with shape property
type ZodObjectSchema<T> = z.ZodObject<z.ZodRawShape> & {
	shape: Record<keyof T, z.ZodTypeAny>
}

// Generic form component
function DynamicForm<T extends Record<string, unknown>>({ fields, schema, initialData = {}, onSubmit, submitButtonText = "Submit", className = "space-y-4" }: DynamicFormProps<T>) {
	// Initialize form data with proper typing
	const [formData, setFormData] = useState<Partial<T>>(() => {
		const initial: Partial<T> = {}
		fields.forEach((field) => {
			initial[field.name as keyof T] = initialData[field.name as keyof T] || ("" as T[keyof T])
		})
		return initial
	})

	const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))

		// Validate field in real-time if there's already an error showing
		if (errors[name as keyof T]) {
			const error = validateField(name, value)
			setErrors((prev) => ({
				...prev,
				[name]: error,
			}))
		}
	}

	const validateField = (fieldName: string, value: string): string => {
		try {
			// Type-safe access to schema shape
			const objectSchema = schema as ZodObjectSchema<T>
			const fieldSchema = objectSchema.shape[fieldName as keyof T]
			if (fieldSchema) {
				fieldSchema.parse(value)
			}
			return ""
		} catch (error) {
			if (error instanceof z.ZodError) {
				return error.issues[0]?.message || "Invalid input"
			}
			return "Invalid input"
		}
	}

	const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
		const { name, value } = e.target
		const error = validateField(name, value)

		setErrors((prev) => ({
			...prev,
			[name]: error,
		}))
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		try {
			// Validate entire form
			const validatedData = schema.parse(formData)

			// Clear all errors
			setErrors({})

			// Handle successful validation
			onSubmit(validatedData)
		} catch (error) {
			// Handle validation errors
			const fieldErrors: Partial<Record<keyof T, string>> = {}

			if (error instanceof z.ZodError) {
				error.issues.forEach((err) => {
					const fieldName = err.path[0] as keyof T
					if (!fieldErrors[fieldName]) {
						fieldErrors[fieldName] = err.message
					}
				})
			}

			setErrors(fieldErrors)
		}
	}

	const renderField = (field: FieldConfig) => {
		const commonProps = {
			id: field.name,
			name: field.name,
			label: field.label,
			value: (formData[field.name as keyof T] as string) || "",
			onChange: handleChange,
			onBlur: handleBlur,
			hasError: !!errors[field.name as keyof T],
			hint: errors[field.name as keyof T] || "",
			placeholder: field.placeholder,
		}

		switch (field.type) {
			case "password":
				return <Password trail="show" key={field.name} {...commonProps} />
			case "email":
				return <Input key={field.name} {...commonProps} type="email" />
			case "number":
				return <Input key={field.name} {...commonProps} type="number" />
			default:
				return <Input key={field.name} {...commonProps} type="text" />
		}
	}

	return (
		<form onSubmit={handleSubmit} className={className}>
			{fields.map(renderField)}
			<Button type="submit" className="w-full">
				{submitButtonText}
			</Button>
		</form>
	)
}

export default DynamicForm
