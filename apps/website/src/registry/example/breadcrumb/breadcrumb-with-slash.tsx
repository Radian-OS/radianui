import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/ui/breadcrumb"

function BreadcrumbWithSlash() {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="#breadcrumb-with-slash">Home</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator>/</BreadcrumbSeparator>

				<BreadcrumbItem>
					<BreadcrumbLink href="#breadcrumb-with-slash">Components</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator>/</BreadcrumbSeparator>

				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default BreadcrumbWithSlash
