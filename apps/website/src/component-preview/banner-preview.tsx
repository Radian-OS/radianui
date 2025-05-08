"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Banner } from "@/registry/ui/banner"
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

const BannerPreview = () => {
	const [variant, setVariant] = useState<"primary" | "outline" | "gray" | "destructive">("gray")
	const [closable, setClosable] = useState<"true" | "false">("false")
	const [key, setKey] = useState(0)

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
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
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
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
				<CodeArea
					language="tsx"
					showLineNumbers
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
