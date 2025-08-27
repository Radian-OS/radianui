import { ChevronDown, EyeIcon, SquareTerminal } from "lucide-react"
import Link from "next/link"
import CodeSnippet from "@/components/code-snippet"
import { Breadcrumb, BreadcrumbItem } from "@/registry/ui/breadcrumb"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BreadCrumbExample3 = () => {
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
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Breadcrumb separator="default">
						<BreadcrumbItem asChild>
							<Link href="/"> Home</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Dropdown>
								<DropdownTrigger asChild>
									<Button color="neutral" variant="outline">
										Installation <ChevronDown className="size-5" />
									</Button>
								</DropdownTrigger>
								<DropdownContent>
									<DropdownGroup>
										<DropdownItem value="nextjs">Nextjs</DropdownItem>
										<DropdownItem value="vite">Vite</DropdownItem>
										<DropdownItem value="manual">Manual</DropdownItem>
									</DropdownGroup>
								</DropdownContent>
							</Dropdown>
						</BreadcrumbItem>
					</Breadcrumb>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="breadcrumb.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Breadcrumb separator="default" >

<BreadcrumbItem asChild >
 <Link href="/" >Home</Link>
</BreadcrumbItem>

<BreadcrumbItem>
	<Dropdown>
		<DropdownTrigger asChild>
			<Button color="neutral" variant="outline">
				Installation <ChevronDown className="size-5" />
			</Button>
		</DropdownTrigger>
		<DropdownContent>
			<DropdownGroup>
				<DropdownItem value="nextjs">Nextjs</DropdownItem>
				<DropdownItem value="vite">Vite</DropdownItem>
				<DropdownItem value="manual">Manual</DropdownItem>
			</DropdownGroup>
		</DropdownContent>
	</Dropdown>
</BreadcrumbItem>

</Breadcrumb>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default BreadCrumbExample3
