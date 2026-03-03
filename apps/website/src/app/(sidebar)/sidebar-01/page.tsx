import { SidebarInset, SidebarProvider } from "@/registry/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<nav className="border-border border-b px-3.5 py-3">
					<p className="text-base/6 font-medium">Messages</p>
				</nav>
			</SidebarInset>
		</SidebarProvider>
	)
}
