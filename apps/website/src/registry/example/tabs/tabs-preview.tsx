import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const data = [
	{
		label: "Products",
		value: "products",
		content: "This is the products tab",
	},
	{
		label: "Orders",
		value: "orders",
		content: "This is the orders tab",
	},
	{
		label: "Customers",
		value: "customers",
		content: "This is the customers tab",
	},
	{
		label: "Reports",
		value: "reports",
		content: "This is the reports tab",
	},
]

export default function TabsPreview() {
	return (
		<Tabs defaultValue={data[0].value}>
			<TabsList>
				{data.map((dataItem) => (
					<TabsTrigger key={dataItem.value} value={dataItem.value}>
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
	)
}
