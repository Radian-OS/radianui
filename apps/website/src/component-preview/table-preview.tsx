import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

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
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-start overflow-auto rounded-xl border px-10 py-10">
					<Table>
						<TableCaption>A list of user details.</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
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
										<Badge size="20" className={cn(data.status === "Inactive" && "bg-elevation-level1 text-fg-secondary", data.status === "Active" && "bg-white text-black")}>
											{data.status}
										</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="table.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from "@/components/ui/badge"
						

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

  export default function TableExample() {
  return (
 		<Table>
			<TableCaption>A list of user details.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
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
							<Badge size="20" className={cn(data.status === "Inactive" && "bg-elevation-level1 text-fg-secondary", data.status === "Active" && "bg-white text-black")}>
								{data.status}
							</Badge>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
  );
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default TablePreview
