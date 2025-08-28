import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import Pagination from "@/registry/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const PaginationPreview = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [, setRowsPerPage] = useState(5)

	const [goTo, setGoTo] = useState<"true" | "false">("false")
	const [customRow, setCustomRow] = useState<"true" | "false">("false")
	const [rowPerPageD, setRowsPerPageD] = useState<"true" | "false">("false")
	const [control, setControl] = useState<"icon" | "text" | "both">("icon")
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
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownGroup>
							<DropdownSub>
								<DropdownSubTrigger>Nav button</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={control} onValueChange={(value) => setControl(value as typeof control)}>
										<DropdownRadioItem value="icon" onSelect={(e) => e.preventDefault()}>
											Icon
										</DropdownRadioItem>
										<DropdownRadioItem value="text" onSelect={(e) => e.preventDefault()}>
											Text
										</DropdownRadioItem>
										<DropdownRadioItem value="both" onSelect={(e) => e.preventDefault()}>
											Icon and Text
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>RowPerPage</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup
										value={rowPerPageD}
										onValueChange={(value) => {
											setRowsPerPageD(value as typeof rowPerPageD)
											setKey((k) => k + 1)
										}}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Goto page</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup
										value={goTo}
										onValueChange={(value) => {
											setGoTo(value as typeof goTo)
											setKey((k) => k + 1)
										}}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Total Page</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup
										value={customRow}
										onValueChange={(value) => {
											setCustomRow(value as typeof customRow)
											setKey((k) => k + 1)
										}}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownGroup>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Pagination
						key={key}
						currentPage={currentPage}
						totalPage={50}
						onPageChange={(page) => setCurrentPage(page)}
						onRowsPerPageChange={(rows) => setRowsPerPage(rows)}
						navButton={`${control}`}
						rowPerPage={rowPerPageD === "true"}
						goToPage={goTo === "true"}
						enableCustomRows={customRow === "true"}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="pagination.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Pagination 
currentPage="${currentPage}" 
totalPage={50}
onPageChange={(page) => setCurrentPage(page)}
onRowsPerPageChange={(rows) => setRowsPerPage(rows)}
navButton="${control}" 
rowPerPage="${rowPerPageD}"
goToPage="${goTo}"
enableCustomRows="${customRow}"
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default PaginationPreview
