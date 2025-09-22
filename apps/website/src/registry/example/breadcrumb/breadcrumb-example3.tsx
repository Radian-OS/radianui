import React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/registry/ui/breadcrumb"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownTrigger } from "@/registry/ui/dropdown"

const BreadcrumbExample3 = () => {
	return (
		<div className="flex items-center justify-center gap-2">
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
	)
}

export default BreadcrumbExample3
