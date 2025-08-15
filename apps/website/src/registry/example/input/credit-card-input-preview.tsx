import { useState } from "react"

import { CreditCard, EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type domainOption = ".com" | ".org" | ".net"
export type typeOptions = "trail" | "lead" | "default"
const sizes = ["28", "32", "36", "40", "44", "48"]
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]

const CreditCardPreview = () => {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")

	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<boolean>(false)

	const [label, setLabel] = useState<boolean>(true)
	const [hint, setHint] = useState<boolean>(false)
	const [hasError, setHasError] = useState<boolean>(false)

	const sizeHeightMapping: Record<number, string> = {
		28: "h-4 w-4",
		32: "h-5 w-5",
		36: "h-5 w-5",
		40: "h-5 w-5",
		44: "h-6 w-6",
		48: "h-6 w-6",
	}

	const iconClass = sizeHeightMapping[size] ?? ""

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
					<DropdownContent>
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[size]} onSelectedChange={(values) => setSize(values[0] as SizeOptions)} minSelectionCount={1}>
									{sizes.map((size) => (
										<DropdownItem value={size} key={size}>
											{size}
										</DropdownItem>
									))}
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Rounded</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[rounded]} onSelectedChange={(values) => setRounded(values[0] as RoundedOptions)} minSelectionCount={1}>
									{roundedOptions.map((roundedOption) => (
										<DropdownItem value={roundedOption} key={roundedOption}>
											{roundedOption}
										</DropdownItem>
									))}
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Disabled</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(disabled)]} onSelectedChange={(values) => setDisabled(values[0] === "true")} minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[String(label)]} onSelectedChange={(values) => setLabel(values[0] === "true")} minSelectionCount={1}>
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
								<DropdownGroup selectionMode="single" selectedValues={[String(hasError)]} onSelectedChange={(values) => setHasError(values[0] === "true")} minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex flex-col gap-1.5">
						{label && <Label>Credit Card</Label>}
						<div className="w-80">
							<Input
								rounded={rounded}
								disabled={disabled}
								size={size}
								placeholder="Card Number"
								start={<CreditCard className={iconClass} />}
								hasError={hasError}
								className={`-ms rounded-b-none border-b-0 focus-within:z-30 ${hasError ? "" : "focus-within:border-b"}`}
							/>
							<div className="flex">
								<Input
									rounded={rounded}
									disabled={disabled}
									size={size}
									hasError={hasError}
									placeholder="MM / YY"
									className={`rounded-r-none rounded-t-none border-r-0 focus-within:z-30 ${hasError ? "" : "focus-within:border-r"}`}
								/>
								<Input rounded={rounded} disabled={disabled} size={size} hasError={hasError} placeholder="CVC" className="rounded-l-none rounded-t-none" />
							</div>
						</div>
						{(hint || hasError) && (
							<Label className={`${hasError ? "text-error" : "text-fg-tertiary"} flex items-start text-xs font-normal`}>Hint text to help the user with input</Label>
						)}
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="credit-card-input-preview.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="flex flex-col gap-1.5">
	${label ? "<Label>Credit Card</Label>" : ""}
	<div className="w-80">
		<Input
			size={${size}}
			placeholder="Card Number"
			trail={<CreditCard className="${iconClass}" />}
			className="-ms rounded-b-none border-b-0 focus-within:z-30 focus-within:border-b"
		/>
		<div className="flex">
			<Input size={${size}} placeholder="MM / YY" className="rounded-r-none rounded-t-none border-r-0 focus-within:z-30 focus-within:border-r" />
			<Input size={${size}} placeholder="CVC" className="rounded-l-none rounded-t-none" />
		</div>
	</div>
	${hint ? `<Label className="flex items-start text-xs font-normal text-fg-tertiary">Hint text to help the user with input</Label>` : ""}
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default CreditCardPreview
