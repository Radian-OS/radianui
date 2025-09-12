"use client"

import { useMemo, useState } from "react"
import { CircleCheck, EyeIcon, Settings, SquareTerminal } from "lucide-react"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Password } from "@/registry/ui/password"
import { ProgressBar } from "@/registry/ui/progress-bar"
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
	type DisabledOptions = "true" | "false"

	const [password, setPassword] = useState("")
	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<DisabledOptions>("false")

	// Validate the password using Zod
	const validation = useMemo(() => passwordSchema.safeParse(password), [password])
	const codeCname = '`size-4 ${ isValid(label) ? "text-success" : "" } `'

	// Extract error messages
	const errors = useMemo(() => {
		if (validation.success) return []
		return validation.error.issues.map((e) => e.message)
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
disabled={${disabled === "true"}}
size=${size}
placeholder="Enter your password"
value={password}
onChange={(e) => setPassword(e.target.value)}
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
<p key={label} className="flex items-center gap-2 text-fg-tertiary">
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
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as SizeOptions)}>
									<DropdownRadioItem value="28" onSelect={(e) => e.preventDefault()}>
										28
									</DropdownRadioItem>
									<DropdownRadioItem value="32" onSelect={(e) => e.preventDefault()}>
										32
									</DropdownRadioItem>
									<DropdownRadioItem value="36" onSelect={(e) => e.preventDefault()}>
										36
									</DropdownRadioItem>
									<DropdownRadioItem value="40" onSelect={(e) => e.preventDefault()}>
										40
									</DropdownRadioItem>
									<DropdownRadioItem value="44" onSelect={(e) => e.preventDefault()}>
										44
									</DropdownRadioItem>
									<DropdownRadioItem value="48" onSelect={(e) => e.preventDefault()}>
										48
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={disabled} onValueChange={(value) => setDisabled(value as DisabledOptions)}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
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
							disabled={disabled === "true"}
							toggleVisibility="focus"
							size={size}
						/>
						{/* Make sure the progress bar has a specified height and visible styling */}
						<div className="body-13 flex w-full flex-col gap-2">
							<ProgressBar value={progress} />
							<p className="text-sm font-semibold">Your Password must contain</p>
							{["At least 8 characters", "At least one number", "At least one lowercase letter", "At least one uppercase letter"].map((label) => (
								<p key={label} className="text-fg-tertiary flex items-center gap-2">
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
