import { Home } from "lucide-react"
import Link from "next/link"
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/styles/default/ui/breadcrumb"
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from "@/styles/default/ui/dropdown"

function BreadCrumbCardDesign() {
	return (
		<Breadcrumb className="border-soft rounded-lg border p-3">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink className="text-fg-tertiary" asChild>
						<Link href="/">
							<Home size={16} />
						</Link>
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
						<Link href="/docs/installation/next">Installation</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/docs/components">Components</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				<BreadcrumbItem>
					<BreadcrumbPage>Toast</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default BreadCrumbCardDesign
