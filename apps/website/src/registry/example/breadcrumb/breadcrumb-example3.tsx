import { ChevronDown, ChevronRight, EyeIcon, SquareTerminal } from "lucide-react"
import Link from "next/link"
import CodeSnippet from "@/components/code-snippet"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/registry/ui/breadcrumb"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BreadCrumbExample3 = () => {
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
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/">Home</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<ChevronRight size={14} className="stroke-fg-tertiary" />
							</BreadcrumbSeparator>

							<BreadcrumbItem>
								<Dropdown>
									<DropdownTrigger asChild>
										<Button color="neutral" variant="outline">
											Installation
											<ChevronDown className="size-5" />
										</Button>
									</DropdownTrigger>
									<DropdownContent>
										<DropdownGroup>
											<DropdownItem>Nextjs</DropdownItem>
											<DropdownItem>Vite</DropdownItem>
											<DropdownItem>Manual</DropdownItem>
										</DropdownGroup>
									</DropdownContent>
								</Dropdown>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="breadcrumb.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight size={14} className="stroke-fg-tertiary" />
    </BreadcrumbSeparator>

    <BreadcrumbItem>
      <Dropdown>
        <DropdownTrigger asChild>
          <Button color="neutral" variant="outline">
            Installation
			<ChevronDown className="size-5" />
          </Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownGroup>
            <DropdownItem>Nextjs</DropdownItem>
            <DropdownItem>Vite</DropdownItem>
            <DropdownItem>Manual</DropdownItem>
          </DropdownGroup>
        </DropdownContent>
      </Dropdown>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default BreadCrumbExample3
