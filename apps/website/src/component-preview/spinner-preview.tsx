"use client"

import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as SpinnerVariants)}>
									<DropdownRadioItem value="default" onSelect={(e) => e.preventDefault()}>
										default
									</DropdownRadioItem>
									<DropdownRadioItem value="simple" onSelect={(e) => e.preventDefault()}>
										simple
									</DropdownRadioItem>
									<DropdownRadioItem value="activity" onSelect={(e) => e.preventDefault()}>
										activity
									</DropdownRadioItem>
									<DropdownRadioItem value="wave" onSelect={(e) => e.preventDefault()}>
										wave
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size.toString()} onValueChange={(value) => setSize(parseInt(value))}>
									<DropdownRadioItem value="24" onSelect={(e) => e.preventDefault()}>
										24
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
									<DropdownRadioItem value="48" onSelect={(e) => e.preventDefault()}>
										48
									</DropdownRadioItem>
								</DropdownRadioGroup>
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
