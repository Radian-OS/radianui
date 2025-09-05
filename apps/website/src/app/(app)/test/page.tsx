"use client"

import { useState } from "react"
import { CalendarDate, Time } from "@internationalized/date"
import { Value } from "react-phone-number-input"
import * as RPNInput from "react-phone-number-input"
import { Avatar } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import ColorPicker from "@/registry/ui/color-picker"
import { CurrencyInput } from "@/registry/ui/currency-amount"
import FileUpload, { FileWithPreview } from "@/registry/ui/file-upload"
import { Input } from "@/registry/ui/input"
import { Password } from "@/registry/ui/password"
import { PhoneNumber } from "@/registry/ui/phone-number"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radiogroup"
import SearchInput from "@/registry/ui/search"
import { Select, SelectGroup, SelectItem } from "@/registry/ui/select"
import {
	Select as Select2,
	SelectContent as SelectContent2,
	SelectDivider,
	SelectGroup as SelectGroup2,
	SelectItem as SelectItem2,
	SelectLabel,
	SelectTrigger as SelectTrigger2,
	SelectValue as SelectValue2,
} from "@/registry/ui/select2"
import Slider from "@/registry/ui/slider"
import { Switch } from "@/registry/ui/switch"
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
					<Select2 defaultValue="3" indicatorPosition="right">
						<SelectTrigger2 className="w-[200px]">
							<SelectValue2 placeholder="Select framework" />
						</SelectTrigger2>
						<SelectContent2>
							<SelectItem2 value="1">
								<span className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-violet-500"></span>
									<span>In Progress</span>
								</span>
							</SelectItem2>
							<SelectItem2 value="2">
								<span className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-green-500"></span>
									<span>Completed</span>
								</span>
							</SelectItem2>
							<SelectItem2 value="3">
								<span className="flex items-center gap-2">
									<span className="bg-primary size-1.5 rounded-full"></span>
									<span>Pending</span>
								</span>
							</SelectItem2>
							<SelectItem2 value="4">
								<span className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-yellow-500"></span>
									<span>Cancelled</span>
								</span>
							</SelectItem2>
							<SelectItem2 value="5">
								<span className="flex items-center gap-2">
									<span className="bg-destructive size-1.5 rounded-full"></span>
									<span>Rejected</span>
								</span>
							</SelectItem2>
						</SelectContent2>
					</Select2>
					<Select2 defaultValue="1" indicatorPosition="right">
						<SelectTrigger2 className="w-[200px]">
							<span className="inline-flex items-center space-x-2">
								Status: <SelectValue2 />
							</span>
						</SelectTrigger2>
						<SelectContent2>
							<SelectItem2 value="1">
								<Badge color="info">In Progress</Badge>
							</SelectItem2>
							<SelectItem2 value="2">
								<Badge color="success">Completed</Badge>
							</SelectItem2>
							<SelectItem2 value="3">
								<Badge color="neutral">Pending</Badge>
							</SelectItem2>
							<SelectItem2 value="4">
								<Badge color="warning">Cancelled</Badge>
							</SelectItem2>
							<SelectItem2 value="5">
								<Badge color="error">Rejected</Badge>
							</SelectItem2>
						</SelectContent2>
					</Select2>
					<Select2 indicatorPosition="right">
						<SelectTrigger2 className="w-[240px]">
							<SelectValue2 placeholder="Select a framework" />
						</SelectTrigger2>
						<SelectContent2 className="max-h-96">
							<SelectGroup2>
								<SelectLabel>Backend Frameworks</SelectLabel>
								<SelectItem2 value="node-js">Node.js (Express)</SelectItem2>
								<SelectItem2 value="django">Django (Python)</SelectItem2>
								<SelectItem2 value="rails">Rails (Ruby)</SelectItem2>
								<SelectItem2 disabled value="laravel">
									Laravel (PHP)
								</SelectItem2>
								<SelectItem2 value="spring">Spring Boot (Java)</SelectItem2>
							</SelectGroup2>
							<SelectDivider />
							<SelectGroup2>
								<SelectLabel>Mobile Frameworks</SelectLabel>
								<SelectItem2 value="react-native">React Native</SelectItem2>
								<SelectItem2 value="flutter">Flutter</SelectItem2>
								<SelectItem2 value="swiftui">SwiftUI</SelectItem2>
								<SelectItem2 value="kotlin-compose">Kotlin Compose</SelectItem2>
								<SelectItem2 value="xamarin">Xamarin</SelectItem2>
							</SelectGroup2>
						</SelectContent2>
					</Select2>
					<Select2 indicatorPosition="right">
						<SelectTrigger2 className="w-[200px]">
							<SelectValue2 placeholder="Select a user" />
						</SelectTrigger2>
						<SelectContent2>
							<SelectGroup2>
								<SelectLabel className="text-muted-foreground py-1 ps-2 text-xs font-normal">Select a user</SelectLabel>
								<SelectItem2 value="1">
									<span className="flex items-center gap-2">
										<Avatar size="24" src="https://randomuser.me/api/portraits/men/1.jpg" />
										<span>Alan Bold</span>
									</span>
								</SelectItem2>
								<SelectItem2 value="2">
									<span className="flex items-center gap-2">
										<Avatar size="24" src="https://randomuser.me/api/portraits/men/2.jpg" />
										<span>Ethan James</span>
									</span>
								</SelectItem2>
								<SelectItem2 value="3">
									<span className="flex items-center gap-2">
										<Avatar size="24" src="https://randomuser.me/api/portraits/men/3.jpg" />
										<span>Nina Clark</span>
									</span>
								</SelectItem2>
								<SelectItem2 value="4">
									<span className="flex items-center gap-2">
										<Avatar size="24" src="https://randomuser.me/api/portraits/men/4.jpg" />
										<span>Sean Otto</span>
									</span>
								</SelectItem2>
							</SelectGroup2>
						</SelectContent2>
					</Select2>

					<div>
						<h1 className="text-fgtext-[20px] font-semibold">Multi Line Form</h1>
						<p className="text-fg-tertiary text-[14px]">This is a sample subtitle for your form</p>
					</div>
					<div className="flex flex-col gap-8">
						{/* Personal Information Section */}
						<div className="space-y-5">
							<h3 className="text-fgborder-border border-b pb-2 text-lg font-medium">Personal Information</h3>
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
									end="show"
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
							<h3 className="text-fgborder-border border-b pb-2 text-lg font-medium">Business Information</h3>
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
							<h3 className="text-fgborder-border border-b pb-2 text-lg font-medium">Preferences & Settings</h3>
							<div className="space-y-4">
								<Switch checked={switchValue} onCheckedChange={setSwitchValue}>
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
							<h3 className="text-fgborder-border border-b pb-2 text-lg font-medium">Customization</h3>
							<div className="grid grid-cols-2 gap-5">
								<ColorPicker
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
								{/* <DatePicker
									mode="single"
									selected={selectedDate}
									onSelect={(value: CalendarDate | undefined) => {
										setSelectedDate(value)
										console.log("Selected date:", value)
									}}
									label="Start Date"
									placeholder="Pick a date"
								/> */}
							</div>
						</div>
						{/* Additional Information Section */}
						<div className="space-y-5">
							<h3 className="text-fgborder-border border-b pb-2 text-lg font-medium">Additional Information</h3>
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
								<p className="text-fgtext-sm">I agree to the terms and conditions</p>
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
//  import React from "react"
//  import ShikiHighlighter from "react-shiki"
//  import { cn } from "@/lib/utils"
//  import { Button } from "@/registry/ui/button"

