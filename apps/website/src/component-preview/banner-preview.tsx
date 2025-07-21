"use client"

import { useState } from "react"
import { EyeIcon, Settings, Sparkles, SquareTerminal } from "lucide-react"
import Link from "next/link"
import CodeSnippet from "@/components/code-snippet"
import { Banner } from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerPreview = () => {
	const [variant, setVariant] = useState<"primary" | "outline" | "gray" | "destructive">("gray")
	const [closable, setClosable] = useState<"true" | "false">("false")
	const [key, setKey] = useState(0)

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
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setVariant(Array.from(keys)[0] as "primary" | "outline" | "gray" | "destructive")
										setKey((k) => k + 1)
									}}
									minSelectionCount={1}
									selectedValues={[variant]}>
									<DropdownItem value="primary">Primary</DropdownItem>
									<DropdownItem value="outline">Outline</DropdownItem>
									<DropdownItem value="gray">Gray</DropdownItem>
									<DropdownItem value="destructive">Destructive</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Closable</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setClosable(Array.from(keys)[0] as "true" | "false")
										setKey((k) => k + 1)
									}}
									minSelectionCount={1}
									selectedValues={[closable]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-start overflow-auto rounded-xl border">
					<Banner key={key} closable={closable === "true" ? true : false} variant={variant} className="w-full">
						<Sparkles size={20} className="stroke-warning" />
						<p>This is a sample banner for design</p>
						<Link className="underline" href="#">
							Upgrade
						</Link>
					</Banner>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="banner.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Banner 
variant="${variant}"
closable={${closable}}>
<Sparkles size={20} className="stroke-warning" />
<p>This is a sample banner for design</p>
<Link className="underline" href="#" >Upgrade</Link>
</Banner>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default BannerPreview
