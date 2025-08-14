"use client"

// import { Map, User } from "lucide-react";
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import Pagination from "@/registry/ui/pagination"
import { Select, SelectItem } from "@/registry/ui/select"
import MainTable from "@/registry/ui/table"

import Demo from "./table-pagination-demo"

// type Person = {
//     name: string;
//     age: number;
//     occupation: string;
//     location: string;
//     email: string;
//     phoneNumber: string;
//     imageUrl?: string;
//     note?: string;
// };

type PersonData = {
	name: string
	email: string
	location: string
	status: "Active" | "Inactive"
	amount: number
	imageUrl?: string
}

// const data: Person[] = [
//     { name: "Bob", age: 25, occupation: "Designer", location: "New York", email: "bob@example.com", phoneNumber: "123-456-7890", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
//     { name: "Alice", age: 30, occupation: "Engineer", location: "San Francisco", email: "alice@example.com", phoneNumber: "234-567-8901", imageUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
//     { name: "Charlie", age: 35, occupation: "Teacher", location: "Los Angeles", email: "charlie@example.com", phoneNumber: "345-678-9012", imageUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
//     { name: "David", age: 28, occupation: "Developer", location: "Seattle", email: "david@example.com", phoneNumber: "456-789-0123", imageUrl: "https://randomuser.me/api/portraits/women/1.jpg" },
//     { name: "Eva", age: 32, occupation: "Manager", location: "Chicago", email: "eva@example.com", phoneNumber: "567-890-1234", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
// ];

// const basicData: Person[] = [
//     {
//         name: "Bob",
//         note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         age: 25,
//         occupation: "Designer",
//         location: "New York",
//         email: "bob@example.com",
//         phoneNumber: "123-456-7890"
//     },
//     {
//         name: "Alice",
//         note: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
//         age: 30,
//         occupation: "Engineer",
//         location: "San Francisco",
//         email: "alice@example.com",
//         phoneNumber: "234-567-8901"
//     },
//     {
//         name: "Charlie",
//         note: "Vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Praesent semper feugiat nibh sed pulvinar proin gravida.",
//         age: 35,
//         occupation: "Teacher",
//         location: "Los Angeles",
//         email: "charlie@example.com",
//         phoneNumber: "345-678-9012"
//     },
//     {
//         name: "David",
//         note: "Amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus.",
//         age: 28,
//         occupation: "Developer",
//         location: "Seattle",
//         email: "david@example.com",
//         phoneNumber: "456-789-0123"
//     }
// ];

