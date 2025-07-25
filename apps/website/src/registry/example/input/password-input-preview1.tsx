import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Password } from "@/registry/ui/password"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type LabelOptions = "true" | "false"
export type DisabledOptions = "true" | "false"
export type ErrorOptions = "true" | "false"
export type trailOptions = "show" | "hide" | "onFocus"

const PasswordInputPreview = () => {
	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<DisabledOptions>("false")
	const [label, setLabel] = useState<LabelOptions>("true")
	const [error, setError] = useState<ErrorOptions>("false")
	const [trail, settrail] = useState<trailOptions>("onFocus")
	const [hint, setHint] = useState<boolean>(false)

	const code = `<Password
	${label === "true" ? 'label="Password"' : ""}
	${disabled === "true" ? "disabled={true}" : ""}
	${size !== "36" ? `size="${size}"` : ""}
	trail='${trail}'
	${hint === true ? `hint="Hint text to help the user with input"` : ""}
	${error === "true" ? "hasError={true}" : ""}
  />`

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
							<DropdownSubTrigger>Has error</DropdownSubTrigger>
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
					<div className="flex flex-col items-center gap-4">
						<div className="flex flex-col items-center gap-5">
							<Password
								label={label === "true" ? "Password" : ""}
								disabled={disabled === "true"}
								size={size}
								hasError={error === "true"}
								hint={hint ? "Hint text to help the user with input" : ""}
								placeholder="Enter Password"
								className="w-80"
								trail={trail}
							/>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="password-input-preview1.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default PasswordInputPreview
