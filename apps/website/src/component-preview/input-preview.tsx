import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Input } from "@/registry/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
const sizes = ["28", "32", "36", "40", "44", "48"]

const InputPreview = () => {
	const [size, setSize] = useState<SizeOptions>("36")
	const [placeholder, setPlaceholder] = useState<boolean>(true)
	const [disabled, setDisabled] = useState<boolean>(false)
	const [hasError, setHasError] = useState<boolean>(false)

	return (
		<Tabs defaultValue="preview">
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
					<DropdownContent>
						<DropdownSub>
							<DropdownSubTrigger>Placeholder</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(placeholder)} onValueChange={(value) => setPlaceholder(value === "true")}>
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Input className="w-80" aria-invalid={hasError} size={size} disabled={disabled} placeholder={placeholder ? "Enter your username here" : ""} />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="input.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import { Input } from "@/components/ui/input"

export default function InputExample() {
  return (    						
	<Input 
	    size="${size}"
		className="w-80"
	    disabled={${disabled}}
	    placeholder={${placeholder ? `"Enter your username here"` : `""`}}
	    aria-invalid={${hasError}}
		/>
  );
}

`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default InputPreview