const datas: PersonData[] = [
	{
		name: "Alex Thompson",
		email: "a.tompson@company.com",
		location: "🇺🇸 San Francisco, US",
		status: "Inactive",
		amount: 1750.0,
		imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
	},
	{
		name: "Sarah Chen",
		email: "sarah.c@company.com",
		location: "🇸🇬 Singapore",
		status: "Active",
		amount: 600.0,
		imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
	},
	{
		name: "James Wilson",
		email: "j.wilson@company.com",
		location: "🇬🇧 London, UK",
		status: "Inactive",
		amount: 650.0,
		imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
	},
	{
		name: "Maria Garcia",
		email: "m.garcia@company.com",
		location: "🇪🇸 Madrid, Spain",
		status: "Active",
		amount: 0.0,
		imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
	},
	{
		name: "Lars Nielsen",
		email: "l.nielsen@company.com",
		location: "🇸🇪 Stockholm, SE",
		status: "Active",
		amount: 1000.0,
		imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
	},
	{
		name: "Emily Davis",
		email: "emily.d@company.com",
		location: "🇨🇦 Toronto, Canada",
		status: "Active",
		amount: 1200.0,
		imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
	},
	{
		name: "Michael Brown",
		email: "m.brown@company.com",
		location: "🇦🇺 Sydney, Australia",
		status: "Inactive",
		amount: 800.0,
		imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
	},
	{
		name: "Sophia Martinez",
		email: "s.martinez@company.com",
		location: "🇲🇽 Mexico City, Mexico",
		status: "Active",
		amount: 950.0,
		imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
	},
	{
		name: "Daniel Lee",
		email: "d.lee@company.com",
		location: "🇰🇷 Seoul, South Korea",
		status: "Inactive",
		amount: 300.0,
		imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
	},
	{
		name: "Olivia Taylor",
		email: "o.taylor@company.com",
		location: "🇳🇿 Auckland, New Zealand",
		status: "Active",
		amount: 750.0,
		imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
	},
	{
		name: "William Johnson",
		email: "w.johnson@company.com",
		location: "🇩🇪 Berlin, Germany",
		status: "Inactive",
		amount: 500.0,
		imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
	},
	{
		name: "Ava Anderson",
		email: "ava.a@company.com",
		location: "🇫🇷 Paris, France",
		status: "Active",
		amount: 1300.0,
		imageUrl: "https://randomuser.me/api/portraits/women/7.jpg",
	},
	{
		name: "Ethan Thomas",
		email: "e.thomas@company.com",
		location: "🇮🇳 Mumbai, India",
		status: "Inactive",
		amount: 200.0,
		imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
	},
	{
		name: "Mia Hernandez",
		email: "mia.h@company.com",
		location: "🇧🇷 São Paulo, Brazil",
		status: "Active",
		amount: 900.0,
		imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
	},
	{
		name: "Alexander Moore",
		email: "a.moore@company.com",
		location: "🇿🇦 Cape Town, South Africa",
		status: "Inactive",
		amount: 400.0,
		imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
	},
	{
		name: "Charlotte White",
		email: "c.white@company.com",
		location: "🇯🇵 Tokyo, Japan",
		status: "Active",
		amount: 1100.0,
		imageUrl: "https://randomuser.me/api/portraits/women/9.jpg",
	},
	{
		name: "Benjamin Clark",
		email: "b.clark@company.com",
		location: "🇨🇳 Beijing, China",
		status: "Inactive",
		amount: 250.0,
		imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
	},
	{
		name: "Amelia Lewis",
		email: "a.lewis@company.com",
		location: "🇷🇺 Moscow, Russia",
		status: "Active",
		amount: 850.0,
		imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
	},
	{
		name: "Lucas Walker",
		email: "l.walker@company.com",
		location: "🇦🇪 Dubai, UAE",
		status: "Inactive",
		amount: 700.0,
		imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
	},
	{
		name: "Harper Hall",
		email: "h.hall@company.com",
		location: "🇮🇹 Rome, Italy",
		status: "Active",
		amount: 1500.0,
		imageUrl: "https://randomuser.me/api/portraits/women/11.jpg",
	},
]

const columnsData = [
	{
		id: "name",
		accessorKey: "name",
		header: "Name",
		size: 200,
	},
	{
		id: "email",
		accessorKey: "email",
		header: "Email",
		size: 300,
	},
	{
		id: "location",
		accessorKey: "location",
		header: "Location",
		size: 300,
	},
	{
		id: "status",
		accessorKey: "status",
		header: "Status",
		size: 200,
		cell: ({ row }: { row: { original: PersonData } }) => (
			<>
				<Badge size="20" className={cn(row.original.status === "Inactive" && "bg-elevation-level1 text-fg-secondary", row.original.status === "Active" && "bg-white text-black")}>
					{row.original.status}
				</Badge>
			</>
		),
	},
	{
		id: "amount",
		accessorKey: "amount",
		header: "Amount",
		size: 179,
	},
]

// const basicColumns = [
//     {
//         id: "name",
//         accessorKey: "name",
//         header: "Name",
//         enableSorting: true,
//         size: 250

//     },
//     {
//         id: "age",
//         accessorKey: "age",
//         header: "Age",
//         enableSorting: true,
//         size: 229
//         // filterFn: numberMatchFilter,
//     },
//     {
//         id: "occupation",
//         accessorKey: "occupation",
//         header: "Occupation",
//         filterType: "date" as const,
//         size: 250

//     },
//     {
//         id: "location",
//         accessorKey: "location",
//         header: "Location",
//         enableColumnFilter: false,
//         size: 250

//     },
//     {
//         id: "email",
//         accessorKey: "email",
//         header: "Email",
//         size: 200

//     },

// ];

// const columns = [
//     {
//         id: "name", // for dragging the column
//         accessorKey: "name",
//         header: "Name",
//         icon: <User className=" w-4" />,
//         cell: ({ row }: { row: { original: Person } }) => (
//             <div className="flex items-center" onClick={() => console.log(row.original.name)}>
//                 <img src={row.original.imageUrl} alt={row.original.name} className="w-10 h-10 rounded-full mr-2" />
//                 <div className=" flex flex-col">
//                     <span className=" font-bold">{row.original.name}</span>
//                     <span className=" text-[12px]">{row.original.email}</span>
//                 </div>
//             </div>
//         ),
//         size: 200
//     },
//     {
//         id: "age",
//         accessorKey: "age",
//         header: "Age",
//         size: 200,
//         filterFn: numberMatchFilter,
//         enableColumnFilter: false,

