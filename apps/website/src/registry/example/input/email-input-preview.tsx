import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Input } from "@/registry/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type iconOptions = "Mail" | "Arrow" | "Default"
const sizes = ["28", "32", "36", "40", "44", "48"]

const EmailPreview = () => {
	const [trailIcon, setTrailIcon] = useState<iconOptions>("Default")
	const [hasError, setHasError] = useState<boolean>(false)
	const [size, setSize] = useState<SizeOptions>("36")

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
		<Tabs className="mt-3" defaultValue="preview" variant={"outline-ghost"} size={"md"}>
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
									{sizes.map((size) => (
										<DropdownRadioItem value={size} key={size} onSelect={(e) => e.preventDefault()}>
											{size}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Example</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={trailIcon} onValueChange={(value) => setTrailIcon(value as iconOptions)}>
									<DropdownRadioItem value="Default" onSelect={(e) => e.preventDefault()}>
										Default
									</DropdownRadioItem>
									<DropdownRadioItem value="Mail" onSelect={(e) => e.preventDefault()}>
										Mail
									</DropdownRadioItem>
									<DropdownRadioItem value="Arrow" onSelect={(e) => e.preventDefault()}>
										Arrow
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>HasError</DropdownSubTrigger>
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Input size={size} type="email" className="w-80" placeholder="designer@radianos.com" />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="email-input-preview.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Input 
    type="email"
    label="Email"
    placeholder="Enter your email here"
	start=${trailIcon === "Mail" ? `{<Mail  className="${iconClass}" />"}` : `{<ArrowRight  className="${iconClass}" />}`}
    hasError={${hasError}}
	hint="${hasError ? "Hint text to help the user with input" : ""}"
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default EmailPreview
