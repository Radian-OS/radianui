import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { cn } from "@/lib/utils"
import { Button, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FancyButtonPreview = () => {
	type Sizes = "28" | "32" | "36" | "40" | "44" | "48"
	const [size, setSize] = useState<Sizes>("40")
	const [disabled, setDisabled] = useState<"true" | "false">("false")
	const [variant, setVariant] = useState<"variant1" | "variant2">("variant1")

	const generateCode = (variant: "variant1" | "variant2") => {
		const baseClasses =
			variant === "variant1"
				? "bg-gradient-to-b from-[#6347EB] to-[#5133CF] hover:from-[#6A52F2] hover:to-[#5B3FE0]"
				: "bg-gradient-to-b from-[#5133CF] to-[#6347EB] hover:from-[#5B3FE0] hover:to-[#6A52F2]"

		return `<Button
  size='${size}'
  disabled={${disabled === "true"}}
  className="${baseClasses} shadow-lg shadow-[#5B3FE0]/50 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300"
>
  Fancy Button ${variant === "variant2" ? 2 : ""}
</Button>`
	}

	return (
		<Tabs defaultValue="preview" variant="outline-ghost" size="md">
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
						{/* Disabled */}
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => setDisabled(Array.from(keys)[0] as "true" | "false")}
									minSelectionCount={1}
									selectedValues={[disabled]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						{/* Size */}
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setSize(Array.from(keys)[0] as Sizes)} minSelectionCount={1} selectedValues={[size]}>
									{["28", "32", "36", "40", "44", "48"].map((s) => (
										<DropdownItem key={s} value={s}>
											{s}
										</DropdownItem>
									))}
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						{/* Variant */}
						<DropdownSub>
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as "variant1" | "variant2")}
									minSelectionCount={1}
									selectedValues={[variant]}>
									<DropdownItem value="variant1">Variant 1</DropdownItem>
									<DropdownItem value="variant2">Variant 2</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			{/* Preview */}
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border p-4">
					{variant === "variant1" && (
						<Button
							size={size}
							disabled={disabled === "true"}
							className={cn(
								"backface-hidden relative inline-flex transform-gpu items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-300",
								"bg-gradient-to-b from-[#6347EB] to-[#5133CF] hover:from-[#6A52F2] hover:to-[#5B3FE0]",
								"shadow-lg shadow-[#5B3FE0]/50",
								disabled === "true" && "pointer-events-none opacity-50"
							)}>
							Fancy Button
						</Button>
					)}

					{variant === "variant2" && (
						<Button
							size={size}
							disabled={disabled === "true"}
							className={cn(
								"backface-hidden relative inline-flex transform-gpu items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-300",
								"bg-gradient-to-b from-[#5133CF] to-[#6347EB] hover:from-[#5B3FE0] hover:to-[#6A52F2]",
								"shadow-lg shadow-[#5B3FE0]/50",
								disabled === "true" && "pointer-events-none opacity-50"
							)}>
							Fancy Button 2
						</Button>
					)}
				</div>
			</TabsContent>

			{/* Code */}
			<TabsContent value="code">
				<CodeSnippet title="fancy-button.tsx" showLineNumber className="h-[420px]" code={generateCode(variant)} />
			</TabsContent>
		</Tabs>
	)
}

export default FancyButtonPreview
