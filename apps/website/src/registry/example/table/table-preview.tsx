import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/ui/table"

type PersonData = {
	name: string
	email: string
	status: "Active" | "Inactive"
}

const TablePreview = () => {
	const datas: PersonData[] = [
		{
			name: "Alex Thompson",
			email: "a.tompson@company.com",
			status: "Inactive",
		},
		{
			name: "Sarah Chen",
			email: "sarah.c@company.com",
			status: "Active",
		},
		{
			name: "James Wilson",
			email: "j.wilson@company.com",
			status: "Inactive",
		},
		{
			name: "Maria Garcia",
			email: "m.garcia@company.com",
			status: "Active",
		},
		{
			name: "Lars Nielsen",
			email: "l.nielsen@company.com",
			status: "Active",
		},
		{
			name: "Emily Davis",
			email: "emily.d@company.com",
			status: "Active",
		},
		{
			name: "Michael Brown",
			email: "m.brown@company.com",
			status: "Inactive",
		},
		{
			name: "Sophia Martinez",
			email: "s.martinez@company.com",
			status: "Active",
		},
		{
			name: "Daniel Lee",
			email: "d.lee@company.com",
			status: "Inactive",
		},
		{
			name: "Olivia Taylor",
			email: "o.taylor@company.com",
			status: "Active",
		},
		{
			name: "Benjamin Clark",
			email: "b.clark@company.com",
			status: "Inactive",
		},
		{
			name: "Amelia Lewis",
			email: "a.lewis@company.com",
			status: "Active",
		},
		{
			name: "Lucas Walker",
			email: "l.walker@company.com",
			status: "Inactive",
		},
		{
			name: "Harper Hall",
			email: "h.hall@company.com",
			status: "Active",
		},
	]

	return (
		<div className="flex h-[330px] w-full flex-col items-center justify-start overflow-auto">
			<Table>
				<TableCaption>A list of user details.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="min-w-38">Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{datas.map((data) => (
						<TableRow key={data.name}>
							<TableCell>{data.name}</TableCell>
							<TableCell>{data.email}</TableCell>
							<TableCell>
								<Badge
									size="20"
									className={cn(
										data.status === "Inactive" &&
											"bg-elevation-level1 text-fg-secondary",
										data.status === "Active" && "bg-white text-black"
									)}>
									{data.status}
								</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default TablePreview
