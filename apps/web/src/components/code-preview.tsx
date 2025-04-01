"use client"

import { useState } from "react"
import AccordionDemo from "@/registry/example/accordion-demo"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const CodePreview = () => {
	// State for AccordionDemo props
	const [size, setSize] = useState<"sm" | "lg">("sm")
	const [variant, setVariant] = useState<"open" | "closed">("closed")
	const [collapsible, setCollapsible] = useState<boolean>(true)

	const [copied, setCopied] = useState(false)

	// Handle copying code
	const handleCopy = () => {
		const codeString = `Coming Soon...`
		navigator.clipboard.writeText(codeString)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="mx-auto my-8 max-w-4xl">
			<Tabs defaultValue="preview">
				<div className="mb-5 flex items-center justify-between">
					<TabsList>
						<TabsTrigger value="preview">Preview</TabsTrigger>
						<TabsTrigger value="code">Code</TabsTrigger>
					</TabsList>

					<div className="flex items-center space-x-3">
						<Dropdown>
							<DropdownTrigger>Properties</DropdownTrigger>
							<DropdownContent className="min-w-20">
								{/* Dropdown for 'size' */}
								<DropdownSub>
									<DropdownSubTrigger>Size</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => setSize(Array.from(keys)[0] as "sm" | "lg")}
											selectedValues={[size]}>
											<DropdownItem value="sm">Small</DropdownItem>
											<DropdownItem value="lg">Large</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								{/* Dropdown for 'variant' */}
								<DropdownSub>
									<DropdownSubTrigger>Variant</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as "open" | "closed")}
											selectedValues={[variant]}>
											<DropdownItem value="open">Open</DropdownItem>
											<DropdownItem value="closed">Closed</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								{/* Dropdown for 'collapsible' */}
								<DropdownSub>
									<DropdownSubTrigger>Collapsible</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => setCollapsible(Array.from(keys)[0] === "true")}
											selectedValues={[collapsible.toString()]}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
							</DropdownContent>
						</Dropdown>

						{/* Copy Button */}
						<Button onClick={handleCopy}>{copied ? "Copied!" : "Copy Sample"}</Button>
					</div>
				</div>

				<TabsContent value="preview" className="m-0 p-0">
					<div className="flex h-[600px] items-center justify-center rounded-xl border bg-blue-500 px-10">
						<AccordionDemo size={size} variant={variant} collapsible={collapsible} />
					</div>
				</TabsContent>

				<TabsContent value="code" className="m-0 p-0">
					<CodeArea language="typescript" showLineNumbers code="npx radianos init" className="min-h-[320px]" />
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default CodePreview
