import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, EyeIcon, SquareTerminal } from "lucide-react"
import Link from "next/link"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/registry/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const PaginationPreview = () => {
	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
						Code
					</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<IconButton color="neutral" variant="ghost" asChild disabled>
									<Link href="#">
										<ChevronFirst className="rtl:rotate-180" />
									</Link>
								</IconButton>
							</PaginationItem>
							<PaginationItem>
								<IconButton color="neutral" variant="ghost" asChild disabled>
									<Link href="#">
										<ChevronLeft className="rtl:rotate-180" />
									</Link>
								</IconButton>
							</PaginationItem>
							<PaginationItem>
								<IconButton color="neutral" variant="ghost" asChild>
									<Link href="#">1</Link>
								</IconButton>
							</PaginationItem>
							<PaginationItem>
								<IconButton color="neutral" variant="outline" asChild>
									<Link href="#">2</Link>
								</IconButton>
							</PaginationItem>
							<PaginationItem>
								<IconButton color="neutral" variant="ghost" asChild>
									<Link href="#">3</Link>
								</IconButton>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<IconButton color="neutral" variant="ghost" asChild>
									<Link href="#">
										<ChevronRight className="rtl:rotate-180" />
									</Link>
								</IconButton>
							</PaginationItem>
							<PaginationItem>
								<IconButton color="neutral" variant="ghost" asChild>
									<Link href="#">
										<ChevronLast className="rtl:rotate-180" />
									</Link>
								</IconButton>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="pagination.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Pagination>
<PaginationContent>
   <PaginationItem>
	<IconButton color="neutral" variant="ghost" asChild disabled>
      <Link href="#">
       <ChevronFirst className="rtl:rotate-180" />
      </Link>
     </IconButton>
   </PaginationItem>						
	<PaginationItem>
      <IconButton color="neutral" variant="ghost" asChild disabled>
       <Link href="#">
        <ChevronLeft className="rtl:rotate-180" />
       </Link>
      </IconButton>
     </PaginationItem>					
	
	<PaginationItem>
      <IconButton color="neutral" variant="ghost" asChild>
       <Link href="#">1</Link>
       </IconButton>
       </PaginationItem>
       
	   <PaginationItem>
       <IconButton color="neutral" variant="outline" asChild>
       <Link href="#">2</Link>
       </IconButton>
       </PaginationItem>
     
	 <PaginationItem>
     <IconButton color="neutral" variant="ghost" asChild>
     <Link href="#">3</Link>
     </IconButton>
     </PaginationItem>
						
	 <PaginationItem>
    <PaginationEllipsis />
	</PaginationItem>
	<PaginationItem>
		<IconButton color="neutral" variant="ghost" asChild>
			<Link href="#">
				<ChevronRight className="rtl:rotate-180" />
			</Link>
		</IconButton>
	</PaginationItem>
		
	<PaginationItem>
			<IconButton color="neutral" variant="ghost" asChild>
				<Link href="#">
					<ChevronLast className="rtl:rotate-180" />
				</Link>
			</IconButton>
		</PaginationItem>
	</PaginationContent>
</Pagination>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default PaginationPreview