// type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

// interface PackageManagerIconProps {
// 	manager: PackageManager
// }

// interface PnpmIconProps {}
// interface NpmIconProps {}
// interface YarnIconProps {}
// interface BunIconProps {}

// const code = `import { useMemo, useState } from "react"
// import { Check, CopyIcon } from "lucide-react"
// import { useTheme } from "next-themes"
// import Image from "next/image"
// import { useCopyPaste } from "@/hooks/use-copy-paste"
// import { cn } from "@/lib/utils"
// import { Button } from "@/registry/ui/button"
// import { CodeArea } from "@/registry/ui/code-area"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

// export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"
// export type InstallMode = "install" | "execute"

// export interface InstallationTabsProps {
// 	code: string
// 	mode?: InstallMode
// 	pkg?: PackageManager[]
// 	className?: string
// 	icon?: boolean
// }

// const getCommand = (manager: PackageManager, code: string, mode: InstallMode): string => {
// 	if (mode === "install") {
// 		switch (manager) {
// 			case "pnpm":
// 				return \`pnpm add \${code}\`
// 			case "npm":
// 				return \`npm install \${code}\`
// 			case "yarn":
// 				return \`yarn add \${code}\`
// 			case "bun":
// 				return \`bun add \${code}\`
// 		}
// 	} else if (mode === "execute") {
// 		switch (manager) {
// 			case "pnpm":
// 				return \`pnpm dlx \${code}\`
// 			case "npm":
// 				return \`npx \${code}\`
// 			case "yarn":
// 				return \`yarn dlx \${code}\`
// 			case "bun":
// 				return \`bunx \${code}\`
// 		}
// 	}
// 	return \`\${manager} \${code}\`
// }

