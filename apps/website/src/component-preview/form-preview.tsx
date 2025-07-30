import React, { useCallback, useMemo, useState } from "react"
import { CalendarDate } from "@internationalized/date"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import { Value } from "react-phone-number-input"
import * as RPNInput from "react-phone-number-input"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import ColorPicker from "@/registry/ui/color-picker"
import { CurrencyInput } from "@/registry/ui/currency"
import DatePicker from "@/registry/ui/date-picker"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownTrigger } from "@/registry/ui/dropdown"
import FileUpload, { FileWithPreview } from "@/registry/ui/file-upload"
import { Input } from "@/registry/ui/input"
import { InputOtp } from "@/registry/ui/input-otp"
import { Password } from "@/registry/ui/password"
import { PhoneNumber } from "@/registry/ui/phone-number"
import SearchInput from "@/registry/ui/search"
import { Select, SelectGroup, SelectItem } from "@/registry/ui/select"
import Slider from "@/registry/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { TextArea } from "@/registry/ui/text-area"
import { Toaster, showToast } from "@/registry/ui/toast"

// Field type definitions
type FieldType = "username" | "password" | "colorPicker" | "select" | "otp" | "currency" | "searchInput" | "date" | "file" | "phoneno" | "textarea" | "slider"

interface FormData {
	username: string
	password: string
	colorPicker: string
	select: string
	otp: string
	currency: string
	searchInput: string
	date: string
	file: string
	phoneno: string
	textarea?: string
	slider?: number
}

interface FieldErrors {
	username?: string
	password?: string
	colorPicker?: string
	select?: string
	otp?: string
	currency?: string
	searchInput?: string
	date?: string
	file?: string
	phoneno?: string
	textarea?: string
	slider?: string
}

// Schema definitions moved outside component to prevent recreation
const fieldSchemas = {
	username: z.object({
		username: z.string().min(3, "Username must be at least 3 characters long"),
	}),
	password: z.object({
		password: z.string().min(8, "Password must be at least 8 characters long"),
	}),
	searchInput: z.object({
		searchInput: z.string().min(4, "Search input must be at least 4 characters long"),
	}),
	otp: z.object({
		otp: z.string().min(6, "Invalid"),
	}),
	currency: z.object({
		currency: z.string().min(1, "Currency amount is required"),
	}),
	textarea: z.object({
		textarea: z.string().min(5, "Textarea must be at least 5 characters long"),
	}),
} as const

