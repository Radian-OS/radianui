import React from "react"
import { EyeIcon, File, Package2, Settings, ShoppingBag, SquareTerminal, User2 } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, type TabsListWidth, type TabsSize, TabsTrigger, type TabsVariant } from "@/registry/ui/tabs"

const variants = ["default", "open", "outline", "ghost", "outline-ghost"]
const sizes = ["sm", "md", "lg"]
const widths = ["fit", "full"]
const orientations = ["horizontal", "vertical"]
const activationModes = ["manual", "automatic"]
const booleanValues = ["true", "false"]

const DEFAULT_VARIANT = "default"
const DEFAULT_SIZE = "md"
const DEFAULT_WIDTH = "fit"
const DEFAULT_ORIENTATION = "horizontal"
const DEFAULT_ACTIVATION_MODE = "automatic"
const DEFAULT_ICON = "false"
const DEFAULT_COUNTER = "false"

const data = [
	{
		label: "Products",
		value: "products",
		icon: <Package2 />,
		counter: 10,
		content: "Manage your product listings, inventory levels, and pricing. Easily add new items or update existing ones.",
	},
	{
		label: "Orders",
		value: "orders",
		icon: <ShoppingBag />,
		counter: 5,
		content: "View and track recent orders, check fulfillment status, and manage shipping or cancellations of the orders.",
	},
	{
		label: "Customers",
		value: "customers",
		icon: <User2 />,
		counter: 99,
		content: "Access your customer database, see order history, and manage your customer support interactions.",
	},
	{
		label: "Reports",
		value: "reports",
		icon: <File />,
		content: "Analyze sales trends, customer behavior, and overall business performance with real-time reports.",
		counter: 0,
		disabled: true,
	},
]

const TablePreview = () => {
	const [variant, setVariant] = React.useState<TabsVariant>(DEFAULT_VARIANT)
	const [size, setSize] = React.useState<TabsSize>(DEFAULT_SIZE)
	const [width, setWidth] = React.useState<TabsListWidth>(DEFAULT_WIDTH)
	const [orientation, setOrientation] = React.useState<"horizontal" | "vertical">(DEFAULT_ORIENTATION)
	const [activationMode, setActivationMode] = React.useState<"manual" | "automatic">(DEFAULT_ACTIVATION_MODE)
	const [icon, setIcon] = React.useState<"true" | "false">(DEFAULT_ICON)
	const [counter, setCounter] = React.useState<"true" | "false">(DEFAULT_COUNTER)

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
							<DropdownSubTrigger>variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={variant!} onValueChange={(value) => setVariant(value as TabsVariant)}>
									{variants.map((v) => (
										<DropdownRadioItem key={v} value={v} onSelect={(e) => e.preventDefault()}>
											{v}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size!} onValueChange={(value) => setSize(value as TabsSize)}>
									{sizes.map((v) => (
										<DropdownRadioItem key={v} value={v} onSelect={(e) => e.preventDefault()}>
											{v}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>width</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={width} onValueChange={(value) => setWidth(value as TabsListWidth)}>
									{widths.map((v) => (
										<DropdownRadioItem key={v} value={v} onSelect={(e) => e.preventDefault()}>
											{v}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>orientation</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={orientation} onValueChange={(value) => setOrientation(value as "horizontal" | "vertical")}>
									{orientations.map((v) => (
										<DropdownRadioItem key={v} value={v} onSelect={(e) => e.preventDefault()}>
											{v}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>activationMode</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={activationMode} onValueChange={(value) => setActivationMode(value as "manual" | "automatic")}>
									{activationModes.map((v) => (
										<DropdownRadioItem key={v} value={v} onSelect={(e) => e.preventDefault()}>
											{v}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>icon</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={icon} onValueChange={(value) => setIcon(value === "true" ? "true" : "false")}>
									{booleanValues.map((v) => (
										<DropdownRadioItem key={v} value={v} onSelect={(e) => e.preventDefault()}>
											{v}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>counter</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={counter} onValueChange={(value) => setCounter(value === "true" ? "true" : "false")}>
									{booleanValues.map((v) => (
										<DropdownRadioItem key={v} value={v} onSelect={(e) => e.preventDefault()}>
											{v}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Tabs size={size} variant={variant} defaultValue={data[0].value} orientation={orientation} activationMode={activationMode}>
						<TabsList width={width}>
							{data.map((dataItem) => (
								<TabsTrigger
									key={dataItem.value}
									value={dataItem.value}
									{...(icon !== DEFAULT_ICON && { icon: dataItem.icon })}
									{...(counter !== DEFAULT_COUNTER && { counter: dataItem.counter })}
									disabled={dataItem.disabled}>
									{dataItem.label}
								</TabsTrigger>
							))}
						</TabsList>
						{data.map(({ value, content }) => (
							<TabsContent key={value} value={value}>
								{content}
							</TabsContent>
						))}
					</Tabs>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="tabs.tsx"
					showLineNumber
					className="h-[420px]"
					code={`const data = [
	{
		label: "Products",
		value: "products",
		icon: <Package2 />,
		counter: 10,
		content: "Manage your product listings, inventory levels, and pricing. Easily add new items or update existing ones.",
	},
	{
		label: "Orders",
		value: "orders",
		icon: <ShoppingBag />,
		counter: 5,
		content: "View and track recent orders, check fulfillment status, and manage shipping or cancellations of the orders.",
	},
	{
		label: "Customers",
		value: "customers",
		icon: <User2 />,
		counter: 99,
		content: "Access your customer database, see order history, and manage your customer support interactions.",
	},
	{
		label: "Reports",
		value: "reports",
		icon: <File />,
		content: "Analyze sales trends, customer behavior, and overall business performance with real-time reports.",
		counter: 0,
		disabled: true,
	},
]

export default function TabsPreview(){
 	return(
		<Tabs defaultValue={data[0].value} ${variant !== DEFAULT_VARIANT ? ` variant="${variant}"` : ""}${size !== DEFAULT_SIZE ? ` size="${size}"` : ""}${activationMode !== DEFAULT_ACTIVATION_MODE ? ` activationMode="${activationMode}"` : ""} ${orientation !== DEFAULT_ORIENTATION ? ` orientation="${orientation}"` : ""}>
			<TabsList${width !== DEFAULT_WIDTH ? ` width="${width}"` : ""}>
				{data.map((dataItem) => (
					<TabsTrigger key={dataItem.value} value={dataItem.value}${icon !== DEFAULT_ICON ? ` icon={dataItem.icon}` : ""} ${counter !== DEFAULT_COUNTER ? ` counter={dataItem.counter}` : ""} disabled={dataItem.disabled}>
						{dataItem.label}
					</TabsTrigger>
				))}
				</TabsList>
				{data.map(({ value, content }) => (
					<TabsContent key={value} value={value}>
						{content}
					</TabsContent>
				))}
		</Tabs>				
 			)}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default TablePreview