// // Icon component mapping - you can replace these with your actual icon components
// const PackageManagerIcon = ({ manager }: PackageManagerIconProps): JSX.Element | null => {
// 	// Replace these with your actual icon components
// 	switch (manager) {
// 		case "pnpm":
// 			return <PnpmIcon />
// 		case "npm":
// 			return <NpmIcon />
// 		case "yarn":
// 			return <YarnIcon />
// 		case "bun":
// 			return <BunIcon />
// 		default:
// 			return null
// 	}
// }

// // Placeholder components - replace these with your actual icon components
// const PnpmIcon = ({}: PnpmIconProps): JSX.Element => <Image className="h-5 w-5" src="/icons/pnpm.webp" width={500} alt="pnpm-icon" height={500} />
// const NpmIcon = ({}: NpmIconProps): JSX.Element => <Image className="h-5 w-5" src="/icons/npm.webp" width={500} alt="npm" height={500} />
// const YarnIcon = ({}: YarnIconProps): JSX.Element => <Image className="h-5 w-5" src="/icons/yarn.png" width={500} alt="yarn" height={500} />
// const BunIcon = ({}: BunIconProps): JSX.Element => <Image className="h-5 w-5" src="/icons/bun.svg" width={500} alt="bun" height={500} />

// export default function CommandLineTabs({
// 	code,
// 	mode = "install",
// 	pkg = ["pnpm", "npm", "yarn", "bun"],
// 	className,
// 	icon = false,
// }: InstallationTabsProps): JSX.Element {
// 	const { theme } = useTheme()
// 	const [activeTab, setActiveTab] = useState<PackageManager>(pkg[0])

// 	// Memoize commands for each manager
// 	const commands: Record<PackageManager, string> = useMemo(
// 		() =>
// 			pkg.reduce(
// 				(acc, manager) => ({
// 					...acc,
// 					[manager]: getCommand(manager as PackageManager, code, mode),
// 				}),
// 				{} as Record<PackageManager, string>
// 			),
// 		[pkg, code, mode]
// 	)

// 	const { copied, copy }: { copied: boolean; copy: () => void } = useCopyPaste({
// 		code: commands[activeTab],
// 		eventName: "block_cli_copy",
// 		title: "Package Manager Command",
// 		category: "CLI",
// 	})

// 	return (
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		<Tabs
// 			value={activeTab}
// 			// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 			onValueChange={setActiveTab as any}
// 			variant="outline-ghost"
// 			size="md"
// 			className={cn("bg-fill2 gap-2 overflow-hidden rounded-xl p-1.5", className)}>
// 			<div className="flex justify-between pr-1">
// 				<TabsList className="bg-transparent">
// 					{pkg.map((manager) => (
// 						<TabsTrigger key={manager} value={manager} className={icon ? "gap-1" : ""}>
// 							{icon && <PackageManagerIcon manager={manager} />}
// 							{manager}
// 						</TabsTrigger>
// 					))}
// 				</TabsList>
// 				<Button variant="ghost" color="neutral" size={"28"} iconOnly aria-label="Copy command" onClick={copy}>
// 					{copied ? <Check /> : <CopyIcon />}
// 				</Button>
// 			</div>
// 			{pkg.map((manager) => (
// 				<TabsContent key={manager} value={manager}>
// 					<CodeArea
// 						language="bash"
// 						theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
// 						code={commands[manager as PackageManager]}
// 						copiable={false}
// 						showLineNumbers={false}
// 						className={cn("border-soft rounded-[10px] border px-4 py-3", className)}
// 					/>
// 				</TabsContent>
// 			))}
// 		</Tabs>
// 	)
// }
// `

