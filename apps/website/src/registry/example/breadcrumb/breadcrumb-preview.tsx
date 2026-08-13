import Link from "next/link"
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

function BreadCrumbPreview() {
	return (
		<div className="flex items-center justify-center gap-2">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/">Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<BreadcrumbEllipsis className="h-5 w-7 rounded-md border" />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-39.5">
							<DropdownMenuItem asChild>
								<Link href="/docs/getting-started/installation">
									Installations
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/docs/fundamentals/colors">Fundamentals</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="#">Animations</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/docs/components">Components</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbPage>DropdownMenu</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	)
}

export default BreadCrumbPreview
