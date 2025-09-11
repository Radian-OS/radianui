import { useState } from "react"
import { ArrowRight, EyeIcon, Mail, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type iconOptions = "Mail" | "Arrow" | "Default"
const sizes = ["28", "32", "36", "40", "44", "48"]

const EmailPreview = () => {
	const [startIcon, setStartIcon] = useState<iconOptions>("Default")
	const [hasError, setHasError] = useState<boolean>(false)
	const [size, setSize] = useState<SizeOptions>("36")

	return (
		<Tabs className="mt-3" defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
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
								<DropdownRadioGroup value={startIcon} onValueChange={(value) => setStartIcon(value as iconOptions)}>
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
					<InputWrapper size={size} className="w-80" aria-invalid={hasError}>
						{startIcon === "Arrow" ? <ArrowRight /> : startIcon === "Mail" ? <Mail /> : ""}
						<Input type="email" placeholder="designer@radianos.com" />
					</InputWrapper>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="email-input-preview.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import { Input } from "@/components/ui/input"

export default function EmailInputExample() {
  return (    						
	<InputWrapper size={${size}} className="w-80" aria-invalid={${hasError}}>
		${startIcon === "Arrow" ? "<ArrowRight />" : startIcon === "Mail" ? " <Mail /> " : ""}
		<Input type="email" placeholder="designer@radianos.com" />
	</InputWrapper>
  );
}
						
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default EmailPreview
