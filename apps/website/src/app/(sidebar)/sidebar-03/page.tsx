import { FolderClosed } from "lucide-react"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/registry/ui/sidebar-old"
import { AppSidebar } from "./app-sidebar"

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="py-7.5 flex items-center gap-3 px-3">
					<SidebarTrigger />

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
