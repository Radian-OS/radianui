import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/ui/breadcrumb"

export default function BreadcrumbWithDot() {
	return (
		<Breadcrumb>
			<BreadcrumbList className="gap-0.5">
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator>
					<Dot />
				</BreadcrumbSeparator>

				<BreadcrumbItem>
					<BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator>
					<Dot />
				</BreadcrumbSeparator>

				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

function Dot() {
	return <div className="bg-fg-tertiary mx-1.5 my-auto size-1 rounded-full" />
}
