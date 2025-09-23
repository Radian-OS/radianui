import React from "react"
import { Home } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/ui/breadcrumb"

function BreadCrumbExample1() {
	return (
		<div className="flex items-center justify-center gap-2">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">
							<Home className="size-4" />
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbLink href="/">Components</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	)
}

export default BreadCrumbExample1
