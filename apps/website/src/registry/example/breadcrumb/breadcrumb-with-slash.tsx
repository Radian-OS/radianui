import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/styles/default/ui/breadcrumb"

function BreadcrumbWithSlash() {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator>/</BreadcrumbSeparator>

				<BreadcrumbItem>
					<BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
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
