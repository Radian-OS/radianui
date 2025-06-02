import React from "react"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, type TabsListWidth, type TabsSize, TabsTrigger, type TabsVariant } from "@/registry/ui/tabs"

const variants = ["default", "open", "outline", "ghost"]
const sizes = ["sm", "md", "lg"]
const widths = ["fit", "full"]
const orientations = ["horizontal", "vertical"]
const activationModes = ["manual", "automatic"]

const DEFAULT_VARIANT = "default"
const DEFAULT_SIZE = "md"
const DEFAULT_WIDTH = "fit"
const DEFAULT_ORIENTATION = "horizontal"
const DEFAULT_ACTIVATION_MODE = "automatic"

const TablePreview = () => {
	const [variant, setVariant] = React.useState<TabsVariant>(DEFAULT_VARIANT)
	const [size, setSize] = React.useState<TabsSize>(DEFAULT_SIZE)
	const [width, setWidth] = React.useState<TabsListWidth>(DEFAULT_WIDTH)
	const [orientation, setOrientation] = React.useState<"horizontal" | "vertical">(DEFAULT_ORIENTATION)
	const [activationMode, setActivationMode] = React.useState<"manual" | "automatic">(DEFAULT_ACTIVATION_MODE)

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(values) => setVariant(values[0] as TabsVariant)} minSelectionCount={1} selectedValues={[variant!]}>
										{variants.map((v) => (
											<DropdownItem key={v} value={v}>
												{v}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(values) => setSize(values[0] as TabsSize)} minSelectionCount={1} selectedValues={[size!]}>
										{sizes.map((v) => (
											<DropdownItem key={v} value={v}>
												{v}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>width</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(values) => setWidth(values[0] as TabsListWidth)} minSelectionCount={1} selectedValues={[width]}>
										{widths.map((v) => (
											<DropdownItem key={v} value={v}>
												{v}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>orientation</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(values) => setOrientation(values[0] as "horizontal" | "vertical")}
										minSelectionCount={1}
										selectedValues={[orientation]}>
										{orientations.map((v) => (
											<DropdownItem key={v} value={v}>
												{v}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>activationMode</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(values) => setActivationMode(values[0] as "manual" | "automatic")}
										minSelectionCount={1}
										selectedValues={[activationMode]}>
										{activationModes.map((v) => (
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
					<Tabs size={size} variant={variant} defaultValue="products" orientation={orientation} activationMode={activationMode}>
						<TabsList width={width}>
							<TabsTrigger value="products">Products</TabsTrigger>
							<TabsTrigger value="orders">Orders</TabsTrigger>
							<TabsTrigger value="customers">Customers</TabsTrigger>
							<TabsTrigger value="reports">Reports</TabsTrigger>
							<TabsTrigger value="disabled" disabled>
								Disabled
							</TabsTrigger>
						</TabsList>
						<TabsContent value="products">Manage your product listings, inventory levels, and pricing. Easily add new items or update existing ones.</TabsContent>
						<TabsContent value="orders">View and track recent orders, check fulfillment status, and manage shipping or cancellations of the orders.</TabsContent>
						<TabsContent value="customers">Access your customer database, see order history, and manage your customer support interactions.</TabsContent>
						<TabsContent value="reports">Analyze sales trends, customer behavior, and overall business performance with real-time reports.</TabsContent>
						<TabsContent value="disabled">This is a disabled tab</TabsContent>
					</Tabs>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<Tabs ${variant !== DEFAULT_VARIANT ? ` variant="${variant}"` : ""}${size !== DEFAULT_SIZE ? ` size="${size}"` : ""} defaultValue="products"${activationMode !== DEFAULT_ACTIVATION_MODE ? ` activationMode="${activationMode}"` : ""} ${orientation !== DEFAULT_ORIENTATION ? ` orientation="${orientation}"` : ""}>
	<TabsList${width !== DEFAULT_WIDTH ? ` width="${width}"` : ""}>
		<TabsTrigger value="products">Products</TabsTrigger>
		<TabsTrigger value="orders">Orders</TabsTrigger>
		<TabsTrigger value="customers">Customers</TabsTrigger>
		<TabsTrigger value="reports">Reports</TabsTrigger>
		<TabsTrigger value="disabled" disabled>
			Disabled
		</TabsTrigger>
	</TabsList>
	<TabsContent value="products">Manage your product listings, inventory levels, and pricing. Easily add new items or update existing ones.</TabsContent>
	<TabsContent value="orders">View and track recent orders, check fulfillment status, and manage shipping or cancellations of the orders.</TabsContent>
	<TabsContent value="customers">Access your customer database, see order history, and manage your customer support interactions.</TabsContent>
	<TabsContent value="reports">Analyze sales trends, customer behavior, and overall business performance with real-time reports.</TabsContent>
	<TabsContent value="disabled">This is a disabled tab</TabsContent>
</Tabs>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default TablePreview
