import { ChangeEvent, FormEvent, useState } from "react"
import { CalendarDate, Time } from "@internationalized/date"
import { Value } from "react-phone-number-input"
import * as RPNInput from "react-phone-number-input"
import { z } from "zod"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import ColorPicker from "./color-picker"
import { CurrencyInput } from "./currency"
import DatePicker from "./date-picker"
import FileUpload, { FileWithPreview } from "./file-upload"
import { Input } from "./input"
import { Password } from "./password"
import { PhoneNumber } from "./phone-number"
import { RadioGroup, RadioGroupItem } from "./radiogroup"
import SearchInput from "./search"
import { Select, SelectGroup, SelectItem } from "./select"
import Slider from "./slider"
import Switch from "./switch"
import { TextArea } from "./text-area"
import TimePicker from "./time-picker"

// Enhanced field configuration type with all supported field types
export interface FieldConfig {
	name: string
	label: string
	type:
		| "text"
		| "password"
		| "email"
		| "number"
		| "textarea"
		| "search"
		| "currency"
		| "phone"
		| "select"
		| "checkbox"
		| "switch"
		| "radio"
		| "slider"
		| "color"
		| "date"
		| "time"
		| "file"
	placeholder?: string
	required?: boolean
	// Additional properties for specific field types
	options?: Array<{ value: string; label: string }> // For select, radio
	min?: number // For number, slider
	max?: number // For number, slider
	step?: number // For number, slider
	maxLength?: number // For text inputs
	accept?: string // For file uploads
	multiple?: boolean // For select, file uploads
	currency?: string // For currency input
	locale?: string // For currency input
	separator?: boolean // For currency input
	showTime?: boolean // For date picker
	trail?: string // For password field
	international?: boolean // For phone number
	countryDropdown?: boolean // For phone number
	defaultCountry?: RPNInput.Country // For phone number
	size?: string // For color picker
	disabled?: boolean // General property
	className?: string // Additional styling
}

// Generic form props
export interface DynamicFormProps<T extends Record<string, unknown>> {
	fields: FieldConfig[]
	schema: z.ZodSchema<T>
	initialData?: Partial<T>
	onSubmit: (data: T) => void
	submitButtonText?: string
	className?: string
	sections?: Array<{
		title: string
		description?: string
		fields: string[] // field names in this section
	}>
}

// Type for Zod object schema with shape property
type ZodObjectSchema<T> = z.ZodObject<z.ZodRawShape> & {
	shape: Record<keyof T, z.ZodTypeAny>
}

