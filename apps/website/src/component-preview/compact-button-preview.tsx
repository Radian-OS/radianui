import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const CompactButtonPreview = () => {
	type sizes = "28" | "32" | "36" | "40" | "44" | "48"
	const [size, setSize] = useState<sizes>("40")
	const [disabled, setDisabled] = useState<"true" | "false">("false")
	const [variant, setVariant] = useState<"outline" | "ghost" | "static-white">("outline")

	const code = (() => {
		if (variant === "outline") {
			return `<Button disabled={${disabled === "true"}} size="${size}" isIcon className="focus-visible:ring-offset-4 disabled:text-text-secondary mt-2 outline outline-soft shadow-[0px_1px_1px_0px_rgba(25,24,27,0.04)] text-text-secondary hover:bg-bg-alpha-2" color="neutral" variant="outline">
  <X />
</Button>`
		}

		if (variant === "ghost") {
			return `<Button size="${size}" disabled={${disabled === "true"}} isIcon variant="ghost" color="neutral">
  <X />
</Button>`
		}

		if (variant === "static-white") {
			return `<Button size="${size}" disabled={${disabled === "true"}} isIcon variant="ghost" color="neutral">
  <X className="stroke-static-white" />
</Button>`
		}

		return "" // fallback
	})()

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
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setVariant(Array.from(keys)[0] as "outline" | "ghost")
										}}
										minSelectionCount={1}
										selectedValues={[variant]}>
										<DropdownItem value="outline">Outline</DropdownItem>
										<DropdownItem value="ghost">Ghost</DropdownItem>
										<DropdownItem value="static-white">Static White</DropdownItem>
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
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center gap-2 overflow-auto rounded-xl border">
					{variant === "outline" && (
						<Button
							disabled={disabled === "true"}
							size={size}
							isIcon
							className="disabled:text-text-secondary outline-soft text-text-secondary hover:bg-bg-alpha-2 mt-2 shadow-[0px_1px_1px_0px_rgba(25,24,27,0.04)] outline focus-visible:ring-offset-4"
							color="neutral"
							variant="outline">
							<X />
							<span className="sr-only">Outline</span>
						</Button>
					)}
					{variant === "ghost" && (
						<Button size={size} disabled={disabled === "true"} isIcon variant="ghost" color="neutral">
							<X />
							<span className="sr-only">Ghost</span>
						</Button>
					)}
					{variant === "static-white" && (
						<Button size={size} disabled={disabled === "true"} isIcon variant="ghost" color="neutral">
							<X className="stroke-static-white" />
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

export default CompactButtonPreview
