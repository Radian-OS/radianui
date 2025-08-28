import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { InputOtp } from "@/registry/ui/input-otp"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Size = "28" | "32" | "36" | "40" | "44" | "56"

const DEFAULT_SIZE: Size = "40"
const DEFAULT_LENGTH: number = 6
const DEFAULT_LABEL: boolean = true
const DEFAULT_DISABLED: boolean = false
const DEFAULT_HAS_ERROR: boolean = false

export default function InputOtpPreview() {
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)
	const [length, setLength] = useState<number>(DEFAULT_LENGTH)
	const [label, setLabel] = useState<boolean>(DEFAULT_LABEL)
	const [disabled, setDisabled] = useState<boolean>(DEFAULT_DISABLED)
	const [hasError, setHasError] = useState<boolean>(DEFAULT_HAS_ERROR)

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
						{/* Dropdown for 'size' */}
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(size)} onValueChange={(value) => setSize(value as Size)}>
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
									<DropdownRadioItem value="56" onSelect={(e) => e.preventDefault()}>
										56
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Length</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(length)} onValueChange={(value) => setLength(Number(value))}>
									<DropdownRadioItem value="5" onSelect={(e) => e.preventDefault()}>
										5
									</DropdownRadioItem>
									<DropdownRadioItem value="6" onSelect={(e) => e.preventDefault()}>
										6
									</DropdownRadioItem>
									<DropdownRadioItem value="7" onSelect={(e) => e.preventDefault()}>
										7
									</DropdownRadioItem>
									<DropdownRadioItem value="8" onSelect={(e) => e.preventDefault()}>
										8
									</DropdownRadioItem>
									<DropdownRadioItem value="9" onSelect={(e) => e.preventDefault()}>
										9
									</DropdownRadioItem>
									<DropdownRadioItem value="10" onSelect={(e) => e.preventDefault()}>
										10
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(label)} onValueChange={(value) => setLabel(value === "true")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(disabled)} onValueChange={(value) => setDisabled(value === "true")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Has error</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(hasError)} onValueChange={(value) => setHasError(value === "true")}>
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
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<InputOtp
						{...(size !== DEFAULT_SIZE && { size: size })}
						{...(length !== DEFAULT_LENGTH && { length: length })}
						{...(label && { label: "Enter One-Time-Password" })}
						{...(disabled && { disabled: true })}
						{...(hasError && { hasError: true })}
						{...(hasError && { errorMsg: "This is an error message" })}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="input-otp.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<InputOtp ${size !== DEFAULT_SIZE ? `size="${size}"` : ""} ${length !== DEFAULT_LENGTH ? `length="${length}"` : ""} ${label ? `label="Enter One-Time-Password"` : ""} ${disabled ? `disabled=${disabled}` : ""} ${hasError ? `hasError=${hasError}` : ""} ${hasError ? `errorMsg="This is an error mmessage"` : ""}/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
