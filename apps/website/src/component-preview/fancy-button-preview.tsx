import { useState } from "react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FancyButtonPreview = () => {
	type sizes = "28" | "32" | "36" | "40" | "44" | "48"
	const [size, setSize] = useState<sizes>("40")
	const [disabled, setDisabled] = useState<"true" | "false">("false")
	const [variant, setVariant] = useState<"variant1" | "variant2">("variant1")

	const code =
		variant === "variant1"
			? `<Button
	size={${size}}
	disabled={${disabled === "true"}}
	className="
		border border-white/45
		bg-gradient-to-b from-[#5133CF] to-[#6347EB]
		shadow-[0px_4px_4px_rgba(24,25,27,0.16),0px_0px_0px_1.5px_#6347EB]
		hover:from-[#5B3FE0] hover:to-[#6A52F2]
	"
>
	Fancy Button
</Button>`
			: `<Button
	className="
		border border-white/45
		bg-gradient-to-b from-[#6347EB] to-[#5133CF]
		shadow-[0px_4px_4px_rgba(24,25,27,0.16),0px_0px_0px_1.5px_#5B3FE0]
		hover:from-[#6A52F2] hover:to-[#5B3FE0]
	"
>
	Fancy Button 2
</Button>`

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Disabled</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setDisabled(Array.from(keys)[0] as "true" | "false")
										}}
										minSelectionCount={1}
										selectedValues={[disabled]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setSize(Array.from(keys)[0] as sizes)
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
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setVariant(Array.from(keys)[0] as "variant1" | "variant2")
										}}
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
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
					{variant === "variant1" && (
						<Button
							size={size}
							disabled={disabled === "true"}
							className="border border-white/45 bg-gradient-to-b from-[#5133CF] to-[#6347EB] shadow-[0px_4px_4px_rgba(24,25,27,0.16),0px_0px_0px_1.5px_#6347EB] hover:from-[#5B3FE0] hover:to-[#6A52F2]">
							Fancy Button
						</Button>
					)}

					{variant === "variant2" && (
						<Button className="border border-white/45 bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16),0px_0px_0px_1.5px_#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]">
							Fancy Button 2
						</Button>
					)}
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default FancyButtonPreview
