import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import { Button } from "@/registry/ui/button"
// import { CodeArea } from "@/registry/ui/code"
import { CodeArea } from "@/registry/ui/code-area"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						{/* Dropdown for 'size' */}
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setSize(Array.from(keys)[0] as Size)} minSelectionCount={1} selectedValues={[String(size)]}>
									<DropdownItem value="28">28</DropdownItem>
									<DropdownItem value="32">32</DropdownItem>
									<DropdownItem value="36">36</DropdownItem>
									<DropdownItem value="40">40</DropdownItem>
									<DropdownItem value="44">44</DropdownItem>
									<DropdownItem value="56">56</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Length</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setLength(Number(keys[0]))} minSelectionCount={1} selectedValues={[String(length)]}>
									<DropdownItem value="5">5</DropdownItem>
									<DropdownItem value="6">6</DropdownItem>
									<DropdownItem value="7">7</DropdownItem>
									<DropdownItem value="8">8</DropdownItem>
									<DropdownItem value="9">9</DropdownItem>
									<DropdownItem value="10">10</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setLabel(keys[0] === "true")} minSelectionCount={1} selectedValues={[String(label)]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setDisabled(keys[0] === "true")} minSelectionCount={1} selectedValues={[String(disabled)]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Has error</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setHasError(keys[0] === "true")} minSelectionCount={1} selectedValues={[String(hasError)]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
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
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<InputOtp ${size !== DEFAULT_SIZE ? `size="${size}"` : ""} ${length !== DEFAULT_LENGTH ? `length="${length}"` : ""} ${label ? `label="Enter One-Time-Password"` : ""} ${disabled ? `disabled=${disabled}` : ""} ${hasError ? `hasError=${hasError}` : ""} ${hasError ? `errorMsg="This is an error mmessage"` : ""}/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
