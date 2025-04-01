import { useState } from "react"
import { Breadcrumb, BreadcrumbItem } from "@/registry/ui/breadcrumb"
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

const BreadCrumbPreview = () => {
	const [separatorType, setSeparatorType] = useState<"default" | "slash">("default")
	const [maxItems, setMaxItems] = useState<"2" | "3" | "4" | "5">("5")
	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>separatorType</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										onSelectedChange={(keys) => setSeparatorType(Array.from(keys)[0] as "default" | "slash")}
										selectedValues={[separatorType]}>
										<DropdownItem value="default">Default</DropdownItem>
										<DropdownItem value="slash">Slash</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>maxItems</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										onSelectedChange={(keys) => setMaxItems(Array.from(keys)[0] as "2" | "3" | "4" | "5")}
										selectedValues={[maxItems]}>
										<DropdownItem value="2">2</DropdownItem>
										<DropdownItem value="3">3</DropdownItem>
										<DropdownItem value="4">4</DropdownItem>
										<DropdownItem value="5">5</DropdownItem>
										{/* <DropdownItem value="6">6</DropdownItem> */}
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
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Breadcrumb separatorType={separatorType} maxItems={parseInt(maxItems)}>
						<BreadcrumbItem href="#">Home</BreadcrumbItem>
						<BreadcrumbItem href="#">About</BreadcrumbItem>
						<BreadcrumbItem href="#">Contact</BreadcrumbItem>
						<BreadcrumbItem href="#">Docs</BreadcrumbItem>
						<BreadcrumbItem href="#">Info</BreadcrumbItem>
					</Breadcrumb>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<Breadcrumb separatorType="${separatorType}" maxItems={${maxItems}} >
<BreadcrumbItem href="#" >Home</BreadcrumbItem>
<BreadcrumbItem href="#" >About</BreadcrumbItem>
<BreadcrumbItem href="#" >Contact</BreadcrumbItem>
<BreadcrumbItem href="#" >Docs</BreadcrumbItem>
<BreadcrumbItem href="#" >Info</BreadcrumbItem>
</Breadcrumb>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default BreadCrumbPreview
