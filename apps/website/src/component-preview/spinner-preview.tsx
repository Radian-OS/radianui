"use client"

import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Spinner, SpinnerVariants } from "@/registry/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const SpinnerPreview = () => {
	const [variant, setVariant] = useState<SpinnerVariants>("default")
	const [size, setSize] = useState<number>(36)

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
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(values) => setVariant(values[0] as SpinnerVariants)} minSelectionCount={1} selectedValues={[variant]}>
									<DropdownItem value="default">default</DropdownItem>
									<DropdownItem value="simple">simple</DropdownItem>
									<DropdownItem value="activity">activity</DropdownItem>
									<DropdownItem value="wave">wave</DropdownItem>
									<DropdownItem value="snake">snake</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(values) => setSize(parseInt(values[0]))} minSelectionCount={1} selectedValues={[size.toString()]}>
									<DropdownItem value="24">24</DropdownItem>
									<DropdownItem value="32">32</DropdownItem>
									<DropdownItem value="36">36</DropdownItem>
									<DropdownItem value="40">40</DropdownItem>
									<DropdownItem value="48">48</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
					<Spinner variant={variant} size={size} />
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="spinner.tsx" showLineNumber className="h-[420px]" code={`<Spinner variant='${variant}' size={${size}} />`} />
			</TabsContent>
		</Tabs>
	)
}

export default SpinnerPreview
