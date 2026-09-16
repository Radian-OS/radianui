import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/styles/default/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="bg-bg flex h-15 shrink-0 items-center gap-2 border-b p-4.5">
					<SidebarTrigger />
					<span className="font-medium">Inbox</span>
				</header>
			</SidebarInset>
		</SidebarProvider>
	)
}
