"use client"

import { useMemo, useState } from "react"
import { CircleCheck, EyeIcon, Settings, SquareTerminal } from "lucide-react"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Password } from "@/registry/ui/password"
import ProgressBar from "@/registry/ui/progress-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

// Define the Zod schema for password validation
const passwordSchema = z
	.string()
	.min(8, { message: "At least 8 characters" })
	.regex(/\d/, { message: "At least one number" })
	.regex(/[a-z]/, { message: "At least one lowercase letter" })
	.regex(/[A-Z]/, { message: "At least one uppercase letter" })

const PasswordInputPreview = () => {
	type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
	type LabelOptions = "true" | "false"
	type DisabledOptions = "true" | "false"
	type ErrorOptions = "true" | "false"
	type trailOptions = "show" | "hide" | "onFocus"

	const [password, setPassword] = useState("")
	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<DisabledOptions>("false")
	const [label, setLabel] = useState<LabelOptions>("true")
	const [error, setError] = useState<ErrorOptions>("false")
	const [trail, settrail] = useState<trailOptions>("onFocus")
	const [hint, setHint] = useState<boolean>(false)

	// Validate the password using Zod
	const validation = useMemo(() => passwordSchema.safeParse(password), [password])
	const codeCname = '`size-4 ${ isValid(label) ? "text-success" : "" } `'

	// Extract error messages
	const errors = useMemo(() => {
		if (validation.success) return []
		return validation.error.errors.map((e) => e.message)
	}, [validation])

	// Calculate progress based on the number of passed validations
	const progress = useMemo(() => {
		const totalChecks = 4
		const passedChecks = totalChecks - errors.length
		return (passedChecks / totalChecks) * 100
	}, [errors])

	// Helper function to check if a specific validation passed
	const isValid = (message: string) => !errors.includes(message)

	// Code string for display in CodeArea
	const code = `"use client"

import { useState, useMemo } from "react"
import { Password } from "@/registry/ui/password"
import ProgressBar from "@/registry/ui/progress-bar"
import { CircleCheck } from "lucide-react"
import { z } from "zod"

// Define the Zod schema for password validation
const passwordSchema = z
.string()
.min(8, { message: "At least 8 characters" })
.regex(/\\d/, { message: "At least one number" })
.regex(/[a-z]/, { message: "At least one lowercase letter" })
.regex(/[A-Z]/, { message: "At least one uppercase letter" })

const PasswordInputPreview = () => {
const [password, setPassword] = useState("")

// Validate the password using Zod
const validation = useMemo(() => passwordSchema.safeParse(password), [password])

// Extract error messages
const errors = useMemo(() => {
if (validation.success) return []
return validation.error.errors.map((e) => e.message)
}, [validation])

// Calculate progress based on the number of passed validations
const progress = useMemo(() => {
const totalChecks = 4
const passedChecks = totalChecks - errors.length
return (passedChecks / totalChecks) * 100
}, [errors])

// Helper function to check if a specific validation passed
const isValid = (message) => !errors.includes(message)

return (
<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
<div className="flex flex-col gap-4 w-full">
<Password
${label === "true" ? 'label="Password"' : ""}
${disabled === "true" ? "disabled={true}" : ""}
${size !== "36" ? `size="${size}"` : ""}
trail='${trail}'
${hint === true ? `hint="Hint text to help the user with input"` : ""}
${error === "true" ? "hasError={true}" : ""}
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="Enter your password"
/>
{/* Make sure the progress bar has a specified height and visible styling */}
<ProgressBar
value={progress}
/>
<div className="w-full body-13 gap-2 flex flex-col">
{[
"At least 8 characters",
"At least one number",
"At least one lowercase letter",
"At least one uppercase letter",
].map((label) => (
<p key={label} className="flex items-center gap-2 text-text-tertiary">
<CircleCheck className={${codeCname}} />
{label}
</p>
))}
    </div>
  </div>
</div>
  )
}

export default PasswordInputPreview
`

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
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setSize(Array.from(keys)[0] as SizeOptions)
									}}
									minSelectionCount={1}
									selectedValues={[size]}>
									<DropdownItem value="28">28</DropdownItem>
									<DropdownItem value="32">32</DropdownItem>
									<DropdownItem value="36">36</DropdownItem>
									<DropdownItem value="40">40</DropdownItem>
									<DropdownItem value="44">44</DropdownItem>
									<DropdownItem value="48">48</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setDisabled(Array.from(keys)[0] as DisabledOptions)
									}}
									minSelectionCount={1}
									selectedValues={[disabled]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Hint</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[String(hint)]} onSelectedChange={(values) => setHint(values[0] === "true")} minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Error</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setError(Array.from(keys)[0] as ErrorOptions)
									}}
									minSelectionCount={1}
									selectedValues={[error]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setLabel(Array.from(keys)[0] as LabelOptions)
									}}
									minSelectionCount={1}
									selectedValues={[label]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Trail</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										settrail(Array.from(keys)[0] as trailOptions)
									}}
									minSelectionCount={1}
									selectedValues={[trail]}>
									<DropdownItem value="show">show</DropdownItem>
									<DropdownItem value="hide">hide</DropdownItem>
									<DropdownItem value="onFocus">onFocus</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex flex-col gap-4">
						<Password
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							className="w-80"
							label={label === "true" ? "Password" : ""}
							disabled={disabled === "true"}
							size={size}
							hasError={error === "true"}
							hint={hint ? "Hint text to help the user with input" : ""}
							trail={trail}
						/>
						{/* Make sure the progress bar has a specified height and visible styling */}
						<div className="body-13 flex w-full flex-col gap-2">
							<ProgressBar value={progress} />
							<p className="text-sm font-semibold">Your Password must contain</p>
							{["At least 8 characters", "At least one number", "At least one lowercase letter", "At least one uppercase letter"].map((label) => (
								<p key={label} className="text-text-tertiary flex items-center gap-2">
									<CircleCheck className={`size-4 ${isValid(label) ? "text-success" : ""}`} />
									{label}
								</p>
							))}
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="password-input-preview3.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default PasswordInputPreview
