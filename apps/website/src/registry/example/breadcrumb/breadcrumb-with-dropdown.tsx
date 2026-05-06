import { ChevronDown } from "lucide-react"
import Link from "next/link"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/styles/default/ui/breadcrumb"
import { Button } from "@/styles/default/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownTrigger,
} from "@/styles/default/ui/dropdown"

function BreadcrumbWithDropdown() {
	return (
		<Breadcrumb>
			<BreadcrumbList className="gap-1">
				<BreadcrumbItem>
					<BreadcrumbLink asChild className="font-medium">
						<Link href="/">Home</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				<BreadcrumbItem>
					<Dropdown>
						<DropdownTrigger asChild>
							<Button color="neutral" variant="outline" size={"32"}>
								Installation
								<ChevronDown />
							</Button>
						</DropdownTrigger>
						<DropdownContent>
							<DropdownGroup>
								<DropdownItem asChild>
									<Link href="/docs/installation/next">Nextjs</Link>
								</DropdownItem>
								<DropdownItem asChild>
									<Link href="/docs/installation/vite">Vite</Link>
								</DropdownItem>
								<DropdownItem asChild>
									<Link href="/docs/installation/manual">Manual</Link>
								</DropdownItem>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default BreadcrumbWithDropdown
