import React from "react"
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
import { Tabs, TabsContent, TabsList, type TabsListWidth, type TabsSize, TabsTrigger, type TabsVariant } from "@/registry/ui/tabs"

const variants = ["default", "open", "outline", "ghost"]
const sizes = ["small", "base"]
const widths = ["fit", "full"]

const TablePreview = () => {
	const [variant, setVariant] = React.useState<TabsVariant>("default")
	const [size, setSize] = React.useState<TabsSize>("base")
	const [width, setWidth] = React.useState<TabsListWidth>("fit")

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
										onSelectedChange={(values) => setVariant(values[0] as TabsVariant)}
										minSelectionCount={1}
										selectedValues={[variant]}>
										{variants.map((v) => (
											<DropdownItem key={v} value={v}>
												{v}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(values) => setSize(values[0] as TabsSize)}
										minSelectionCount={1}
										selectedValues={[size]}>
										{sizes.map((v) => (
											<DropdownItem key={v} value={v}>
												{v}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Width</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(values) => setWidth(values[0] as TabsListWidth)}
										minSelectionCount={1}
										selectedValues={[width]}>
										{widths.map((v) => (
											<DropdownItem key={v} value={v}>
												{v}
											</DropdownItem>
										))}
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Tabs size={size} variant={variant} defaultValue="products">
						<TabsList width={width}>
							<TabsTrigger value="products">Products</TabsTrigger>
							<TabsTrigger value="orders">Orders</TabsTrigger>
							<TabsTrigger value="customers">Customers</TabsTrigger>
							<TabsTrigger value="reports">Reports</TabsTrigger>
						</TabsList>
						<div className="px-2">
							<TabsContent value="products">Content of tab one</TabsContent>
							<TabsContent value="orders">Content of tab two</TabsContent>
							<TabsContent value="customers">Content of tab three</TabsContent>
							<TabsContent value="reports">Content of tab four</TabsContent>
						</div>
					</Tabs>
				</div>
			</TabsContent>

			<TabsContent value="code"></TabsContent>
		</Tabs>
	)
}

export default TablePreview
