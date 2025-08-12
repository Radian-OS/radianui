import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import MainTable from "@/registry/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type PersonData = {
	name: string
	email: string
	location: string
	status: "Active" | "Inactive"
	amount?: number
	imageUrl?: string
}

const TablePreview = () => {
	const datas: PersonData[] = [
		{
			name: "Alex Thompson",
			email: "a.tompson@company.com",
			location: "🇺🇸 San Francisco, US",
			status: "Inactive",
			imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
		},
		{
			name: "Sarah Chen",
			email: "sarah.c@company.com",
			location: "🇸🇬 Singapore",
			status: "Active",
			imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
		},
		{
			name: "James Wilson",
			email: "j.wilson@company.com",
			location: "🇬🇧 London, UK",
			status: "Inactive",
			imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
		},
		{
			name: "Maria Garcia",
			email: "m.garcia@company.com",
			location: "🇪🇸 Madrid, Spain",
			status: "Active",
			imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
		},
		{
			name: "Lars Nielsen",
			email: "l.nielsen@company.com",
			location: "🇸🇪 Stockholm, SE",
			status: "Active",
			imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
		},
		{
			name: "Emily Davis",
			email: "emily.d@company.com",
			location: "🇨🇦 Toronto, Canada",
			status: "Active",
			imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
		},
		{
			name: "Michael Brown",
			email: "m.brown@company.com",
			location: "🇦🇺 Sydney, Australia",
			status: "Inactive",
			imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
		},
		{
			name: "Sophia Martinez",
			email: "s.martinez@company.com",
			location: "🇲🇽 Mexico City, Mexico",
			status: "Active",
			imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
		},
		{
			name: "Daniel Lee",
			email: "d.lee@company.com",
			location: "🇰🇷 Seoul, South Korea",
			status: "Inactive",
			imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
		},
		{
			name: "Olivia Taylor",
			email: "o.taylor@company.com",
			location: "🇳🇿 Auckland, New Zealand",
			status: "Active",
			imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
		},
		{
			name: "William Johnson",
			email: "w.johnson@company.com",
			location: "🇩🇪 Berlin, Germany",
			status: "Inactive",
			imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
		},
		{
			name: "Ava Anderson",
			email: "ava.a@company.com",
			location: "🇫🇷 Paris, France",
			status: "Active",
			imageUrl: "https://randomuser.me/api/portraits/women/7.jpg",
		},
		{
			name: "Ethan Thomas",
			email: "e.thomas@company.com",
			location: "🇮🇳 Mumbai, India",
			status: "Inactive",
			imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
		},
		{
			name: "Mia Hernandez",
			email: "mia.h@company.com",
			location: "🇧🇷 São Paulo, Brazil",
			status: "Active",
			imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
		},
		{
			name: "Alexander Moore",
			email: "a.moore@company.com",
			location: "🇿🇦 Cape Town, South Africa",
			status: "Inactive",
			imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
		},
		{
			name: "Charlotte White",
			email: "c.white@company.com",
			location: "🇯🇵 Tokyo, Japan",
			status: "Active",
			imageUrl: "https://randomuser.me/api/portraits/women/9.jpg",
		},
		{
			name: "Benjamin Clark",
			email: "b.clark@company.com",
			location: "🇨🇳 Beijing, China",
			status: "Inactive",
			imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
		},
		{
			name: "Amelia Lewis",
			email: "a.lewis@company.com",
			location: "🇷🇺 Moscow, Russia",
			status: "Active",
			imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
		},
		{
			name: "Lucas Walker",
			email: "l.walker@company.com",
			location: "🇦🇪 Dubai, UAE",
			status: "Inactive",
			imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
		},
		{
			name: "Harper Hall",
			email: "h.hall@company.com",
			location: "🇮🇹 Rome, Italy",
			status: "Active",
			imageUrl: "https://randomuser.me/api/portraits/women/11.jpg",
		},
	]
	const columnsData = [
		{
			id: "name",
			accessorKey: "name",
			header: "Name",
		},
		{
			id: "email",
			accessorKey: "email",
			header: "Email",
		},
		{
			id: "status",
			accessorKey: "status",
			header: "Status",
			cell: ({ row }: { row: { original: PersonData } }) => (
				<>
					<Badge size="20" className={cn(row.original.status === "Inactive" && "bg-elevation-level1 text-fg-secondary", row.original.status === "Active" && "bg-white text-black")}>
						{row.original.status}
					</Badge>
				</>
			),
		},
	]

	const [drag, setDrag] = useState<"true" | "false">("false")
	const [resize, setResize] = useState<"true" | "false">("false")
	const [checkbox, setCheckbox] = useState<"true" | "false">("false")
	const [stripe, setStripe] = useState<"true" | "false">("false")
	const [dense, setDense] = useState<"true" | "false">("true")
	const [sorting, setSorting] = useState<"true" | "false">("false")
	const [header, setHeader] = useState<"40" | "60" | "90" | "110">("40")
	const [row, setRow] = useState<"40" | "60" | "90" | "110">("40")
	const [verticalLine, setVerticalLine] = useState<"true" | "false">("false")
	// const [expand, setExpand] = useState<"true" | "false">("false")
	const [sticky, setSticky] = useState<"true" | "false">("false")
	const [tableHeight, setTableHeight] = useState<"340" | "380" | "420" | "320" | "full">("320")
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
						<DropdownGroup>
							<DropdownSub>
								<DropdownSubTrigger>Checkbox</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setCheckbox(Array.from(keys)[0] as typeof checkbox)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[checkbox]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Vertical line</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setVerticalLine(Array.from(keys)[0] as typeof verticalLine)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[verticalLine]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Stripe</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setStripe(Array.from(keys)[0] as typeof stripe)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[stripe]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Sorting</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setSorting(Array.from(keys)[0] as typeof sorting)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[sorting]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Dragable</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setDrag(Array.from(keys)[0] as typeof drag)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[drag]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Resizable</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setResize(Array.from(keys)[0] as typeof resize)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[resize]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Sticky</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setSticky(Array.from(keys)[0] as typeof sticky)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[sticky]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Outline</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setDense(Array.from(keys)[0] as typeof dense)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[sticky]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Table height</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setTableHeight(Array.from(keys)[0] as typeof tableHeight)}
										minSelectionCount={1}
										selectedValues={[tableHeight]}>
										<DropdownItem value="320">320px</DropdownItem>
										<DropdownItem value="340">340px</DropdownItem>
										<DropdownItem value="380">380px</DropdownItem>
										<DropdownItem value="420">420px</DropdownItem>
										<DropdownItem value="full">Full</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Header height</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setHeader(Array.from(keys)[0] as typeof header)}
										minSelectionCount={1}
										selectedValues={[header]}>
										<DropdownItem value="40px">40px</DropdownItem>
										<DropdownItem value="60px">60px</DropdownItem>
										<DropdownItem value="90px">90px</DropdownItem>
										<DropdownItem value="110px">110px</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Row height</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setRow(Array.from(keys)[0] as typeof row)} minSelectionCount={1} selectedValues={[row]}>
										<DropdownItem value="40px">40px</DropdownItem>
										<DropdownItem value="60px">60px</DropdownItem>
										<DropdownItem value="90px">90px</DropdownItem>
										<DropdownItem value="110px">110px</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownGroup>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-start overflow-auto rounded-xl border px-10 py-10">
					<div className={`mx-auto mb-10 max-h-[200px] ${resize === "true" ? "" : "w-full"}`}>
						<MainTable
							key={key}
							data={datas}
							columns={columnsData}
							checkBox={checkbox === "true"}
							verticalLine={verticalLine === "true"}
							enableSorting={sorting === "true"}
							tableHeight={`[&>div]:max-h-[${tableHeight}px]`}
							stripedTable={stripe === "true"}
							sticky={sticky === "true"}
							headerHeight={header}
							rowHeight={row}
							dragAndDrop={drag === "true"}
							resizable={resize === "true"}
							dense={dense === "true"}
						/>
						<div className="h-10"></div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="table.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<MainTable data={datas} columns={columnsData}
checkBox="${checkbox}" 
verticalLine="${verticalLine}"
enableSorting="${sorting}"
stripedTable="${stripe}" 
sticky="${sticky}"
tableHeight="[&>div]:max-h-[${tableHeight}px]"
headerHeight="${header}" 
rowHeight="${row}"
dragAndDrop="${drag}" 
resizable="${resize}"
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default TablePreview
