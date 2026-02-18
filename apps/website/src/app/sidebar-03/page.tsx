import { FolderClosed } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/ui/breadcrumb"
import { SidebarInset, SidebarProvider } from "@/registry/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="bg-fill1">
				<header className="py-7.5 px-3">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink className="flex items-center gap-1" href="#">
									<FolderClosed className="size-4" />
									Tech Stuf
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbSeparator />

							<BreadcrumbItem>
								<BreadcrumbPage>LG 27 Monitor Review</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
			</SidebarInset>
		</SidebarProvider>
	)
}