const FormPreview = () => {
	const [formData, setFormData] = useState<FormData>({
		username: "",
		password: "",
		colorPicker: "",
		select: "",
		otp: "",
		currency: "",
		searchInput: "",
		date: "",
		file: "",
		phoneno: "",
		textarea: "",
		slider: 0,
	})
	const [errors, setErrors] = useState<FieldErrors>({})
	const [selectedValue, setSelectedValue] = useState<string[]>(["username"])
	const [displayField, setDisplayField] = useState<FieldType>("username")
	const [selectedDate, setSelectedDate] = useState<CalendarDate | undefined>(undefined)
	const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([])
	const [sliderValue, setSliderValue] = useState([25])

	const [phoneValue, setPhoneValue] = useState<Value>()
	const [selectedCountry, setSelectedCountry] = useState<RPNInput.Country>("US")
	const [colorValues, setColorValues] = useState<{ hsv: number[]; rgb: number[]; hex: string }>({
		hsv: [],
		rgb: [],
		hex: "#000000",
	})
	const [selectValues, setSelectValues] = useState<string[]>([])

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
			searchInput: (value: string) => {
				const result = fieldSchemas.searchInput.safeParse({ searchInput: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.searchInput?.[0]
			},
			textarea: (value: string) => {
				const result = fieldSchemas.textarea.safeParse({ textarea: value })
				return result.success ? undefined : result.error.flatten().fieldErrors.textarea?.[0]
			},
			otp: (value: string) => {
				if (value.length === 0) return undefined // No error for empty field
				return value.length !== 6 ? "OTP must be 6 digits" : undefined
			},
			currency: (value: string) => {
				if (value.length === 0) return "Currency amount is required"
				const numericValue = value.replace(/[$,\s]/g, "")
				if (isNaN(Number(numericValue)) || Number(numericValue) <= 0) {
					return "Please enter a valid amount"
				}
				return undefined
			},
		}),
		[]
	)

	// Submit handlers using lookup object
	const submitHandlers = useMemo(
		() => ({
			username: () => {
				const result = fieldSchemas.username.safeParse({ username: formData.username })
				if (result.success) {
					showToast({ title: "Username: " + result.data.username })
					return true
				} else {
					setErrors({ username: result.error.flatten().fieldErrors.username?.[0] })
					return false
				}
			},
			password: () => {
				const result = fieldSchemas.password.safeParse({ password: formData.password })
				if (result.success) {
					showToast({ title: "Password: " + result.data.password })
					return true
				} else {
					setErrors({ password: result.error.flatten().fieldErrors.password?.[0] })
					return false
				}
			},
			searchInput: () => {
				const result = fieldSchemas.searchInput.safeParse({ searchInput: formData.searchInput })
				if (result.success) {
					showToast({ title: "Search Input: " + result.data.searchInput })
					return true
				} else {
					setErrors({ searchInput: result.error.flatten().fieldErrors.searchInput?.[0] })
					return false
				}
			},
			textarea: () => {
				const result = fieldSchemas.textarea.safeParse({ textarea: formData.textarea })
				if (result.success) {
					showToast({ title: "Textarea: " + result.data.textarea })
					return true
				} else {
					setErrors({ textarea: result.error.flatten().fieldErrors.textarea?.[0] })
					return false
				}
			},
			colorPicker: () => {
				showToast({ title: "Color Picker (HEX): " + colorValues.hex })
				return true
			},
			select: () => {
				const selectedValue = selectValues[0] || ""
				if (!selectedValue) {
					setErrors({ select: "Please select an option" })
					return false
				} else {
					showToast({ title: "Selected Value: " + selectValues })
					return true
				}
			},
			date: () => {
				if (formData.date.length === 0) {
					setErrors({ date: "Please select a date" })
					return false
				} else {
					showToast({ title: "Selected Date: " + formData.date })
					return true
				}
			},
			slider: () => {
				if (sliderValue.length === 0) {
					setErrors({ slider: "Please select a value" })
					return false
				} else {
					showToast({ title: "Slider Value: " + sliderValue[0] })
					return true
				}
			},
			phoneno: () => {
				if (!phoneValue || phoneValue.length === 0) {
					setErrors({ phoneno: "Please enter a valid phone number" })
					return false
				} else {
					showToast({ title: "Phone Number: " + phoneValue + " (" + selectedCountry + ")" })
					return true
				}
			},
			file: () => {
				if (uploadedFiles.length === 0) {
					setErrors({ file: "Please upload a file" })
					return false
				} else {
					const fileInfo = uploadedFiles
						.map((file) => {
							const sizeInKB = (file.file.size / 1024).toFixed(2)
							const sizeInMB = (file.file.size / (1024 * 1024)).toFixed(2)
							const displaySize = file.file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`
							return `${file.file.name} | (${displaySize}) | ${file.file.type}`
						})
						.join(", ")
					showToast({ title: "Uploaded Files: " + fileInfo })
					return true
				}
			},

			otp: () => {
				if (formData.otp.length !== 6) {
					setErrors({ otp: "OTP must be 6 digits" })
					return false
				} else {
					showToast({ title: "OTP: " + formData.otp })
					return true
				}
			},
			currency: () => {
				const error = fieldValidators.currency(formData.currency)
				if (error) {
					setErrors({ currency: error })
					return false
				} else {
					showToast({ title: "Currency: " + formData.currency })
					return true
				}
			},
		}),
		[formData, colorValues.hex, selectValues, uploadedFiles, fieldValidators]
	)

	const handlePhoneChange = useCallback((value: Value) => {
		setPhoneValue(value)
		setFormData((prev) => ({ ...prev, phoneno: value || "" }))

		// Clear phone error when user starts typing
		if (value && value.length > 0) {
			setErrors((prev) => ({ ...prev, phoneno: undefined }))
		}
	}, [])
	// Optimized change handler with useCallback
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target

			setFormData((prev) => ({ ...prev, [name]: value }))

			// Validate only if current field and has validator
			const fieldName = name as keyof typeof fieldValidators
			if (displayField === fieldName && fieldValidators[fieldName]) {
				const error = fieldValidators[fieldName](value)
				setErrors((prev) => ({ ...prev, [fieldName]: error }))
			}
		},
		[displayField, fieldValidators]
	)

	// Optimized submit handler
	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault()

			const handler = submitHandlers[displayField]
			if (handler) {
				handler()
			}
		},
		[displayField, submitHandlers]
	)

	// Optimized selection change handler
	const handleSelectionChange = useCallback((selectedValues: string[]): void => {
		setSelectedValue(selectedValues)
		const selectedOption = selectedValues[0] as FieldType
		if (selectedOption) {
			setDisplayField(selectedOption)
			// Clear errors when switching fields
			setErrors({})
		}
	}, [])

	const handleSelectChange = useCallback((values: string[]): void => {
		setSelectValues(values)
		setFormData((prev) => ({ ...prev, select: values[0] || "" }))
		// Clear select error when user makes selection
		if (values[0]) {
			setErrors((prev) => ({ ...prev, select: undefined }))
		}
	}, [])

	const handleColorChange = useCallback((hsv: number[], rgb: number[], hex: string) => {
		setColorValues({ hsv, rgb, hex })
		setFormData((prev) => ({ ...prev, colorPicker: hex }))
	}, [])

	// Handler for OTP value change
	const handleOtpChange = useCallback(
		(newValue: string) => {
			setFormData((prev) => ({ ...prev, otp: newValue }))

			// Validate OTP in real-time
			if (displayField === "otp") {
				const error = fieldValidators.otp(newValue)
				setErrors((prev) => ({ ...prev, otp: error }))
			}
		},
		[displayField, fieldValidators]
	)

	const handleCurrencyChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			setFormData((prev) => ({ ...prev, currency: value }))

			if (displayField === "currency") {
				const error = fieldValidators.currency(value)
				setErrors((prev) => ({ ...prev, currency: error }))
			}
		},
		[displayField, fieldValidators]
	)

	// Fixed file upload handler
	const handleFileChange = useCallback((files: FileWithPreview[]) => {
		setUploadedFiles(files)
		// Update formData.file with file names
		const fileNames = files.map((file) => file.file.name).join(", ")
		setFormData((prev) => ({ ...prev, file: fileNames }))
		// Clear file error when files are uploaded
		if (files.length > 0) {
			setErrors((prev) => ({ ...prev, file: undefined }))
		}
	}, [])

	// Add a separate change handler for textarea
	const handleTextAreaChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const { name, value } = e.target

			setFormData((prev) => ({ ...prev, [name]: value }))

			// Validate only if current field and has validator
			const fieldName = name as keyof typeof fieldValidators
			if (displayField === fieldName && fieldValidators[fieldName]) {
				const error = fieldValidators[fieldName](value)
				setErrors((prev) => ({ ...prev, [fieldName]: error }))
			}
		},
		[displayField, fieldValidators]
	)

	// Field render functions using lookup object instead of nested if-else
	const fieldRenderers = useMemo(
		() => ({
			username: () => (
				<Input
					name="username"
					id="username"
					label="Username"
					className="w-full"
					value={formData.username}
					onChange={handleChange}
					placeholder="Enter username"
					hasError={!!errors.username}
					hint={errors.username}
				/>
			),
			password: () => (
				<Password
					name="password"
					id="password"
					label="Password"
					className="w-full"
					placeholder="Enter password"
					hasError={!!errors.password}
					hint={errors.password}
					onChange={handleChange}
					value={formData.password}
				/>
			),
			colorPicker: () => <ColorPicker label="Color Picker" className="w-full" onColorChange={handleColorChange} hasError={!!errors.colorPicker} hint={errors.colorPicker} />,
			select: () => (
				<Select
					label="Product Category"
					placeholder="--Choose a product--"
					variants="input"
					rounded="lg"
					selectionMode="single"
					selectedValues={selectValues}
					onSelectedChange={handleSelectChange}
					hasError={!!errors.select}
					hint={errors.select}>
					<SelectGroup>
						<SelectItem value="company-profile">Company Profile</SelectItem>
						<SelectItem value="view-profile">View Profile</SelectItem>
						<SelectItem value="keyboard-shortcuts">Keyboard Shortcuts</SelectItem>
						<SelectItem value="team">Team</SelectItem>
						<SelectItem value="invite-colleagues">Invite Colleagues</SelectItem>
						<SelectItem value="change-logs">Change Logs</SelectItem>
						<SelectItem value="slack-community">Slack Community</SelectItem>
						<SelectItem value="support">Support</SelectItem>
						<SelectItem value="api">API</SelectItem>
					</SelectGroup>
				</Select>
			),
			otp: () => <InputOtp label="OTP" className="w-full" value={formData.otp} onChange={handleOtpChange} placeholder="Enter OTP" hasError={!!errors.otp} />,
			currency: () => (
				<CurrencyInput
					label="Amount"
					value={formData.currency}
					onChange={handleCurrencyChange}
					currency="USD"
					locale="en-US"
					separator={true}
					placeholder="Enter amount"
					maxValue={1000000}
					minValue={0}
					hasError={!!errors.currency}
					hint={errors.currency}
				/>
			),
			searchInput: () => (
				<SearchInput
					label="Search"
					name="searchInput"
					value={formData.searchInput}
					onChange={handleChange}
					placeholder="Search..."
					hasError={!!errors.searchInput}
					hint={errors.searchInput}
				/>
			),
			date: () => (
				<DatePicker
					mode="single"
					selected={selectedDate}
					onSelect={(value: CalendarDate | undefined) => {
						setSelectedDate(value)
						setFormData((prev) => ({ ...prev, date: value ? value.toString() : "" }))
						if (value) {
							setErrors((prev) => ({ ...prev, date: undefined }))
						}
					}}
					showTime={false}
					label="Start Date"
					placeholder="Pick a date"
					hasError={!!errors.date}
					hint={errors.date}
				/>
			),
			file: () => <FileUpload label="Upload Documents" maxFiles={1} accept="*" value={uploadedFiles} onChange={handleFileChange} hasError={!!errors.file} hint={errors.file} />,
			phoneno: () => (
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
			),
			textarea: () => (
				<TextArea
					label="Description"
					name="textarea"
					value={formData.textarea}
					onChange={handleTextAreaChange}
					placeholder="Tell us more about your requirements..."
					hasError={!!errors.textarea}
					hint={errors.textarea}
				/>
			),
			slider: () => (
				<Slider
					label="Slider"
					value={sliderValue}
					onValueChange={(newValue) => {
						setSliderValue(newValue)
						setFormData((prev) => ({ ...prev, slider: newValue[0] }))

						// Clear slider error when user moves slider
						if (newValue.length > 0) {
							setErrors((prev) => ({ ...prev, slider: undefined }))
						}
					}}
					min={0}
					max={100}
				/>
			),
		}),
		[
			formData,
			errors,
			handleChange,
			handleColorChange,
			handleSelectChange,
			selectValues,
			handleOtpChange,
			handleCurrencyChange,
			uploadedFiles,
			handleFileChange,
			selectedDate,
			handleTextAreaChange,
		]
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
				<Dropdown>
					<DropdownTrigger asChild>
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent className="min-w-35">
						<DropdownGroup selectionMode="single" selectedValues={selectedValue} onSelectedChange={handleSelectionChange}>
							<DropdownItem value="username">Username</DropdownItem>
							<DropdownItem value="password">Password</DropdownItem>
							<DropdownItem value="colorPicker">Color Picker</DropdownItem>
							<DropdownItem value="select">Select</DropdownItem>
							<DropdownItem value="otp">OTP</DropdownItem>
							<DropdownItem value="currency">Currency</DropdownItem>
							<DropdownItem value="searchInput">Search Input</DropdownItem>
							<DropdownItem value="date">Date</DropdownItem>
							<DropdownItem value="file">File Upload</DropdownItem>
							<DropdownItem value="phoneno">Phone Number</DropdownItem>
							<DropdownItem value="textarea">Textarea</DropdownItem>
							<DropdownItem value="slider">Slider</DropdownItem>
						</DropdownGroup>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Toaster position="bottom-right" />
					<form onSubmit={handleSubmit} className="w-80 space-y-4">
						{fieldRenderers[displayField]?.()}
						<Button type="submit" className="w-full">
							Submit
						</Button>
					</form>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="hover-card.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default FormPreview