// Generic form component
function DynamicForm<T extends Record<string, unknown>>({
	fields,
	schema,
	initialData = {},
	onSubmit,
	submitButtonText = "Submit",
	className = "space-y-4",
	sections,
}: DynamicFormProps<T>) {
	// Initialize form data with proper typing for all field types
	const [formData, setFormData] = useState<Partial<T>>(() => {
		const initial: Partial<T> = {}
		fields.forEach((field) => {
			const initialValue = initialData[field.name as keyof T]

			// Set appropriate default values based on field type
			switch (field.type) {
				case "checkbox":
				case "switch":
					initial[field.name as keyof T] = (initialValue || false) as T[keyof T]
					break
				case "slider":
					initial[field.name as keyof T] = (initialValue || [field.min || 0]) as T[keyof T]
					break
				case "select":
					initial[field.name as keyof T] = (initialValue || (field.multiple ? [] : "")) as T[keyof T]
					break
				case "file":
					initial[field.name as keyof T] = (initialValue || []) as T[keyof T]
					break
				case "phone":
					initial[field.name as keyof T] = (initialValue || undefined) as T[keyof T]
					break
				case "date":
				case "time":
					initial[field.name as keyof T] = (initialValue || null) as T[keyof T]
					break
				case "color":
					initial[field.name as keyof T] = (initialValue || { hsv: [], rgb: [] }) as T[keyof T]
					break
				default:
					initial[field.name as keyof T] = (initialValue || "") as T[keyof T]
			}
		})
		return initial
	})

	const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
	const [phoneCountries, setPhoneCountries] = useState<Record<string, RPNInput.Country>>({})

	const handleChange = (fieldName: string, value: unknown): void => {
		setFormData((prev) => ({
			...prev,
			[fieldName]: value,
		}))

		// Validate field in real-time if there's already an error showing
		if (errors[fieldName as keyof T]) {
			const error = validateField(fieldName, value)
			setErrors((prev) => ({
				...prev,
				[fieldName]: error,
			}))
		}
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { name, value, type } = e.target

		if (type === "checkbox") {
			const checked = (e.target as HTMLInputElement).checked
			handleChange(name, checked)
		} else {
			handleChange(name, value)
		}
	}

	const validateField = (fieldName: string, value: unknown): string => {
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

	const handleBlur = (fieldName: string, value: unknown): void => {
		const error = validateField(fieldName, value)
		setErrors((prev) => ({
			...prev,
			[fieldName]: error,
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
		const fieldValue = formData[field.name as keyof T]
		const hasError = !!errors[field.name as keyof T]
		const errorMessage = errors[field.name as keyof T] || ""

		const commonProps = {
			id: field.name,
			name: field.name,
			label: field.label,
			hasError,
			hint: errorMessage,
			placeholder: field.placeholder,
			disabled: field.disabled,
			className: field.className,
		}

		switch (field.type) {
			case "password":
				return (
					<Password
						key={field.name}
						{...commonProps}
						trail={"show"}
						value={(fieldValue as string) || ""}
						onChange={handleInputChange}
						onBlur={(e) => handleBlur(field.name, e.target.value)}
						maxLength={field.maxLength}
					/>
				)

			case "email":
				return (
					<Input
						key={field.name}
						{...commonProps}
						type="email"
						value={(fieldValue as string) || ""}
						onChange={handleInputChange}
						onBlur={(e) => handleBlur(field.name, e.target.value)}
						maxLength={field.maxLength}
					/>
				)

			case "number":
				return (
					<Input
						key={field.name}
						{...commonProps}
						type="number"
						value={(fieldValue as string) || ""}
						onChange={handleInputChange}
						onBlur={(e) => handleBlur(field.name, e.target.value)}
						min={field.min}
						max={field.max}
						step={field.step}
					/>
				)

			case "textarea":
				return (
					<TextArea key={field.name} {...commonProps} value={(fieldValue as string) || ""} onChange={handleInputChange} onBlur={(e) => handleBlur(field.name, e.target.value)} />
				)

			case "search":
				return (
					<SearchInput key={field.name} {...commonProps} value={(fieldValue as string) || ""} onChange={handleInputChange} onBlur={(e) => handleBlur(field.name, e.target.value)} />
				)

			case "currency":
				return (
					<CurrencyInput
						key={field.name}
						{...commonProps}
						value={(fieldValue as string) || ""}
						onChange={(e) => handleChange(field.name, e.target.value)}
						currency={field.currency || "USD"}
						locale={field.locale || "en-US"}
						separator={field.separator || true}
						maxValue={field.max || 1000000}
						minValue={field.min || 0}
					/>
				)

			case "phone":
				return (
					<PhoneNumber
						key={field.name}
						{...commonProps}
						value={fieldValue as Value}
						onChange={(value) => handleChange(field.name, value)}
						country={phoneCountries[field.name] || field.defaultCountry || "US"}
						onCountryChange={(country) => {
							setPhoneCountries((prev) => ({
								...prev,
								[field.name]: country || "US",
							}))
						}}
						international={field.international}
						countryCallingCodeEditable={field.international}
						showTrigger={field.countryDropdown}
						countryDropdown={field.countryDropdown}
					/>
				)

			case "select":
				return (
					<Select
						key={field.name}
						{...commonProps}
						variants="input"
						rounded="lg"
						selectionMode={field.multiple ? "multiple" : "single"}
						selectedValues={field.multiple ? (fieldValue as string[]) || [] : [(fieldValue as string) || ""]}
						onSelectedChange={(values) => {
							const newValue = field.multiple ? values : values[0] || ""
							handleChange(field.name, newValue)
						}}>
						<SelectGroup>
							{field.options?.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectGroup>
					</Select>
				)

			case "checkbox":
				return (
					<div key={field.name} className="flex items-center gap-3">
						<Checkbox checked={(fieldValue as boolean) || false} onChange={() => handleChange(field.name, !(fieldValue as boolean))} />
						<label htmlFor={field.name} className="text-sm font-medium">
							{field.label}
						</label>
						{hasError && <span className="text-sm text-red-500">{errorMessage}</span>}
					</div>
				)

			case "switch":
				return (
					<div key={field.name} className="space-y-2">
						<Switch isSelected={(fieldValue as boolean) || false} onValueChange={(checked) => handleChange(field.name, checked)}>
							{field.label}
						</Switch>
						{hasError && <span className="text-sm text-red-500">{errorMessage}</span>}
					</div>
				)

			case "radio":
				return (
					<RadioGroup key={field.name} value={(fieldValue as string) || ""} onValueChange={(value) => handleChange(field.name, value)} label={field.label}>
						{field.options?.map((option) => (
							<RadioGroupItem key={option.value} value={option.value}>
								{option.label}
							</RadioGroupItem>
						))}
					</RadioGroup>
				)

			case "slider":
				return (
					<div key={field.name} className="space-y-2">
						<Slider
							label={field.label}
							value={(fieldValue as number[]) || [field.min || 0]}
							onValueChange={(newValue) => handleChange(field.name, newValue)}
							min={field.min || 0}
							max={field.max || 100}
						/>
						{hasError && <span className="text-sm text-red-500">{errorMessage}</span>}
					</div>
				)

			case "color":
				return (
					<div key={field.name} className="space-y-2">
						<ColorPicker
							rounded="lg"
							hasError={hasError}
							size={field.size as import("./color-picker").SizeOptions}
							disabled={field.disabled || false}
							label={field.label}
							onColorChange={(hsv, rgb) => {
								handleChange(field.name, { hsv, rgb })
							}}
						/>
						{hasError && <span className="text-sm text-red-500">{errorMessage}</span>}
					</div>
				)

			case "date":
				// interface DatePickerProps {
				// 	key: string
				// 	mode: "single" | "range"
				// 	selected: CalendarDate | undefined
				// 	onSelect: (value: CalendarDate | null) => void
				// 	showTime?: boolean
				// 	label: string
				// 	placeholder?: string
				// }

				return (
					<DatePicker
						key={field.name}
						mode="single"
						selected={fieldValue as CalendarDate | undefined}
						onSelect={(value: CalendarDate | undefined) => handleChange(field.name, value)}
						showTime={field.showTime || false}
						label={field.label}
						placeholder={field.placeholder || "Pick a date"}
					/>
				)

			case "time":
				return <TimePicker key={field.name} value={fieldValue as Time | null} onValueChange={(value) => handleChange(field.name, value)} label={field.label} />

			case "file":
				return (
					<div key={field.name} className="space-y-2">
						<FileUpload label={field.label} accept={field.accept || "*"} value={(fieldValue as FileWithPreview[]) || []} onChange={(files) => handleChange(field.name, files)} />
						{hasError && <span className="text-sm text-red-500">{errorMessage}</span>}
					</div>
				)

			default: // text
				return (
					<Input
						key={field.name}
						{...commonProps}
						type="text"
						value={(fieldValue as string) || ""}
						onChange={handleInputChange}
						onBlur={(e) => handleBlur(field.name, e.target.value)}
						maxLength={field.maxLength}
					/>
				)
		}
	}

	const renderFormContent = () => {
		if (sections && sections.length > 0) {
			return sections.map((section, index) => (
				<div key={index} className="space-y-5">
					<h3 className="text-text border-border border-b pb-2 text-lg font-medium">{section.title}</h3>
					{section.description && <p className="text-text-tertiary text-sm">{section.description}</p>}
					<div className="space-y-4">
						{section.fields.map((fieldName) => {
							const field = fields.find((f) => f.name === fieldName)
							return field ? renderField(field) : null
						})}
					</div>
				</div>
			))
		}

		// If no sections defined, render all fields in a simple layout
		return fields.map(renderField)
	}

	return (
		<form onSubmit={handleSubmit} className={className}>
			{renderFormContent()}
			<Button type="submit" className="w-full">
				{submitButtonText}
			</Button>
		</form>
	)
}

export default DynamicForm
