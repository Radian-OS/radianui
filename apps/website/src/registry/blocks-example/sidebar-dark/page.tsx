import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/registry/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="bg-bg p-4.5 flex shrink-0 items-center gap-2 border-b">
					<SidebarTrigger className="md:hidden" />
					<span className="font-medium">Inbox</span>
				</header>
			</SidebarInset>
		</SidebarProvider>
	)
}
