import React from "react"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/ui/breadcrumb"

function BreadCrumbExample2() {
	return (
		<div>
			<Breadcrumb className="bg-elevation-level1 rounded-md border px-3 py-2">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/">
								<Home size={16} />
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight size={14} className="stroke-fg-tertiary" />
					</BreadcrumbSeparator>

					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/docs/installation/next">Installation</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight size={14} className="stroke-fg-tertiary" />
					</BreadcrumbSeparator>

					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/docs/components">Components</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight size={14} className="stroke-fg-tertiary" />
					</BreadcrumbSeparator>

					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/docs/animations/animated-list">Animations</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight size={14} className="stroke-fg-tertiary" />
					</BreadcrumbSeparator>

					<BreadcrumbItem>
						<BreadcrumbPage>CLI</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	)
}

export default BreadCrumbExample2