//     },
//     {
//         id: "occupation",
//         accessorKey: "occupation",
//         header: "Occupation",
//         size: 200,
//         filterType: "date" as const

//     },
//     {
//         id: "location",
//         accessorKey: "location",
//         header: "Location",
//         icon: <Map className=" w-4" />,
//         size: 200,
//         enableColumnFilter: false,

//     },

// ];

const TableExample = () => {
	const [drag, setDrag] = useState<string[]>([])
	const [resize, setResize] = useState<string[]>([])
	const [checkbox, setCheckbox] = useState<string[]>([])
	const [stripe, setStripe] = useState<string[]>([])
	const [dense, setDense] = useState<string[]>([])
	const [sorting, setSorting] = useState<string[]>([])
	const [header, setHeader] = useState<string[]>([])
	const [row, setRow] = useState<string[]>([])
	const [verticalLine, setVerticalLine] = useState<string[]>([])
	// const [expand, setExpand] = useState<string[]>([])
	const [sticky, setSticky] = useState<string[]>([])
	const [tableHeight, setTableHeight] = useState<string[]>([])

	const [currentPage, setCurrentPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(5)

	const [goTo, setGoTo] = useState<string[]>([])
	const [buttonVariant, setButtonVariant] = useState<string[]>([])
	const [customRow, setCustomRow] = useState<string[]>(["true"])
	const [control, setControl] = useState<string[]>(["icon"])

	const [rowPer, setRowPer] = useState<string[]>(["true"])

	const handleRowsPerPageChange = (page: number) => {
		setRowsPerPage(page)
		// You can also fetch data or perform other actions here
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const indexOfLastRow = currentPage * rowsPerPage
	const indexOfFirstRow = indexOfLastRow - rowsPerPage
	const currentData = datas.slice(indexOfFirstRow, indexOfLastRow)

	return (
		<div className="pb-10">
			<Demo />
			<div className="mb-14 flex flex-wrap gap-4">
				<div className="flex flex-col">
					<Select label="Checkbox" placeholder="Checkbox" selectedValues={checkbox} onSelectedChange={setCheckbox}>
						<SelectItem value="true">True</SelectItem>
						<SelectItem value="false">False</SelectItem>
					</Select>

					<Select label="Vertical Line" placeholder="Vertical Line" selectedValues={verticalLine} onSelectedChange={setVerticalLine}>
						<SelectItem value="true">True</SelectItem>
						<SelectItem value="false">False</SelectItem>
					</Select>
				</div>

				<div className="flex flex-col">
					<Select label="Stripe" placeholder="Stripe" selectedValues={stripe} onSelectedChange={setStripe}>
						<SelectItem value="true">True</SelectItem>
						<SelectItem value="false">False</SelectItem>
					</Select>
					<Select label="Resizable" placeholder="Resizable" selectedValues={resize} onSelectedChange={setResize}>
						<SelectItem value="true">True</SelectItem>
						<SelectItem value="false">False</SelectItem>
					</Select>
				</div>

				<div className="flex flex-col">
					<Select label="Table Height" placeholder="Table Height" selectedValues={tableHeight} onSelectedChange={setTableHeight}>
						<SelectItem value="">Full</SelectItem>
						<SelectItem value="[&>div]:max-h-[420px]">420px</SelectItem>
						<SelectItem value="[&>div]:max-h-[380px]">380px</SelectItem>
						<SelectItem value="[&>div]:max-h-[340px]">340px</SelectItem>
						<SelectItem value="[&>div]:max-h-[320px]">320px</SelectItem>
					</Select>
					<Select label="Drag and Drop" placeholder="Drag and Drop" selectedValues={drag} onSelectedChange={setDrag}>
						<SelectItem value="true">True</SelectItem>
						<SelectItem value="false">False</SelectItem>
					</Select>
				</div>

				<div className="flex flex-col">
					<Select label="Header Height" placeholder="Header Height" selectedValues={header} onSelectedChange={setHeader}>
						<SelectItem value="max-h-max-content">Full</SelectItem>
						<SelectItem value="max-h-[100px]">100px</SelectItem>
						<SelectItem value="max-h-[150px]">150px</SelectItem>
						<SelectItem value="max-h-[200px]">200px</SelectItem>
					</Select>
					<Select label="Row Height" placeholder="Row Height" selectedValues={row} onSelectedChange={setRow}>
						<SelectItem value="40px">40px</SelectItem>
						<SelectItem value="60px">60px</SelectItem>
						<SelectItem value="90px">90px</SelectItem>
						<SelectItem value="100px">100px</SelectItem>
						<SelectItem value="120px">120px</SelectItem>
					</Select>
				</div>

				<div className="flex flex-col">
					<Select label="Outine" placeholder="Outline" selectedValues={dense} onSelectedChange={setDense}>
						<SelectItem value="true">True</SelectItem>
						<SelectItem value="false">False</SelectItem>
					</Select>

					<Select label="Sorting" placeholder="Sorting Table" selectedValues={sorting} onSelectedChange={setSorting}>
						<SelectItem value="true">True</SelectItem>
						<SelectItem value="false">False</SelectItem>
					</Select>
				</div>
				<div className="flex flex-col">
					<Select label="Sticky" placeholder="Sticky" selectedValues={sticky} onSelectedChange={setSticky}>
						<SelectItem value="true">True</SelectItem>
						<SelectItem value="false">False</SelectItem>
					</Select>

					{/* <Select
                        label="Expand"
                        placeholder="Expand"
                        selectedValues={expand}
                        onSelectedChange={setExpand}
                    >
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>

                    </Select> */}
				</div>
			</div>

			<MainTable
				data={currentData}
				columns={columnsData}
				enableSorting={sorting[0] === "true"}
				dense={dense[0] === "true"}
				checkBox={checkbox[0] === "true"}
				stripedTable={stripe[0] === "true"}
				headerHeight={`${header}`}
				rowHeight={`${row}`}
				dragAndDrop={drag[0] === "true"}
				resizable={resize[0] === "true"}
				verticalLine={verticalLine[0] === "true"}
				// expand={expand[0] === "true"}
				sticky={sticky[0] === "true"}
				tableHeight={`${tableHeight}`}
			/>

			<div className="mt-10">
				<Pagination
					totalPage={datas.length}
					currentPage={currentPage}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleRowsPerPageChange}
					rowPerPage={rowPer[0] === "true"}
					enableCustomRows={customRow[0] === "true"}
					goToPage={goTo[0] === "true"}
					customRows={5}
				/>
			</div>
			<div className="mt-10 flex flex-wrap gap-4">
				<Select label="Control" placeholder="Control" selectedValues={control} onSelectedChange={setControl} className="w-max">
					<SelectItem value="icon">Icon</SelectItem>
					<SelectItem value="text">Text</SelectItem>
					<SelectItem value="both">Icon & Text</SelectItem>
				</Select>

				<Select label="Enable GoTo" placeholder="Goto page" className="w-max" selectedValues={goTo} onSelectedChange={setGoTo}>
					<SelectItem value="true">True</SelectItem>
					<SelectItem value="false">False</SelectItem>
				</Select>

				<Select label="Button Variant" placeholder="Button Variant" selectedValues={buttonVariant} onSelectedChange={setButtonVariant} className="w-max">
					<SelectItem value="strong">strong</SelectItem>
					<SelectItem value="outline">outline</SelectItem>
				</Select>

				<Select label="Total Page" placeholder="Total Page" selectedValues={customRow} onSelectedChange={setCustomRow} className="w-max">
					<SelectItem value="true">True</SelectItem>
					<SelectItem value="false">False</SelectItem>
				</Select>

				<Select label="Enable Row per page" placeholder="Enable Row per page" selectedValues={rowPer} onSelectedChange={setRowPer} className="w-max">
					<SelectItem value="true">True</SelectItem>
					<SelectItem value="false">False</SelectItem>
				</Select>
			</div>
			{/* <Divider spacing="80" />

            <h1 className="text-2xl font-bold mb-4">Searching Table</h1>

            <MainTable
                data={basicData}
                columns={basicColumns}
                row="45px"
                enableSearching={true}

            /> */}
		</div>
	)
}

export default TableExample