// type BundledLanguage =
// 	| "angular-html"
// 	| "angular-ts"
// 	| "astro"
// 	| "bash"
// 	| "blade"
// 	| "c"
// 	| "c++"
// 	| "coffee"
// 	| "coffeescript"
// 	| "cpp"
// 	| "css"
// 	| "glsl"
// 	| "gql"
// 	| "graphql"
// 	| "haml"
// 	| "handlebars"
// 	| "hbs"
// 	| "html"
// 	| "html-derivative"
// 	| "http"
// 	| "imba"
// 	| "jade"
// 	| "java"
// 	| "javascript"
// 	| "jinja"
// 	| "jison"
// 	| "jl"
// 	| "js"
// 	| "json"
// 	| "json5"
// 	| "jsonc"
// 	| "jsonl"
// 	| "jsx"
// 	| "julia"
// 	| "less"
// 	| "lit"
// 	| "markdown"
// 	| "marko"
// 	| "md"
// 	| "mdc"
// 	| "mdx"
// 	| "php"
// 	| "postcss"
// 	| "pug"
// 	| "py"
// 	| "python"
// 	| "r"
// 	| "regex"
// 	| "regexp"
// 	| "sass"
// 	| "scss"
// 	| "sh"
// 	| "shell"
// 	| "shellscript"
// 	| "sql"
// 	| "styl"
// 	| "stylus"
// 	| "svelte"
// 	| "ts"
// 	| "ts-tags"
// 	| "tsx"
// 	| "typescript"
// 	| "vue"
// 	| "vue-html"
// 	| "wasm"
// 	| "wgsl"
// 	| "wit"
// 	| "xml"
// 	| "yaml"
// 	| "yml"
// 	| "zsh"

// type Theme =
// 	| "andromeeda"
// 	| "aurora-x"
// 	| "ayu-dark"
// 	| "catppuccin-frappe"
// 	| "catppuccin-latte"
// 	| "catppuccin-macchiato"
// 	| "catppuccin-mocha"
// 	| "dark-plus"
// 	| "dracula"
// 	| "dracula-soft"
// 	| "everforest-dark"
// 	| "everforest-light"
// 	| "github-dark"
// 	| "github-dark-default"
// 	| "github-dark-dimmed"
// 	| "github-dark-high-contrast"
// 	| "github-light"
// 	| "github-light-default"
// 	| "github-light-high-contrast"
// 	| "gruvbox-dark-hard"
// 	| "gruvbox-dark-medium"
// 	| "gruvbox-dark-soft"
// 	| "gruvbox-light-hard"
// 	| "gruvbox-light-medium"
// 	| "gruvbox-light-soft"
// 	| "houston"
// 	| "kanagawa-dragon"
// 	| "kanagawa-lotus"
// 	| "kanagawa-wave"
// 	| "laserwave"
// 	| "light-plus"
// 	| "material-theme"
// 	| "material-theme-darker"
// 	| "material-theme-lighter"
// 	| "material-theme-ocean"
// 	| "material-theme-palenight"
// 	| "min-dark"
// 	| "min-light"
// 	| "monokai"
// 	| "night-owl"
// 	| "nord"
// 	| "one-dark-pro"
// 	| "one-light"
// 	| "plastic"
// 	| "poimandres"
// 	| "red"
// 	| "rose-pine"
// 	| "rose-pine-dawn"
// 	| "rose-pine-moon"
// 	| "slack-dark"
// 	| "slack-ochin"
// 	| "snazzy-light"
// 	| "solarized-dark"
// 	| "solarized-light"
// 	| "synthwave-84"
// 	| "tokyo-night"
// 	| "vesper"
// 	| "vitesse-black"
// 	| "vitesse-dark"
// 	| "vitesse-light"
// const page = () => {
// 	return (
// 		// <div className="!max-h-100 !max-w-100 [&_pre]:h-50 no-scrollbar relative rounded-xl border [&_pre]:overflow-hidden">
// 		// 	<div className="absolute right-2 top-2 z-[999] text-white">PPP</div>
// 		// 	<ShikiHighlighter as={`pre`} className="[&_pre]:no-scrollbar [&_pre]:h-full [&_pre]:w-full" language="jsx" theme="synthwave-84" showLineNumbers={true} showLanguage={false}>
// 		// 		{code.trim()}
// 		// 	</ShikiHighlighter>
// 		// </div>

// 		<div className={cn("no-scrollbar h-200 w-200 box-border overflow-auto rounded-xl text-sm")}>
// 			<div className="relative">
// 				<ShikiHighlighter as={`pre`} className="[&_pre]:no-scrollbar [&_pre]:h-full [&_pre]:w-full" language="jsx" theme="synthwave-84" showLineNumbers={true} showLanguage={false}>
// 					{code.trim()}
// 				</ShikiHighlighter>

// 				<Button
// 					// onClick={handleCopy}
// 					className="text-white! absolute right-3 top-3 z-50 rounded-md bg-transparent p-1.5 hover:bg-[#ffffff1a]"
// 					aria-label="copy button"
// 					size="32"
// 					color="neutral"
// 					variant="soft">
// 					PPP
// 				</Button>
// 			</div>
// 		</div>
// 	)
// }

// export default page
