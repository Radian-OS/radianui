"use client"

import { useState } from "react"
import { Bolt, ClipboardSignature } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Variants = "default" | "open" | "outline" | "ghost"
type Sizes = "sm" | "md" | "lg"

const TabsExample = () => {
	const [variant, setVariant] = useState<Variants>("default")
	const [size, setSize] = useState<Sizes>("md")
	const [width, setWidth] = useState<"fit" | "full">("fit")
	return (
		<div className="my-4 flex flex-col gap-4">
			<div className="flex flex-col gap-5 md:flex-row">
				<div className="flex gap-2">
					<label>Variant</label>
					<select onChange={(e) => setVariant(e.target.value as Variants)} defaultValue={"default"}>
						<option value="default">Default</option>
						<option value="open">Open</option>
						<option value="outline">Outline</option>
						<option value="ghost">Ghost</option>
					</select>
				</div>
				<div className="flex gap-2">
					<label>Size</label>
					<select onChange={(e) => setSize(e.target.value as Sizes)} defaultValue={"base"}>
						<option value="sm">sm</option>
						<option value="md">md</option>
						<option value="lg">lg</option>
					</select>
				</div>
				<div className="flex gap-2">
					<label>Width</label>
					<select onChange={(e) => setWidth(e.target.value as "fit" | "full")} defaultValue={"fit"}>
						<option value="fit">Fit</option>
						<option value="full">Full</option>
					</select>
				</div>
			</div>
			<div className={`flex max-w-[40rem] flex-col gap-4`}>
				<Tabs defaultValue="account" variant={variant} size={size}>
					<TabsList width={width}>
						<TabsTrigger value="account">Selection</TabsTrigger>
						<TabsTrigger value="password">Selection</TabsTrigger>
					</TabsList>
				</Tabs>
				<Tabs defaultValue="account" variant={variant} size={size}>
					<TabsList width={width}>
						<TabsTrigger value="account" counter={0}>
							Selection
						</TabsTrigger>
						<TabsTrigger value="password" counter={12}>
							Selection
						</TabsTrigger>
					</TabsList>
					<TabsContent value="account">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel odit debitis esse iure mollitia a non .
					</TabsContent>
					<TabsContent value="password">
						d suscipit explicabo. Culpa commodi velit quam nam aliquid labore sit, earum nulla similique deleniti adipisci explicabo assumenda magni
						molestiae! Dolorum!
					</TabsContent>
				</Tabs>
				<Tabs defaultValue="account" variant={variant} size={size}>
					<TabsList width={width}>
						<TabsTrigger value="account" icon={<ClipboardSignature />}>
							Selection
						</TabsTrigger>
						<TabsTrigger value="password" disabled icon={<Bolt />}>
							Disabled
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
		</div>
	)
}

export default TabsExample
