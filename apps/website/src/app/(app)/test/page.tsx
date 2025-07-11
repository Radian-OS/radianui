"use client"

import { useState } from "react"
import { CalendarDate, Time } from "@internationalized/date"
import { Value } from "react-phone-number-input"
import * as RPNInput from "react-phone-number-input"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import ColorPicker from "@/registry/ui/color-picker"
import { CurrencyInput } from "@/registry/ui/currency"
import DatePicker from "@/registry/ui/date-picker"
import FileUpload, { FileWithPreview } from "@/registry/ui/file-upload"
import { Input } from "@/registry/ui/input"
import { Password } from "@/registry/ui/password"
import { PhoneNumber } from "@/registry/ui/phone-number"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radiogroup"
import SearchInput from "@/registry/ui/search"
import { Select, SelectGroup, SelectItem } from "@/registry/ui/select"
import Slider from "@/registry/ui/slider"
import Switch from "@/registry/ui/switch"
import { TextArea } from "@/registry/ui/text-area"
import TimePicker from "@/registry/ui/time-picker"

export default function Test() {
	const [nameValue, setNameValue] = useState("")
	const [emailValue, setEmailValue] = useState("")
	const [passwordValue, setPasswordValue] = useState("")
	const [verificationCode, setVerificationCode] = useState("")
	const [phoneValue, setPhoneValue] = useState<Value>()
	const [selectedCountry, setSelectedCountry] = useState<RPNInput.Country>("US")
	const [selectedValues, setSelectedValues] = useState<string[]>([])
	const [searchValue, setSearchValue] = useState("")
	const [currencyValue, setCurrencyValue] = useState<string>("")
	const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([])
	const [textarea, setTextarea] = useState<string>("")
	const [checked, setChecked] = useState<boolean>(false)
	const [colorValues, setColorValues] = useState<{ hsv: number[]; rgb: number[] }>({ hsv: [], rgb: [] })
	const [sliderValue, setSliderValue] = useState([25])
	const [time, setTime] = useState<Time | null>(new Time(14, 30)) // 2:30 PM
	const [selectedDate, setSelectedDate] = useState<CalendarDate | undefined>(undefined)
	const [switchValue, setSwitchValue] = useState<boolean>(false)
	const [radioValue, setRadioValue] = useState<string>("1")

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		password: "",
		verificationCode: "",
		phone: "",
		product: "",
		searchValue: "",
		currencyValue: "",
	})

	const [submittedValues, setSubmittedValues] = useState<null | {
		name: string
		email: string
		password: string
		verificationCode: string
		country: RPNInput.Country
		phoneNumber?: Value
		selectedValues?: string[]
		searchValue?: string
		currencyValue?: string
		uploadedFiles?: FileWithPreview[]
		textarea?: string
		checked?: boolean
		colorValues?: { hsv: number[]; rgb: number[] }
		sliderValue?: number[]
		time?: Time | null
		selectedDate?: CalendarDate | undefined
		switchValue?: boolean
		radioValue?: string
	}>(null)

	const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (/^\d{0,6}$/.test(value)) {
			setVerificationCode(value)
		}
	}

	const handleSubmit = () => {
		const newErrors = {
			name: nameValue.trim() ? "" : "Name is required",
			email: emailValue.trim() ? "" : "Email is required",
			password: passwordValue.trim() ? "" : "Password is required",
			verificationCode: verificationCode.trim() ? "" : "Verification code is required",
			phone: phoneValue ? "" : "Phone number is required",
			product: selectedValues.length ? "" : "Please select a product",
			searchValue: searchValue.trim() ? "" : "Search input cannot be empty",
			currencyValue: currencyValue.trim() ? "" : "Currency value is required",
		}

		setErrors(newErrors)

		if (Object.values(newErrors).some((e) => e !== "")) return

		setSubmittedValues({
			name: nameValue,
			email: emailValue,
			password: passwordValue,
			verificationCode,
			country: selectedCountry,
			phoneNumber: phoneValue,
			selectedValues,
			searchValue,
			currencyValue,
			uploadedFiles,
			textarea,
			checked,
			colorValues,
			sliderValue,
			time,
			selectedDate,
			switchValue,
			radioValue,
		})
	}

	const getRadioDisplayText = (value: string) => {
		switch (value) {
			case "1":
				return "All new messages"
			case "2":
				return "Direct messages and mentions"
			case "3":
				return "Nothing"
			default:
				return value
		}
	}

	return (
		<div className="items-center justify-items-center py-4">
			<div className="flex gap-4">
				<div className="border-border rounded-radius-xl flex w-[708px] flex-col gap-8 border p-6">
					<div>
						<h1 className="text-text text-[20px] font-semibold">Multi Line Form</h1>
						<p className="text-text-tertiary text-[14px]">This is a sample subtitle for your form</p>
					</div>

					<div className="flex flex-col gap-8">
						{/* Personal Information Section */}
						<div className="space-y-5">
							<h3 className="text-text border-border border-b pb-2 text-lg font-medium">Personal Information</h3>
							<div className="grid grid-cols-2 gap-5">
								<Input label="Name" value={nameValue} onChange={(e) => setNameValue(e.target.value)} placeholder="Enter your name" hasError={!!errors.name} hint={errors.name} />
								<Input
									label="Email Address"
									value={emailValue}
									onChange={(e) => setEmailValue(e.target.value)}
									placeholder="test@gmail.com"
									type="email"
									hasError={!!errors.email}
									hint={errors.email}
								/>
							</div>
							<div className="grid grid-cols-2 gap-5">
								<Password
									label="Password"
									trail="show"
									value={passwordValue}
									onChange={(e) => setPasswordValue(e.target.value)}
									placeholder="Enter your password"
									hasError={!!errors.password}
									hint={errors.password}
								/>
								<Input
									label="Verification Code"
									value={verificationCode}
									onChange={handleVerificationCodeChange}
									placeholder="Enter 6-digit code here"
									maxLength={6}
									hasError={!!errors.verificationCode}
									hint={errors.verificationCode}
								/>
							</div>
							<PhoneNumber
								label="Phone Number"
								value={phoneValue}
								onChange={setPhoneValue}
								country={selectedCountry}
								onCountryChange={(c) => setSelectedCountry(c || "US")}
								international
								countryCallingCodeEditable
								showTrigger
								countryDropdown
								hasError={!!errors.phone}
								hint={errors.phone}
							/>
						</div>

						{/* Business Information Section */}
						<div className="space-y-5">
							<h3 className="text-text border-border border-b pb-2 text-lg font-medium">Business Information</h3>
							<div className="grid grid-cols-2 gap-5">
								<SearchInput
									label="Search Product"
									placeholder="Search for a product"
									value={searchValue}
									onChange={(e) => setSearchValue(e.target.value)}
									hasError={!!errors.searchValue}
									hint={errors.searchValue}
								/>
								<CurrencyInput
									label="Amount"
									value={currencyValue}
									onChange={(e) => setCurrencyValue(e.target.value)}
									currency="USD"
									locale="en-US"
									separator={true}
									placeholder="Enter amount"
									maxValue={1000000}
									minValue={0}
									hasError={!!errors.currencyValue}
									hint={errors.currencyValue}
								/>
							</div>
							<Select
								label="Product Category"
								placeholder="--Choose a product--"
								variants="input"
								rounded="lg"
								selectionMode="single"
								selectedValues={selectedValues}
								onSelectedChange={setSelectedValues}
								hasError={!!errors.product}
								hint={errors.product}>
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
						</div>

						{/* Preferences Section */}
						<div className="space-y-5">
							<h3 className="text-text border-border border-b pb-2 text-lg font-medium">Preferences & Settings</h3>
							<div className="space-y-4">
								<Switch isSelected={switchValue} onValueChange={setSwitchValue}>
									Enable notifications
								</Switch>
								<RadioGroup defaultValue="1" value={radioValue} onValueChange={setRadioValue} label="Notify me about...">
									<RadioGroupItem value="1">All new messages</RadioGroupItem>
									<RadioGroupItem value="2">Direct messages and mentions</RadioGroupItem>
									<RadioGroupItem value="3">Nothing</RadioGroupItem>
								</RadioGroup>
							</div>
						</div>

						{/* Customization Section */}
						<div className="space-y-5">
							<h3 className="text-text border-border border-b pb-2 text-lg font-medium">Customization</h3>
							<div className="grid grid-cols-2 gap-5">
								<ColorPicker
									rounded="lg"
									hasError={false}
									size="36"
									disabled={false}
									label="Theme Color"
									onColorChange={(hsv, rgb) => {
										setColorValues({ hsv, rgb })
									}}
								/>
								<TimePicker value={time} onValueChange={setTime} label="Meeting Time" />
							</div>
							<div className="grid grid-cols-2 gap-5">
								<div>
									<FileUpload label="Upload Documents" accept="*" value={uploadedFiles} onChange={(files) => setUploadedFiles(files)} />
								</div>
								<DatePicker
									mode="single"
									selected={selectedDate}
									onSelect={(value: CalendarDate | undefined) => {
										setSelectedDate(value)
										console.log("Selected date:", value)
									}}
									showTime={false}
									label="Start Date"
									placeholder="Pick a date"
								/>
							</div>
						</div>

						{/* Additional Information Section */}
						<div className="space-y-5">
							<h3 className="text-text border-border border-b pb-2 text-lg font-medium">Additional Information</h3>
							<TextArea label="Description" value={textarea} onChange={(e) => setTextarea(e.target.value)} placeholder="Tell us more about your requirements..." />
							<Slider
								label="Priority Level"
								value={sliderValue}
								onValueChange={(newValue) => {
									setSliderValue(newValue)
									console.log("Slider value:", newValue)
								}}
								min={0}
								max={100}
							/>
							<div className="flex items-center gap-3 pt-2">
								<Checkbox checked={checked} onChange={() => setChecked(!checked)} />
								<p className="text-text text-sm">I agree to the terms and conditions</p>
							</div>
						</div>
					</div>

					<Button onClick={handleSubmit}>Submit Form</Button>
				</div>

				{submittedValues && (
					<div className="border-border h-max w-full max-w-2xl rounded-lg border p-6">
						<h3 className="mb-4 text-xl font-semibold">Form Submission Summary</h3>

						<div className="grid gap-6">
							{/* Personal Information */}
							<div className="border-border rounded-lg border p-4">
								<h4 className="mb-3 flex items-center gap-2 font-semibold">
									<span className="bg-info h-2 w-2 rounded-full"></span>
									Personal Information
								</h4>
								<div className="grid grid-cols-2 gap-3 text-sm">
									<div>
										<span className="font-medium">Name:</span> {submittedValues.name || "Not provided"}
									</div>
									<div>
										<span className="font-medium">Email:</span> {submittedValues.email || "Not provided"}
									</div>
									<div>
										<span className="font-medium">Password:</span> {submittedValues.password}
									</div>
									<div>
										<span className="font-medium">Verification Code:</span> {submittedValues.verificationCode || "Not provided"}
									</div>
									<div className="col-span-2">
										<span className="font-medium">Phone:</span> {submittedValues.phoneNumber || "Not provided"} ({submittedValues.country})
									</div>
								</div>
							</div>

							{/* Business Information */}
							<div className="border-border rounded-lg border p-4">
								<h4 className="mb-3 flex items-center gap-2 font-semibold">
									<span className="bg-success h-2 w-2 rounded-full"></span>
									Business Information
								</h4>
								<div className="grid grid-cols-2 gap-3 text-sm">
									<div>
										<span className="font-medium">Search Query:</span> {submittedValues.searchValue || "Not provided"}
									</div>
									<div>
										<span className="font-medium">Amount:</span> {submittedValues.currencyValue || "Not provided"}
									</div>
									<div className="col-span-2">
										<span className="font-medium">Product Category:</span> {submittedValues.selectedValues?.join(", ") || "None selected"}
									</div>
								</div>
							</div>

							{/* Preferences & Settings */}
							<div className="border-border rounded-lg border p-4">
								<h4 className="mb-3 flex items-center gap-2 font-semibold">
									<span className="bg-primary h-2 w-2 rounded-full"></span>
									Preferences & Settings
								</h4>
								<div className="grid grid-cols-2 gap-3 text-sm">
									<div>
										<span className="font-medium">Notifications:</span>
										<span className={`ml-2 rounded px-2 py-1 text-xs ${submittedValues.switchValue ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
											{submittedValues.switchValue ? "Enabled" : "Disabled"}
										</span>
									</div>
									<div>
										<span className="font-medium">Notify About:</span> {getRadioDisplayText(submittedValues.radioValue || "1")}
									</div>
								</div>
							</div>

							{/* Customization */}
							<div className="border-border rounded-lg border p-4">
								<h4 className="mb-3 flex items-center gap-2 font-semibold">
									<span className="bg-warning h-2 w-2 rounded-full"></span>
									Customization
								</h4>
								<div className="grid grid-cols-2 gap-3 text-sm">
									<div>
										<span className="font-medium">Priority Level:</span> {submittedValues.sliderValue?.[0] || 0}%
									</div>
									<div>
										<span className="font-medium">Meeting Time:</span> {submittedValues.time?.toString() || "Not set"}
									</div>
									<div>
										<span className="font-medium">Start Date:</span> {submittedValues.selectedDate ? submittedValues.selectedDate.toString() : "Not set"}
									</div>
									{submittedValues.colorValues && (submittedValues.colorValues.hsv.length > 0 || submittedValues.colorValues.rgb.length > 0) && (
										<div>
											<span className="font-medium">Theme Color:</span>
											<div className="mt-1 text-xs text-gray-600">
												<div>HSV: {submittedValues.colorValues.hsv.join(", ")}</div>
												<div>RGB: {submittedValues.colorValues.rgb.join(", ")}</div>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Additional Information */}
							<div className="border-border rounded-lg border p-4">
								<h4 className="mb-3 flex items-center gap-2 font-semibold">
									<span className="bg-error h-2 w-2 rounded-full"></span>
									Additional Information
								</h4>
								<div className="space-y-3 text-sm">
									<div>
										<span className="font-medium">Description:</span>
										<p className="mt-1 rounded bg-gray-50 p-2 text-xs text-gray-600">{submittedValues.textarea || "No description provided"}</p>
									</div>
									<div>
										<span className="font-medium">Uploaded Files:</span>
										{submittedValues.uploadedFiles && submittedValues.uploadedFiles.length > 0 ? (
											<div className="mt-2 space-y-1">
												{submittedValues.uploadedFiles.map((file, idx) => (
													<div key={idx} className="flex items-center gap-2 rounded bg-blue-50 p-2 text-xs">
														<span className="h-2 w-2 rounded-full bg-blue-400"></span>
														<span className="font-medium">{file.file.name}</span>
														<span className="text-gray-500">({file.file.type})</span>
													</div>
												))}
											</div>
										) : (
											<span className="ml-2 text-xs text-gray-500">No files uploaded</span>
										)}
									</div>
									<div>
										<span className="font-medium">Terms & Conditions:</span>
										<span className={`ml-2 rounded px-2 py-1 text-xs ${submittedValues.checked ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
											{submittedValues.checked ? "Accepted" : "Not accepted"}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
