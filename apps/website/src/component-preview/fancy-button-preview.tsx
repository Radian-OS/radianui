import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FancyButtonPreview = () => {
	type sizes = "28" | "32" | "36" | "40" | "44" | "48"
	const [size, setSize] = useState<sizes>("40")
	const [disabled, setDisabled] = useState<"true" | "false">("false")
	const [variant, setVariant] = useState<"variant1" | "variant2">("variant1")

	const code =
		variant === "variant1"
			? `<Button
size='${size}'
disabled={${disabled === "true"}}
className="border-primary-hover border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16)] ring-[1.5px] ring-[#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]">
Fancy Button
</Button>`
			: `<Button
size='${size}'
disabled={${disabled === "true"}}
className="border-primary-hover border bg-gradient-to-b from-[#5133CF] to-[#6347EB] shadow-[0px_4px_4px_rgba(24,25,27,0.16)] ring-[1.5px] ring-[#5B3FE0] hover:from-[#5B3FE0] hover:to-[#6A52F2]">
Fancy Button 2
</Button>`

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
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={disabled} onValueChange={(value) => setDisabled(value as "true" | "false")}>
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
							<DropdownSubTrigger>size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as sizes)}>
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
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as "variant1" | "variant2")}>
									<DropdownRadioItem value="variant1" onSelect={(e) => e.preventDefault()}>
										Variant 1
									</DropdownRadioItem>
									<DropdownRadioItem value="variant2" onSelect={(e) => e.preventDefault()}>
										Variant 2
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] min-h-0 flex-col items-center justify-center overflow-auto rounded-xl border">
					{variant === "variant1" && (
						<Button
							size={size}
							disabled={disabled === "true"}
							className="border-primary-hover border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16)] ring-[1.5px] ring-[#5B3FE0] hover:from-[#6A52F2] hover:to-[#6A52F2]">
							Fancy Button 1
						</Button>
					)}
					{variant === "variant2" && (
						<Button
							size={size}
							disabled={disabled === "true"}
							className="border-primary-hover mt-2 border bg-gradient-to-b from-[#5133CF] to-[#6347EB] shadow-[0px_4px_4px_rgba(24,25,27,0.16)] ring-[1.5px] ring-[#5B3FE0] hover:from-[#5B3FE0] hover:to-[#5B3FE0]">
							Fancy Button 2
						</Button>
					)}
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="fancy-button.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default FancyButtonPreview
