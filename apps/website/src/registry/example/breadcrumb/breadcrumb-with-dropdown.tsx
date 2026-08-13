import { ChevronDown } from "lucide-react"
import Link from "next/link"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"
import { Button } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

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
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button color="neutral" variant="outline" size={"32"}>
								Installation
								<ChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuGroup>
								<DropdownMenuItem asChild>
									<Link href="/docs/installation/next">Nextjs</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/docs/installation/vite">Vite</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/docs/installation/manual">Manual</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default BreadcrumbWithDropdown
