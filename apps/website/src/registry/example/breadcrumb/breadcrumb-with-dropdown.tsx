import Link from "next/link"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"
import { Button } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"

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
								<IconSlot slot="down" size={16} />
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
