import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownGroup>
							<DropdownSub>
								<DropdownSubTrigger>Nav button</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setControl(Array.from(keys)[0] as typeof control)}
										minSelectionCount={1}
										selectedValues={[control]}>
										<DropdownItem value="icon">Icon</DropdownItem>
										<DropdownItem value="text">Text</DropdownItem>
										<DropdownItem value="both">Icon and Text</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>RowPerPage</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setRowsPerPageD(Array.from(keys)[0] as typeof rowPerPageD)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[rowPerPageD]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Goto page</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setGoTo(Array.from(keys)[0] as typeof goTo)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[goTo]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Total Page</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setCustomRow(Array.from(keys)[0] as typeof customRow)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[customRow]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
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
