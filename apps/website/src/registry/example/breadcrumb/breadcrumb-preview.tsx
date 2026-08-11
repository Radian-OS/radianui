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
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
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

					<Dropdown>
						<DropdownTrigger asChild>
							<BreadcrumbEllipsis className="h-5 w-7 rounded-md border" />
						</DropdownTrigger>
						<DropdownContent className="w-39.5">
							<DropdownItem asChild>
								<Link href="/docs/getting-started/installation">
									Installations
								</Link>
							</DropdownItem>
							<DropdownItem asChild>
								<Link href="/docs/fundamentals/colors">Fundamentals</Link>
							</DropdownItem>
							<DropdownItem asChild>
								<Link href="#">Animations</Link>
							</DropdownItem>
						</DropdownContent>
					</Dropdown>
					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/docs/components">Components</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbPage>Dropdown</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	)
}

export default BreadCrumbPreview
